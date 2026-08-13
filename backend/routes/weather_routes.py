from flask import Blueprint, jsonify, request
import requests
import os
from datetime import datetime

bp = Blueprint('weather', __name__, url_prefix='/api/weather')

OPENWEATHER_API_KEY = os.getenv('OPENWEATHER_API_KEY')
OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

@bp.route('/current/<city>', methods=['GET'])
def get_current_weather(city):
    """Get current weather for a city"""
    try:
        url = f"{OPENWEATHER_BASE_URL}/weather"
        params = {
            'q': city,
            'appid': OPENWEATHER_API_KEY,
            'units': 'metric'
        }
        
        response = requests.get(url, params=params)
        
        if response.status_code == 404:
            return jsonify({'error': 'City not found'}), 404
        
        if response.status_code != 200:
            return jsonify({'error': 'Failed to fetch weather data'}), 500
        
        data = response.json()
        
        weather_data = {
            'city': data['name'],
            'country': data['sys']['country'],
            'temperature': data['main']['temp'],
            'feels_like': data['main']['feels_like'],
            'humidity': data['main']['humidity'],
            'pressure': data['main']['pressure'],
            'wind_speed': data['wind'].get('speed', 0),
            'wind_degrees': data['wind'].get('deg', 0),
            'clouds': data['clouds']['all'],
            'visibility': data.get('visibility', 0),
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'sunrise': data['sys'].get('sunrise'),
            'sunset': data['sys'].get('sunset'),
            'timestamp': datetime.utcnow().isoformat()
        }
        
        return jsonify(weather_data), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/forecast/<city>', methods=['GET'])
def get_forecast(city):
    """Get 5-day weather forecast and next 12 hours for a city"""
    try:
        url = f"{OPENWEATHER_BASE_URL}/forecast"
        params = {
            'q': city,
            'appid': OPENWEATHER_API_KEY,
            'units': 'metric'
        }
        
        response = requests.get(url, params=params)
        
        if response.status_code == 404:
            return jsonify({'error': 'City not found'}), 404
        
        if response.status_code != 200:
            return jsonify({'error': 'Failed to fetch forecast data'}), 500
        
        data = response.json()
        
        forecast_list = []
        for item in data['list'][::8]:
            forecast_list.append({
                'date': item['dt_txt'],
                'temperature': item['main']['temp'],
                'humidity': item['main']['humidity'],
                'description': item['weather'][0]['description'],
                'icon': item['weather'][0]['icon'],
                'wind_speed': item['wind']['speed']
            })

        hourly_list = []
        for item in data['list'][:12]:
            hourly_list.append({
                'time': datetime.fromtimestamp(item['dt']).strftime('%H:%M'),
                'temperature': item['main']['temp'],
                'precipitation': int(item.get('pop', 0) * 100),
                'icon': item['weather'][0]['icon']
            })
        
        return jsonify({
            'city': data['city']['name'],
            'country': data['city']['country'],
            'forecast': forecast_list,
            'hourly': hourly_list
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat()
    }), 200