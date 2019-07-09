import warnings

import colors
import pandas as pd
from sklearn.linear_model import LinearRegression

# To be removed if dataset got better
warnings.filterwarnings('ignore')

# Initialize timeline
timeline = pd.read_csv('datasets/timeline.csv', header=0,
                       date_parser=lambda x: pd.datetime.strptime(
                           x, '%d/%m/%Y'), parse_dates=["date"])


# Separates DataFrames per station
def separate_by_station(dataset):
    """
    List of DataFrame separated by station which exists in dataset
    :param dataset:
    :return:
    """
    return [dataset[dataset['station'] == i + 1] for
            i in range(dataset['station'].max())]


# Get dataFrame of a station
def get_by_station(dataset, station):
    """
    Get DataFrame with specific station
    :param dataset: Dataset to use
    :param station: Integer value of station to extract from station
    :return: DataFrame with the corresponding station
    """
    return separate_by_station(dataset)[station - 1]


def load_dataset(filename):
    """
    Load a Panda DataFrame from file
    :param filename: Filename of the file
    :return: DataFrame
    """

    dataset = pd.read_csv(filename, header=0)

    # Parse all columns as float64
    dataset = dataset.astype('float64')

    # Parse month and station as int
    for column in dataset.columns[:2]:
        dataset[column] = dataset[column].astype(int)

    return dataset


# noinspection PyPep8Naming
def train_model(dataset):
    """
    Create a linear model using dataset
    :param dataset: DataFrame to be trained
    :return: Linear model
    """

    # Extract inputs and outputs
    X, y = dataset.iloc[:, :-1], dataset.iloc[:, -1]

    # Create logistic regression classifier
    classifier = LinearRegression()

    # Fit (train) classifier
    classifier.fit(X, y)
    return classifier


def prepare_input_data(dataset, month, station, drop_class_column=True):
    """
    Will get the mean data of each rows with month and station.

    :param dataset: DataFrame
    :param month: Integer value of the month (1-12)
    :param station: Integer value of the station (must exist in dataset)
    :param drop_class_column: Read the variable name
    :return: List of float with average of each feature
    """

    if drop_class_column:
        dataset = dataset.drop(columns=[dataset.columns[-1]])

    by_station = get_by_station(dataset, station)
    by_month = by_station.loc[by_station['month'] == month]

    # Drop station an month column because we already know
    grouped = by_month.drop(columns=['station', 'month'])

    # Make sure everything is float
    grouped = grouped.astype('float64')

    # Make a list with the average of each remaining column
    averages = [grouped[column].mean() for column in grouped.columns.values]

    return [month, station] + averages


def forecast_all_stations_by_month(dataset, model, month):
    """
    Will forecast every station on the given month

    :param dataset: DataFrame
    :param model: Trained Linear Model
    :param month: Integer value of the month (1-12)
    :return: List of stations with their predicted value based on model
    """

    # Get input data for our classifier (average)
    available_stations = dataset.station.unique()

    # Get feature name to predict
    feature = dataset.columns[-1]

    # List of stations with their predicted value in month
    results = []

    # Error handling stuff
    if month not in range(1, 12 + 1):
        return results

    for station in available_stations:
        # Get average of month
        a = prepare_input_data(dataset, month, station)

        # Predict using model
        prediction = model.predict([a])

        results.append({"station": int(station),
                        "value": float(prediction),
                        "color": colors.equivalent(feature, float(prediction))})

    return results


def forecast_all_months_by_station(dataset, model, station):
    """
    Will forecast every month on the given station

    :param dataset: DataFrame
    :param model: Trained Linear Model
    :param station: Integer value of the station
    :return: List of month with their predicted value based on model
    """

    # Get all available station through provided datasets (list of int)
    available_stations = dataset.station.unique()

    # Get feature name to predict
    feature = dataset.columns[-1]

    # List of months with their predicted value
    results = []

    # Return an empty array if invalid station
    if station not in available_stations:
        return results

    # Iterate through months
    for month in range(1, 12 + 1):
        # Get average of month
        a = prepare_input_data(dataset, month, station)

        # Predict using model
        prediction = model.predict([a])

        results.append({"month": int(month),
                        "value": float(prediction),
                        "color": colors.equivalent(feature, float(prediction))})

    return results


def actual_all_months_by_station(dataset, station):
    """
    Returns the average data per station of the class index (last column) of the dataset.

    :param dataset: DataFrame
    :param station: Integer value of the station
    :return: List of month with their actual value based on model
    """

    # Get all available station through provided datasets (list of int)
    available_stations = dataset.station.unique()

    # Get feature name to predict
    feature = dataset.columns[-1]

    # List of months with their predicted value
    results = []

    # Return an empty array if invalid station
    if station not in available_stations:
        return results

    for month in range(1, 12 + 1):
        # Get average of month
        a = prepare_input_data(dataset, month, station, drop_class_column=False)

        results.append({"month": int(month),
                        "value": float(a[-1]),
                        "color": colors.equivalent(feature, float(a[-1]))})

    return results


def actual_timeline_by_feature(feature):
    """
    Returns a series of data by the given feature
    :param feature: feature (column) to show
    :return: Dictionary of date and its data
    """
    return [{"date": pd.datetime.strftime(x['date'], "%m/%d/%Y"),
             "value": x[feature]} for index, x in
            timeline[['date', feature]].sort_values(by="date").iterrows()]


def initialize_all():
    """
    Will initialize every dataset and model for each feature.
    :return: list of datasets, list of models
    """

    # Load wqi.csv (main dataset) and extract columns and drop date and station
    cols = load_dataset('datasets/wqi.csv').columns[2:]

    # Objects to return (key = column name)
    dfs, clf = {}, {}

    for col in cols:
        dfs[col] = load_dataset("datasets/%s.csv" % col)

        clf[col] = train_model(dfs[col])

    return dfs, clf
    