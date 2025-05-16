from geopy.geocoders import Nominatim

if __name__=="__main__":
    geolocator = Nominatim(user_agent="exercises")

    city = input()

    location = geolocator.geocode(city)

    if location:
        latitude = location.latitude
        longitude = location.longitude
        print(latitude, longitude)
        x1="{:.6f}".format(longitude-0.1)
        y1="{:.6f}".format(latitude-0.1)
        x2="{:.6f}".format(longitude+0.1)
        y2="{:.6f}".format(latitude+0.1)
        array=[float(x1),float(y1),float(x2),float(y2)]
        print(array)
    else:
        print("Error")


