from flask import Blueprint, jsonify, request
from datetime import datetime

bp = Blueprint('users', __name__, url_prefix='/api/users')

# Store search history in memory (will use database later)
search_history = []

@bp.route('/search-history', methods=['GET'])
def get_search_history():
    """Get user's search history"""
    return jsonify({
        'history': search_history,
        'total': len(search_history)
    }), 200

@bp.route('/search-history', methods=['POST'])
def add_to_search_history():
    """Add city to search history"""
    data = request.json
    city = data.get('city')
    
    if not city:
        return jsonify({'error': 'City is required'}), 400
    
    search_history.append({
        'city': city,
        'timestamp': datetime.utcnow().isoformat()
    })
    
    return jsonify({
        'message': 'City added to history',
        'city': city
    }), 201

@bp.route('/preferences', methods=['GET'])
def get_preferences():
    """Get user preferences"""
    return jsonify({
        'temperature_unit': 'celsius',
        'theme': 'light',
        'notifications': True
    }), 200