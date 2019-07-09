import pandas as pd
from os import listdir


def get_all_river_names(with_file_extension=False):
    return [s if with_file_extension else
            s.replace(".csv", "") for
            s in listdir("datasets/rivers")]


def get_all_river_data():
    results = {}

    for river_name in get_all_river_names():
        df = pd.read_csv("datasets/rivers/%s.csv" % river_name,
                         names=["index", "date", "value"])
        df = df[["date", "value"]]

        results[river_name] = [
            {"date": row['date'],
             "value": row['value']}
            for index, row in df.iterrows()]

    return results
