from Chess.Chess.Chess import ChessGame
from Chess.Chess.ChessMove import ChessMove

def validate_request_data(data):
    """
    Check whether the data is a string which start with
    two characters such as a1 and ends with them.
    Allowed are characters from a-h and numbers from 1-8
    In ASCII the valid range is
     a    1  -   h   8
    (97)(49) - (104)(56)
    """
    if len(data) < 4:
        return False

    # If first character isn't between a and h
    if data[0] < 'a' or data[0] > 'h':
        return False
    # If second character isn't between 1 and 8
    if data[1] < '1' or data[1] > '8':
        return False

    if data[-2] < 'a' or data[-2] > 'h':
        return False
    if data[-1] < '1' or data[-1] > '8':
        return False
    
    return True # If passed it is valid

class GameHandler:
    """ A wrapper class which keeps track of all games. """

    def __init__(self):
        self.games = []
        """ Looks like:
        {
            games: None,      # A ChessGames class (actual games)
            white_key: None,  # A corresponding player key
            black_key: None,
        }
        """

    def new_game(self):
        """ Create a new game and return its id. """
        self.games.append({
            'games': ChessGame(),
            'white_key': None,
            'black_key': None,
        })
        return len(self.games) - 1

    def get_board(self, id):
        """ Return the board of the id-th game. """
        return self.games[id]['games'].board

    def get_active_player(self, id):
        """ Returns the active player of the game as a string. """
        return 'black' if self.games[id]['games'].active_player else 'white'

    def is_active_player(self, id, key):
        """ Returns true if the active key is the active player. """
        return self.games[id][f"{self.get_active_player(id)}_key"] == key

    def get_user_role(self, id, key):
        """
        Checks whether the asking user belongs to this game.
        If not and there are empty slots in this game the user will be put into one.
        Otherwise he is just a guest.
        The return options are
        'white', 'black', 'guest'
        """
        if self.games[id]['white_key'] == None:
            self.games[id]['white_key'] = key
            return 'white'
        if self.games[id]['black_key'] == None:
            self.games[id]['black_key'] = key
            return 'black'

        if self.games[id]['white_key'] == key:
            return 'white'
        if self.games[id]['black_key'] == key:
            return 'black'
        else:
            return 'guest'

    def make_move(self, id, new_move):
        """
        Make the move for the id-th game and return if its valid and its response.
        return valid, message
        """
        valid = False
        if validate_request_data(new_move):
            move = self.games[id]['games'].make_move(
                new_move[0], int(new_move[1]), new_move[-2], int(new_move[-1]))
            if move != ChessMove.INVALID_MOVE:
                valid = True
        return valid, move.name

    def has_players(self, id):
        """ Returns a tuple of bools whether there are keys for the id-th game. """
        white_player_exists = self.games[id]['white_key'] != None
        black_player_exists = self.games[id]['black_key'] != None
        return white_player_exists, black_player_exists

    @property
    def number_of_games(self):
        """ Return the currently handled number of games. """
        return len(self.games)


