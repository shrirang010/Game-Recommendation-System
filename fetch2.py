import requests
from bs4 import BeautifulSoup
import csv


def get_reviews(appid, params={'json': 1}):
    url = 'https://store.steampowered.com/appreviews/'
    response = requests.get(url=url+appid, params=params,
                            headers={'User-Agent': 'Mozilla/5.0'})
    return response.json()


# reviews = get_reviews("1085660")
# print(reviews)

params = {'json': 1}
response = get_reviews("397540", params)

# cursor = response['cursor']
# params['cursor'] = cursor.encode()
# response2 = get_reviews("397540", params)

# cursor = response2['cursor']
# params['cursor'] = cursor.encode()
# response3 = get_reviews("397540", params)

# print(response['query_summary'])  # * This gives the summary of the query
# print(response['reviews'][3]['review'])


def get_app_id(game_name):
    response = requests.get(
        url=f'https://store.steampowered.com/search/?term={game_name}&category1=998', headers={'User-Agent': 'Mozilla/5.0'})
    soup = BeautifulSoup(response.text, 'html.parser')
    app_id = soup.find(class_='search_result_row')['data-ds-appid']
    return app_id


id = get_app_id("Hogwarts Legacy")


def get_n_appids(n=5, filter_by='topsellers'):
    appids = []
    url = f'https://store.steampowered.com/search/?category1=998&filter={filter_by}&page='
    page = 0

    while page*25 < n:
        page += 1
        response = requests.get(
            url=url+str(page), headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(response.text, 'html.parser')
        for row in soup.find_all(class_='search_result_row'):
            appids.append(row['data-ds-appid'])

    return appids[:n]


def get_details():  # * Get appid of games from this function
    url = "https://steamspy.com/api.php"
    parameters = {"request": "all"}

    # request 'all' from steam spy and parse into dataframe
    response = requests.get(url=url, params=parameters)
    json_data = response.json()
    count = 0
    ids = []
    for key in json_data:
        ids.append(key)
        # print(key)
        count += 1
    return ids


# * Get all other info about the game from this function
def parse_steam_request(appid):
    """Unique parser to handle data from Steam Store API.

    Returns : json formatted data (dict-like)
    """
    url = "http://store.steampowered.com/api/appdetails/"
    parameters = {"appids": appid}

    response = requests.get(url=url, params=parameters)
    json_data = response.json()
    json_app_data = json_data[str(appid)]
    if json_app_data['success']:
        data = json_app_data['data']
        return data
    else:
        print("FAILED TO GET DATA ")
        return 0


# print(info)

# print(data)


def extractInfo(obj):
    game_developer = str(obj['developers'])
    game_publisher = obj['publishers']
    game_id = str(obj['steam_appid'])
    game_name = str(obj['name'])
    game_required_age = str(obj['required_age'])
    game_is_free = str(obj['is_free'])
    game_publishers = str(obj['publishers'])

    # extracting all gnenres of the game
    list = obj['genres']
    game_allgenre = []
    for genre in list:
        if genre == "Early Access":
            continue
        game_allgenre.append(genre['description'])

    # extracting all categoties the game falls under
    game_categories = []
    list = obj["categories"]
    for info in list:
        if genre == "Early Access":
            continue
        game_categories.append(info['description'])

    game_releasedate = obj['release_date']['date']

    return {'id': game_id, 'name': game_name, 'developer': game_developer, 'free': game_is_free, 'age': game_required_age, 'release date': game_releasedate, 'genres': game_allgenre, 'categories': game_categories}


def writeINCSV(info):

    # fields = ['id', 'name', 'developer', 'free', 'age',
    #           'release date', 'genres', 'categories']

    rows = [[info['id'], info['name'], info['developer'], info['free'], info['age'],
            info['release date'], info['genres'], info['categories']]]
    print(rows)
    filename = "info.csv"

    with open(filename, 'a') as csvfile:
        csvwriter = csv.writer(csvfile)

        # csvwriter.writerow(fields)

        csvwriter.writerows(rows)


ids = get_details()
rawInfo = []
for i in range(148,201):
    data = parse_steam_request(str(ids[i]))
    # rawInfo.append(data)
    if(data == 0):
        continue
    try:
        info = extractInfo(data)
    except KeyError:
        print("Key error on id ",i)
    writeINCSV(info)
    # print(info)
