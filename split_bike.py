import json

path = "/Users/kwk/Developer/bike-map/public/data/"

with open(path + "bikepaths.json", 'r') as file:
    obj_list = json.load(file)["features"]

    separated = {
        "barely_protected": {
            "type": "FeatureCollection",
            "features": []
        },
        "partially_protected": {
            "type": "FeatureCollection",
            "features": []
        },
        "no_protection": {
            "type": "FeatureCollection",
            "features": []
        },
        "fully_protected": {
            "type": "FeatureCollection",
            "features": []
        },
        "other": {
            "type": "FeatureCollection",
            "features": []
        },
    }
    
    for obj in obj_list:
        color = obj["properties"]["stroke"]
        t = ""
        if color == "#fefb00":
            t = "barely_protected"
        elif color == "#00fcff":
            t = "partially_protected"
        elif color == "#000000":
            t = "no_protection"
        elif color == "#00f900" or color == "#05f800" or color == "#8df900" or color == "#00f500" or color == "#05f900":
            t = "fully_protected"
        else:
            t = "other"
        
        separated[t]["features"].append(obj)

    for output in separated:
        with open(path + output + ".json", 'w') as out_json_file:
            json.dump(separated[output], out_json_file, indent=4)