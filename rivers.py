import json

with open('datasets/rivers.json', 'r') as f:
    dataset = json.load(f)


def get_all_river_names():
    return [r['river'] for r in dataset]


def get_river_data(feature):
    data = {}
    for river_name in get_all_river_names():
        river_data = [r['data'] for r in dataset if r['river'] == river_name][0]
        data[river_name] = river_data[feature]
    return data
