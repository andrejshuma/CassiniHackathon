from oauthlib.oauth2 import BackendApplicationClient
from requests_oauthlib import OAuth2Session
from sentinelhub import SHConfig
from geopy.geocoders import Nominatim
from dotenv import load_dotenv
import tqdm as notebook_tqdm
import getpass
import os
load_dotenv()


def get_bbox_from_lat_lng(lat, lng):
    x1 = "{:.6f}".format(lng - 0.008)
    y1 = "{:.6f}".format(lat - 0.003635)
    x2 = "{:.6f}".format(lng + 0.008)
    y2 = "{:.6f}".format(lat + 0.003635)
    array = [float(x1), float(y1), float(x2), float(y2)]
    return array


def get_config():
    config = SHConfig()
    config.sh_client_id = os.getenv('CLIENT_ID')
    config.sh_client_secret = os.getenv('CLIENT_SECRET')
    config.sh_token_url = "https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token"
    config.sh_base_url = "https://sh.dataspace.copernicus.eu"
    config.save("cdse")
    return config

def getauth_token(config=None):
    if config is None:
        config = get_config()
    # Create a session
    client = BackendApplicationClient(client_id=config.sh_client_id)
    oauth = OAuth2Session(client=client)
    # Get token for the session
    token = oauth.fetch_token(
        token_url="https://identity.cloudferro.com/auth/realms/CDSE/protocol/openid-connect/token",
        client_id=config.sh_client_id,
        client_secret=config.sh_client_secret,
    )
    # All requests using this session will have an access token automatically added

    return oauth

def evaluatePixel(samples):
    #detection of vegetation
    NDVI_RedEdge = (samples.B08 - samples.B05)/(samples.B08 + samples.B05)
    threshold_vegetation = 0.45
    Vegetation = NDVI_RedEdge > threshold_vegetation

    #ceramic rooftop detection
    RATIO_Red = samples.B04/[samples.B01+samples.B02+samples.B03+samples.B04+samples.B05+samples.B06+samples.B07]
    NDBI = (samples.B11 - samples.B08)/(samples.B11 + samples.B08)
    threshold_rooftop = 0.14
    Rooftop = (RATIO_Red > threshold_rooftop) and (NDBI > threshold_rooftop)

    #water detection
    NDWI = (samples.B03 - samples.B08)/(samples.B03 + samples.B08)
    threshold_water = 0.2
    Water = NDWI > threshold_water

    #gain to obtain smooth visualization
    gain = 0.7
    return [gain*Rooftop, gain*Vegetation, gain*Water]

def get_request_city_density(latitude, longitude):
    bbox=get_bbox_from_lat_lng(latitude, longitude)
    evalscript="""//VERSION=3
function setup() {
  return {
    input: ["VH", "VV", "dataMask"],
    output: { bands: 4 }
  };
}

function evaluatePixel(sample) {
  return [
    5.5 * sample.VH > 0.5 ? 1 : 0,
    sample.VV,
    sample.VH * 8,
    sample.dataMask
  ];
}"""
    request = {
        "input": {
            "bounds": {
                "properties": {"crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"},
                "bbox": bbox,
            },
            "data": [
                {
                    "dataFilter": {
                        "timeRange": {
                            "from": "2025-04-16T00:00:00Z",
                            "to": "2025-04-17T23:59:59Z"
                        }
                    },
                    "type": "sentinel-1-grd",
                }
            ],
        },
        "output": {
            "width": 512.792,
            "height": 687.801,
            "responses": [
                {
                    "identifier": "default",
                    "format": {"type": "image/tiff"},
                }
            ],
        },
        "evalscript": evalscript,
    }

    url = "https://sh.dataspace.copernicus.eu/api/v1/process"
    oauth=getauth_token()
    response = oauth.post(url, json=request, headers={"Accept": "image/tiff"})

    # if response.status_code in (200,):
    #     with open(f"../urban_skopje.tiff", "wb") as tarfile:
    #         tarfile.write(response.content)

    return response

def get_request_green(latitude, longitude):
    bbox = get_bbox_from_lat_lng(latitude, longitude)
    evalscript="""var ndvi = (B08-B04)/(B08+B04);

// Threshold for vegetation
var veg_th = 0.4;

// Simple RGB
var R = 2.5*B04;
var G = 2.5*B03;
var B = 2.5*B02;

// Transform to Black and White
var Y = 0.2*R + 0.7*G + 0.1*B;
var pixel = [Y, Y, Y];

// Change vegetation color
if(ndvi >= veg_th)
  pixel = [0.1*Y, 1.8*Y, 0.1*Y];

return pixel;"""
    request = {
        "input": {
            "bounds": {
                "properties": {"crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"},
                "bbox": bbox,
            },
            "data": [
                {
                    "dataFilter": {
                        "timeRange": {
                            "from": "2025-04-16T00:00:00Z",
                            "to": "2025-05-16T23:59:59Z"
                        }
                    },
                    "type": "sentinel-2-l2a",
                }
            ],
        },
        "output": {
            "width": 512.792,
            "height": 687.801,
            "responses": [
                {
                    "identifier": "default",
                    "format": {"type": "image/tiff"},
                }
            ],
        },
        "evalscript": evalscript,
    }

    url = "https://sh.dataspace.copernicus.eu/api/v1/process"
    oauth=getauth_token()
    response = oauth.post(url, json=request, headers={"Accept": "image/tiff"})

    # if response.status_code in (200,):
    #     with open(f"green_aktebe.tiff", "wb") as tarfile:
    #         tarfile.write(response.content)

    return response

def get_request_ozone(latitude, longitude):
    bbox = get_bbox_from_lat_lng(latitude, longitude)
    evalscript = """const band = "O3";
var minVal = 0.0;
var maxVal = 0.36;

function setup() {
  return {
    input: [band, "dataMask"],
    output: {
      bands: 4,
    },
  };
}

var viz = ColorRampVisualizer.createBlueRed(minVal, maxVal);

function evaluatePixel(samples) {
  let ret = viz.process(samples[band]);
  ret.push(samples.dataMask);
  return ret;
}

"""
    request = {
        "input": {
            "bounds": {
                "properties": {"crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"},
                "bbox": bbox,
            },
            "data": [
                {
                    "dataFilter": {
                        "timeRange": {
                            "from": "2025-04-16T00:00:00Z",
                            "to": "2025-05-16T23:59:59Z"
                        }
                    },
                    "type": "sentinel-5p-l2",
                }
            ],
        },
        "output": {
            "width": 512.792,
            "height": 687.801,
            "responses": [
                {
                    "identifier": "default",
                    "format": {"type": "image/tiff"},
                }
            ],
        },
        "evalscript": evalscript,
    }

    url = "https://sh.dataspace.copernicus.eu/api/v1/process"
    oauth = getauth_token()
    response = oauth.post(url, json=request, headers={"Accept": "image/tiff"})

    # if response.status_code in (200,):
    #     with open(f"C:\\Users\\ekate\\PycharmProjects\\PythonProject\\hackaton\\ozone_skopje.tiff", "wb") as tarfile:
    #         tarfile.write(response.content)

    return response