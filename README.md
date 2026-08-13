# Weather App 🌤️

A real-time weather application built with React, Flask, and PostgreSQL. Get current weather, 5-day forecasts, and more!

## Features

- 🌍 **Current Weather**: Get real-time weather for any city
- 📅 **5-Day Forecast**: View weather predictions for the next 5 days
- 💾 **Search History**: Keep track of your recent searches
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **Docker Support**: Easy deployment with Docker

## Tech Stack

### Frontend
- React.js
- HTML5 & CSS3
- Axios (HTTP requests)
- TailwindCSS (styling)

### Backend
- Python Flask
- PostgreSQL
- SQLAlchemy ORM
- Redis (caching)

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- AWS/Heroku (deployment)

## Prerequisites

- Python 3.11+
- Node.js 16+
- PostgreSQL 13+
- Docker & Docker Compose (optional)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Angith127/weather-app.git
cd weather-app
```

### 2. Set up environment variables
```bash
cd backend
cp .env.example .env
```
Update `.env` with your:
- OpenWeather API key (get one free at https://openweathermap.org/api)
- Database credentials
- Secret key

### 3. Install backend dependencies
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Set up database
```bash
createdb weather_app
python app.py
```

### 5. Install frontend dependencies
```bash
cd ../frontend
npm install
npm start
```

## Running with Docker

```bash
# Build and run with docker-compose
docker-compose up --build

# Access the app
# Backend: http://localhost:5000
# Frontend: http://localhost:3000
```

## API Endpoints

### Weather Routes
- `GET /api/weather/current/<city>` - Get current weather
- `GET /api/weather/forecast/<city>` - Get 5-day forecast
- `GET /api/weather/health` - Health check

### User Routes
- `GET /api/users/search-history` - Get search history
- `POST /api/users/search-history` - Add to search history
- `GET /api/users/preferences` - Get user preferences

## Testing

```bash
cd backend
pytest tests/ -v
```

## Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Deploy to AWS
See deployment guide in `/docs/aws-deployment.md`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email angith@example.com or open an issue on GitHub.

## Roadmap

- [ ] User authentication
- [ ] Multiple location tracking
- [ ] Weather alerts
- [ ] Integration with calendar
- [ ] Mobile app

## Acknowledgments

- OpenWeatherMap API for weather data
- Flask community
- React community