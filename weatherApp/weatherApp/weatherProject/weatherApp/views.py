import json
import urllib.request

import wikipedia
from django.shortcuts import render


def index(request):
    if request.method == 'POST':
        city = request.POST['city']  # наше название города введенное
        source = urllib.request.urlopen('http://api.openweathermap.org/data/2.5/weather?q=' +
                                        city + '&lang=ru&appid=b1fa57de36cdfb44fc05f8a11004f1ca' + '&units=metric&appid=b1fa57de36cdfb44fc05f8a11004f1ca' + '&lang=ru&appid=b1fa57de36cdfb44fc05f8a11004f1ca').read()
        list_of_data = json.loads(source)
        cityy=str(city)
        file_path = 'cityname'

        # Открытие файла в режиме записи ('w') удаляет содержимое файла
        with open(file_path, 'w') as file:
            file.write(str(city))

        data = {
            "name_of_city": str(city),  # Добавил
            "country_code": str(list_of_data['sys']['country']),
            "coordinate": str(list_of_data['coord']['lon']) + ', '
                          + str(list_of_data['coord']['lat']),

            "temp": str(list_of_data['main']['temp']) + ' °C',
            "feels_like": str(list_of_data['main']['feels_like']) + ' °C',
            "pressure": str(list_of_data['main']['pressure']),
            "humidity": str(list_of_data['main']['humidity']),
            'main': str(list_of_data['weather'][0]['main']),
            'description': str(list_of_data['weather'][0]['description']),
            'icon': list_of_data['weather'][0]['icon'],
        }
        print(data)
    else:
        data = {}

    return render(request, "main/index.html", data)


def about(request):
    return render(request, 'main/about.html')
    # return HttpResponse("<h4> Страница про нас </h4>")


def wiki(request):
    wikipedia.set_lang('en')
    file_path = 'cityname'

    # Открытие файла в режиме чтения ('r')
    with open(file_path, 'r') as file:
        cin = file.read()
    cin +=" name city"
    page = wikipedia.page(cin)

    # Extract necessary data
    title = page.title
    summary = page.summary
    images = page.images[0]
    citydata = {
        "title": str(title),  # Добавил
        "summary": str(summary),
        "images": images,
    }
    return render(request, 'main/wiki.html',citydata)
