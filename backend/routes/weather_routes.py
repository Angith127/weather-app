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
            'units': 'metric'  # Celsius
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
            'wind_speed': data['wind']['speed'],
            'clouds': data['clouds']['all'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'timestamp': datetime.utcnow().isoformat()
        }
        
        return jsonify(weather_data), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/forecast/<city>', methods=['GET'])
def get_forecast(city):
    """Get 5-day weather forecast for a city"""
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
        for item in data['list'][::8]:  # Get every 8th item (24-hour intervals)
            forecast_list.append({
                'date': item['dt_txt'],
                'temperature': item['main']['temp'],
                'humidity': item['main']['humidity'],
                'description': item['weather'][0]['description'],
                'icon': item['weather'][0]['icon'],
                'wind_speed': item['wind']['speed']
            })
        
        return jsonify({
            'city': data['city']['name'],
            'country': data['city']['country'],
            'forecast': forecast_list