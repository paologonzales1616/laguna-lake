import sys
import model
import colors
import json
import rivers

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


def timeline_of_feature(feature):
    print(json.dumps(model.actual_timeline_by_feature(feature)))


def data_of_river():
    print(json.dumps({"data": rivers.get_all_river_data(),
                      "names": rivers.get_all_river_names()}))


if sys.argv[1] == 'forecast':
    forecast_per_month(sys.argv[2], int(sys.argv[3]))

if sys.argv[1] == 'actual':
    actual_per_station(sys.argv[2], int(sys.argv[3]))

if sys.argv[1] == 'legend':
    legend_of_feature(sys.argv[2])

if sys.argv[1] == 'timeline':
    timeline_of_feature(sys.argv[2])

if sys.argv[1] == 'rivers':
    data_of_river()

sys.stdout.flush()
