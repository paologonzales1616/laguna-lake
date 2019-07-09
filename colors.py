from pandas.io import json

with open('colors.json', 'r') as f:
    colors = json.loads(f.read())


def equivalent(feature, x):
    """
    Returns the color equivalent of the given feature and it's data (x)
    :param feature: Type of feature
    :param x: Data
    :return: Hex code (as string)
    """

    # Iterate through colors
    for color in colors[feature]:

        if color['min'] <= x <= color['max']:
            return color['color']


def legend(feature):
    """
    Returns dictionary object of the legend of the feature
    :param feature: feature to get legend
    :return: Dictionary
    """
    return colors[feature]
