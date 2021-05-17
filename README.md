# Chess Online

A small chess project based on the chess backend developed [here](https://github.com/MichelKrispin/ChessOnline).

It conists of a flask backend which provides a REST-like API and passes this on to the mentioned Chess Online chess implementation
and also of a React frontend.

## Run locally

Short version (Linux):
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd react-front-end
npm install
npm run build
cd ..
./main.py
```

Then there hsould be a usable front end.

If you want to test the game visit the test page in another browser or in a private window.

You should be able to create a lot of games and access them trough the `/<id>` slug. You can also visit other players using this.

## Flask Server

As the flask server provides a REST-like API it should be possible to access the server from any device.

## API

The API itself works in the following way:
In the /api/ route (home or index) are all indices listed.
The client just has to GET from there to get all existing games.
If POST is used at the home route a new game is created and the index is returned.
The client has then the chance to view the created game at /api/<id>/
So if there is already a game listed it is possible to view it by adding the id to the URL.
IMPORTANT: Accessing this route is only possible by adding a randomly generated key.
           This can be anything. It should be saved as a cookie or at least in the browser
           as this key will be used to identify the currently active player. If the browser
           is closed while playing the game and the key is forgotten there is no way to return the
           game and play as the same player.
  
So a few examples:

`GET /api/`

```json
[{"id": 0}, {"id": 1}]
```
<hr>

`POST /api/`
  
```json
{"id": 2}
```
<hr>

`GET /api/2/ data={ "key": "unique_player_key" }`
```json
{
    "board": "RNBKQBNRPPPP...",
    "role": "white"
}
```
<hr>

`PUT /2/ data={ "move": "a2a3", "key": "unique_player_key" }`

```json
{
    "board": "R...",
    "valid": true,
    "message": "PASSED",
    "player": "black"
}
```

## React Frontend

The react front end automatically creates a unique key as a cookie and saves it which is why you are recognized as one player even if you save the browser.
