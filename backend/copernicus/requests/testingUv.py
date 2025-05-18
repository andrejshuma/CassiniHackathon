import datetime



def get_current_hour_uv(data_array):
    now=datetime.datetime.now()
    # current_hour = f"2025-05-08 {now.hour}:00:00"
    hour = f"0{now.hour}" if now.hour < 10 else now.hour
    current_hour = f"2025-05-08 {hour}:00:00"
    
    for entry in data_array:
        if str(entry["valid_time"]) == current_hour:
            return entry
    
    return None

def uv_radiation_to_index(uv_radiation_j_per_m2, duration_seconds):

    if duration_seconds <= 0:
        raise ValueError("Duration must be a positive number of seconds.")

    
    uv_power_w_per_m2 = uv_radiation_j_per_m2 / duration_seconds
    uv_index = uv_power_w_per_m2/25

    return uv_index

def categorize_uv_index(uv_index):
    """
    Categorize UV Index based on WHO and EPA standards.
    
    Categories:
    - Low: 0-2 (Score: 1) - Minimal protection needed
    - Moderate: 3-5 (Score: 2) - Protection recommended
    - High: 6-7 (Score: 3) - Protection required
    - Very High: 8-10 (Score: 4) - Extra protection needed
    - Extreme: 11+ (Score: 5) - Maximum protection essential
    """
    try:
        value = float(uv_index)
        if value < 3:
            return {
                "category": "Low", 
                "score": 1,
                "scaled_value": float(uv_index/20),
                "value": uv_index,
                
                "description": "Minimal protection needed. Safe to be outside."
            }
        elif value < 6:
            return {
                "category": "Moderate", 
                "score": 2,
                "scaled_value": float(uv_index/20),
                "value": uv_index,
                "description": "Seek shade during midday. Wear sunscreen SPF 30+."
            }
        elif value < 8:
            return {
                "category": "High", 
                "score": 3,
                "scaled_value": float(uv_index/20),
                "value": uv_index,
                
                "description": "Reduce time in the sun. Wear protective clothing and sunscreen."
            }
        elif value < 11:
            return {
                "category": "Very High", 
                "score": 4,
                "scaled_value": float(uv_index/20),
                "value": uv_index,
                
                "description": "Minimize sun exposure. Wear protective clothing and sunscreen."
            }
        else:
            return {
                "category": "Extreme", 
                "score": 5,
                "scaled_value": float(uv_index/20),
                "value": uv_index,
                
                "description": "Avoid sun exposure. Take all precautions."
            }
    except (ValueError, TypeError):
        return {"category": "Unknown", "score": None, "description": "Unable to determine UV category"}

dataArray=[
	{ "valid_time": "2025-01-10 00:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 01:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 02:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 03:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 04:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 05:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 06:00:00", "uv_radiation_J_per_m2": 0.0 },
	{
		"valid_time": "2025-01-10 07:00:00",
		"uv_radiation_J_per_m2": 12316.11328125
	},
	{
		"valid_time": "2025-01-10 08:00:00",
		"uv_radiation_J_per_m2": 50965.55078125
	},
	{ "valid_time": "2025-01-10 09:00:00", "uv_radiation_J_per_m2": 94194.8125 },
	{ "valid_time": "2025-01-10 10:00:00", "uv_radiation_J_per_m2": 133471.9375 },
	{ "valid_time": "2025-01-10 11:00:00", "uv_radiation_J_per_m2": 148782.5625 },
	{ "valid_time": "2025-01-10 12:00:00", "uv_radiation_J_per_m2": 131656.875 },
	{ "valid_time": "2025-01-10 13:00:00", "uv_radiation_J_per_m2": 109019.6875 },
	{
		"valid_time": "2025-01-10 14:00:00",
		"uv_radiation_J_per_m2": 64349.01953125
	},
	{
		"valid_time": "2025-01-10 15:00:00",
		"uv_radiation_J_per_m2": 29181.3984375
	},
	{
		"valid_time": "2025-01-10 16:00:00",
		"uv_radiation_J_per_m2": 1312.798583984375
	},
	{ "valid_time": "2025-01-10 17:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 18:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 19:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 20:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 21:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 22:00:00", "uv_radiation_J_per_m2": 0.0 },
	{ "valid_time": "2025-01-10 23:00:00", "uv_radiation_J_per_m2": 0.0 }
]

# uv_radiaton = get_current_hour_uv(dataArray)['uv_radiation_J_per_m2']
# categorize_uv_index(uv_radiation_to_index(uv_radiaton, 3600))

