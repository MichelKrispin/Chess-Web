#!/usr/bin/env python3

import json
import os
from flask import abort, Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from GameHandler import GameHandler

app = Flask('chess', static_folder='react-front-end/build')
CORS(app)
games_handler = GameHandler()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>') 
def index(path):
    """
    The route to the react frontend.
    """
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    
@app.route('/api/', methods=['GET', 'POST'])
def game():
    """
    The 'index' page which returns all games or lets the user create a new game.
    """
    if request.method == 'GET':
        # Return all active game ids
        response = [{'id': i} for i in range(games_handler.number_of_games)]
        return jsonify(response)

    elif request.method == 'POST':
        # Create a new chess game and return its id for the new url
        return jsonify({ 'id': games_handler.new_game() })
        
@app.route('/api/<int:id>/', methods=['POST', 'PUT'])
def play_game(id):
    """
    Play the game. If the id is below 0 or above length of games -1 it doesn't exist.
    """
    if id >= games_handler.number_of_games or id < 0:
        abort(404)

    if request.method == 'POST':
        # Return the board of the game on get
        if request.data == b'':
            role = 'None (send a { "key": <random-value> } to see a role)'
        else:
            try:
                data = json.loads(request.data)
                key = data['key']
            except (KeyError, TypeError) as e:
                role = 'None (send a { "key": <random-value> } to see a role)'
            else:
                role = games_handler.get_user_role(id, key)
        return jsonify({ 'board': games_handler.get_board(id), 'role': role })

    elif request.method == 'PUT':
        # Make the move with the requested data or return an error
        valid = False
        message = "The move should be a from position and a to position with a character and a number i.e. a1a2. The character can range from a to h and the number from 1 to 8"

        # If the request data doesn't include 'move' as a key its invalid
        if request.data == b'':
            message = 'Data is empty. PUT data should look like { "move": "a1a2", "key": <random-value> }'
        else:
            try:
                data = json.loads(request.data)
                new_move = data['move']
                key = data['key']
            except (KeyError, TypeError) as e:
                message = 'PUT data should look like { "move": "a1a2", "key": <random-value> }'
            else:
                # The request data is valid
                # Check first whether the key matches the current player
                if games_handler.is_active_player(id, key):
                    valid, message = games_handler.make_move(id, new_move)
                else:
                    message = 'It is your opponents turn'
        return jsonify({
            'board': games_handler.get_board(id),
            'valid': valid,
            'message': message,
            'player': games_handler.get_active_player(id)
        })

"""
The API works in the following way:
In the / route (home or index) are all indices listed.
The client just has to GET from there to get all existing games.
If POST is used at the home route a new game is created and the index is returned.

The client has then the chance to view the created game at /<id>/
So if there is already a game listed it is possible to view it by adding the id to the URL.
IMPORTANT: Accessing this route is only possible by adding a randomly generated key.
           This can be anything. It should be saved as a cookie or at least in the browser
           as this key will be used to identify the currently active player. If the browser
           is closed inside the game and the key is forgotten there is no way to return the
           game and play as the same player.

So a few examples:
GET /
-> [{'id': 0}, {'id': 1}]

POST /
->  {'id': 2}

GET /2/ data={ "key": "schwabbelbabbel5" }
-> {
    'board': "RNBKQBNRPPPP...",
    'role': 'white'
}

PUT /2/ data={ "move": "a2a3", "key": "schwabbelbabbel5" }
-> {
    'board': "R...",
    'valid': true,
    'message': 'PASSED',
    'player': 'black'
}

"""
if __name__ == '__main__':
    app.run(debug=True)
