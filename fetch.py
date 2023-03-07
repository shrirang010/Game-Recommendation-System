import requests
from bs4 import BeautifulSoup
import csv


def get_ids_from_csv():
    filename = 'info.csv'
    count = 0
    ids = []
    with open(filename, newline='', encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            count += 1
            ids.append(row[0])

    # print(ids, count)
    return ids


def get_reviews(appid, params={'json': 1}):
    url = 'https://store.steampowered.com/appreviews/'
    response = requests.get(
        url=url+appid, params=params, headers={'User-Agent': 'Mozilla/5.0'})

    return response.json()


# def write_reviews():
#     ids = get_ids_from_csv()

#     params = {'json': 1}
#     response = get_reviews(str(ids[0]), params)
#     cursor = response['cursor']
#     params['cursor'] = cursor.encode()
#     response_2 = get_reviews(str(ids[0]), params)

#     print(response['reviews'][0]['review'])


def get_n_reviews(appid, n=1000):
    reviews = []
    cursor = '*'
    params = {
        'json': 1,
        'filter': 'all',
        'language': 'english',
        'day_range': 9223372036854775807,
        'review_type': 'all',
        'purchase_type': 'all'
    }
    while n > 0:
        params['cursor'] = cursor.encode()
        params['num_per_page'] = min(100, n)
        n -= 100

        response = get_reviews(appid, params)
        cursor = response['cursor']

        for i in range(len(response['reviews'])):
            reviews.append(response['reviews'][i]['review'])

        if len(response['reviews']) < 100:
            break

    return reviews


def get_app_id(game_name):
    response = requests.get(
        url=f'https://store.steampowered.com/search/?term={game_name}&category1=998', headers={'User-Agent': 'Mozilla/5.0'})
    soup = BeautifulSoup(response.text, 'html.parser')
    app_id = soup.find(class_='search_result_row')['data-ds-appid']
    return app_id


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


def write_gameinfo_in_csv(info):

    # fields = ['id', 'name', 'developer', 'free', 'age',
    #           'release date', 'genres', 'categories']

    rows = [[info['id'], info['name'], info['developer'], info['free'], info['age'],
            info['release date'], info['genres'], info['categories']]]

    filename = "info.csv"

    with open(filename, 'a') as csvfile:
        csvwriter = csv.writer(csvfile)

        # csvwriter.writerow(fields)

        csvwriter.writerows(rows)


def write_reviews_in_csv(id, review):
    fields = ['id', 'review']

    rows = [[id, review]]

    filename = "reviews.csv"

    with open(filename, 'a') as csvfile:
        csvwriter = csv.writer(csvfile)

        # csvwriter.writerow(fields)

        csvwriter.writerows(rows)


def main(startNum, endNum):
    ids = get_details()
    rawInfo = []
    errors = []

    for i in range(startNum, endNum):
        data = parse_steam_request(str(ids[i]))
        if (data == 0):
            continue
        try:
            info = extractInfo(data)
        except Exception:
            errors.append(i)
            print("Key error on id ", i)

        write_gameinfo_in_csv(info)
    print(errors)


ids = get_ids_from_csv()
# print(ids)

for j in range(len(ids)):
    reviews = get_n_reviews(ids[j])

    for i in range(len(reviews)):
        # print(len(reviews))
        try:
            write_reviews_in_csv(ids[j], reviews[i].replace("\n", ""))
        except Exception:
            print("Exception at id", j, "review", i)
