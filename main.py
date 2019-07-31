import datetime
import sys
import model
import colors
import json
import rivers
from os import listdir

datasets, models = model.initialize_all()

sys.stdout.flush()


def forecast_per_month(feature, month):
    # Run model and get output
    data = model.forecast_all_stations_by_month(
        datasets[feature], models[feature], month)

    print(json.dumps(data))


def actual_per_station(feature, station):
    # Get JSON body
    prediction = model.forecast_all_months_by_station(
        datasets[feature], models[feature], station)

    actual = model.actual_all_months_by_station(
        datasets[feature], station)
    print(json.dumps({"actual": actual, "forecast": prediction}))


def legend_of_feature(feature):
    print(json.dumps(colors.legend(feature)))


def timeline_of_feature(feature, station):
    print(json.dumps(model.actual_timeline_by_feature_and_station(feature, station=station)))


def update_lake_dataset(json_value):
    print(json_value)
    new_value = json.loads(json_value)

    date_str = new_value[0]
    station = new_value[1]
    pH = new_value[2]
    nitrate = new_value[3]
    inorganic_phosphate = new_value[4]
    BOD = new_value[5]
    dissolved_oxygen = new_value[6]
    fecal_coliforms = new_value[7]
    ammonia = new_value[8]
    wqi = new_value[9]

    date = datetime.datetime.strptime(date_str, "%d/%m/%Y")

    for csv in listdir('datasets'):

        if ".csv" not in csv:
            continue

        feature = csv.replace(".csv", "")

        with open("datasets/%s" % csv, 'a') as f:

            data = None

            if feature == 'ammonia':
                data = [date.month, station, pH,
                        nitrate, inorganic_phosphate,
                        BOD, dissolved_oxygen,
                        fecal_coliforms, wqi, ammonia]
            elif feature == 'BOD':
                data = [date.month, station, pH,
                        nitrate, inorganic_phosphate,
                        dissolved_oxygen,
                        fecal_coliforms, ammonia, wqi, BOD]
            elif feature == 'dissolved_oxygen':
                data = [date.month, station, pH,
                        nitrate, inorganic_phosphate,
                        BOD, fecal_coliforms, ammonia, wqi,
                        dissolved_oxygen]
            elif feature == 'inorganice_phosphate':
                data = [date.month, station, pH,
                        nitrate, BOD, dissolved_oxygen,
                        fecal_coliforms, ammonia, wqi,
                        inorganic_phosphate]
            elif feature == 'nitrate':
                data = [date.month, station, pH,
                        inorganic_phosphate,
                        BOD, dissolved_oxygen,
                        fecal_coliforms, ammonia, wqi, nitrate]
            elif feature == 'pH':
                data = [date.month, station, nitrate,
                        inorganic_phosphate,
                        BOD, dissolved_oxygen,
                        fecal_coliforms, ammonia, wqi, pH]
            elif feature == 'fecal_coliforms':
                data = [date.month, station, pH,
                        nitrate, inorganic_phosphate,
                        BOD, dissolved_oxygen,
                        ammonia, wqi, fecal_coliforms]
            elif feature == 'wqi':
                data = [date.month, station, pH,
                        nitrate, inorganic_phosphate,
                        BOD, dissolved_oxygen,
                        fecal_coliforms, ammonia, wqi]
            elif feature == 'timeline':
                data = [date_str.replace("\'", ""), station, pH,
                        nitrate, inorganic_phosphate,
                        BOD, dissolved_oxygen,
                        fecal_coliforms, ammonia, wqi]

            if data: 
                f.write("\n" + str(data).replace("[", "").replace("]", "").replace(" ", ""))


def data_of_river(feature):
    print(json.dumps({"data": rivers.get_river_data(feature),
                      "names": rivers.get_all_river_names()}))


if __name__ == "__main__":
    if sys.argv[1] == 'forecast':
        forecast_per_month(sys.argv[2], int(sys.argv[3]))

    elif sys.argv[1] == 'actual':
        actual_per_station(sys.argv[2], int(sys.argv[3]))

    elif sys.argv[1] == 'legend':
        legend_of_feature(sys.argv[2])

    elif sys.argv[1] == 'timeline':
        timeline_of_feature(sys.argv[2], sys.argv[3])

    elif sys.argv[1] == 'rivers':
        data_of_river(sys.argv[2])

    elif sys.argv[1] == 'lake':
        # print(sys.argv[2])
        update_lake_dataset(sys.argv[2])

    sys.stdout.flush()
