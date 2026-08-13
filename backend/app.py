from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'postgresql://user:password@localhost:5432/weather_app'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')

# Initialize database
from models import db
db.init_app(app)

# Import and register blueprints
from routes.weather_routes import bp as weather_bp
from routes.user_routes import bp as user_bp

app.register_blueprint(weather_bp)
app.register_blueprint(user_bp)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'app': 'Weather App API'
    }), 200

# Root endpoint
@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'message': 'Weather App API',
        'version': '1.0.0',
        'endpoints': {
            'current_weather': '/api/weather/current/<city>',
            'forecast': '/api/weather/forecast/<city>',
            'search_history': '/api/users/search-history',
            'health': '/health'
        }
    }), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(
        debug=os.getenv('DEBUG', True),
        host='0.0.0.0',
        port=5000
    )