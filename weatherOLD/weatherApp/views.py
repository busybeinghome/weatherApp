import urllib.request
import json
from django.shortcuts import render

import wikipedia
import requests
from bs4 import BeautifulSoup
from googletrans import Translator


def index(request):
    if request.method == 'POST':
        city = request.POST['city']
        try:
            source = urllib.request.urlopen('http://api.openweathermap.org/data/2.5/weather?q=' +
                                               city + '&units=metric&appid=b1fa57de36cdfb44fc05f8a11004f1ca&lang=ru').read()
            list_of_data = json.loads(source)
            cityy=str(city)
            file_path = 'cityname'

        # Открытие файла в режиме записи ('w') удаляет содержимое файла
            with open(file_path, 'w') as file:
                file.write(str(city))
            data = {
                "name_of_city": str(city),  # Добавил
                "country_code": str(list_of_data['sys']['country']),
                "coordinate": str(list_of_data['coord']['lon']) + ', ' + str(list_of_data['coord']['lat']),
                "temp": str(list_of_data['main']['temp']) + ' °C',
                "feels_like": str(list_of_data['main']['feels_like']) + ' °C',
                "pressure": str(list_of_data['main']['pressure']),
                "humidity": str(list_of_data['main']['humidity']),
                'main': str(list_of_data['weather'][0]['main']),
                'description': str(list_of_data['weather'][0]['description']),
                'icon': list_of_data['weather'][0]['icon'],
                'city': city
            }
            print(data)  

        except urllib.error.HTTPError as e:
            data = {'error': 'Город не найден. Проверьте правильность ввода.'}
    else:
        data = {}
    return render(request, "main/index.html", data)

def wiki(request):
    # Задание языка Википедии на английский
    wikipedia.set_lang('en')
    file_path = 'cityname'

    # Открытие файла в режиме чтения ('r')
    with open(file_path, 'r') as file:
        cin = file.read().strip()
    nm="head"
    translator = Translator()
    result = translator.translate(cin, src='en', dest='ru')



    url = f"https://ru.wikipedia.org/wiki/{result.text}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Извлечение названия статьи
    name_element = soup.find('h1', {'id': 'firstHeading'})
    name = name_element.get_text() if name_element else "Название не найдено"

    # Извлечение первого абзаца статьи
    content_element = soup.find('div', {'id': 'bodyContent'})
    first_paragraph = content_element.find('p').get_text() if content_element and content_element.find('p') else "Первый абзац не найден"

    # Извлечение первой картинки
    image_url = "Изображение не найдено"
    if content_element:
        first_image_element = content_element.find('img')
        if first_image_element:
            image_url = f"https:{first_image_element['src']}"

    # Извлечение информации с использованием data-wikidata-property-id
    population_span = soup.find('span', {'data-wikidata-property-id': 'P1082'})
    population = population_span.get_text() if population_span else "Информация о населении не найдена"

    time_span = soup.find('span', {'data-wikidata-property-id': 'P421'})
    time = time_span.get_text() if time_span else "Информация о времени не найдена"

    year_span = soup.find('span', {'data-wikidata-property-id': 'P571'})
    year = year_span.get_text() if year_span else "Информация о годе основания не найдена"

    square_span = soup.find('span', {'data-wikidata-property-id': 'P2046'})
    square = square_span.get_text() if square_span else "Информация о площади не найдена"

    # Печать результатов
    print(f"Название: {name}")
    print(f"Первый абзац: {first_paragraph}")
    print(f"Первая картинка: {image_url}")
    print(f"Население: {population}")
    print(f"Часовой пояс: {time}")
    print(f"Год основания: {year}")
    print(f"Площадь: {square}")
    citydata = {
        "title": str(name),  # Добавил
        "summary": str(first_paragraph),
        "images": image_url,
        "population": str(population),
        "year": str(year),
        "time": str(time),
        "square": str(square),
    }
    return render(request, 'main/wiki.html', citydata)
