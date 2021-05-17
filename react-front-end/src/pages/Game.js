import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { putData, postData, fetchKey } from '../FetchData';
import { baseURL, refreshInterval } from '../Constants';
import ChessBoard from '../components/ChessBoard';
import './Game.css';

const initialBoard = [
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
];

// Makes a put request to check whether the move is correct and creates a new board
const askForMove = (fromMove, toMove, id, key, setBoard, setFlatBoard, setMessage) => {
    // Reverse the row index as the chess board has 1,1 on the bottom left
    let fromMoveRow = 8 - fromMove[0];
    let fromMoveCol = String.fromCharCode(97 + fromMove[1]); // Add one as column starts from 1

    let toMoveRow = 8 - toMove[0];
    let toMoveCol = String.fromCharCode(97 + toMove[1]); // Add one as column starts from 1
    
    // Then assemble a request
    putData(baseURL + id + '/', {
        'move': fromMoveCol + fromMoveRow + toMoveCol + toMoveRow,
        'key': key,
    }).then((message) => {
        generateBoard(message.board, setBoard, setFlatBoard);
        message.valid ?
            setMessage('Its now ' + message.player + "'s turn")
        :
            setMessage('Invalid move (' + message.message + ')')
        ;
    });
};

// The flat board is just a sequence of characters
const generateBoard = (flat_board, setBoard, setFlatBoard) => {
    setFlatBoard(flat_board);
    const board = [[], [], [], [], [], [], [], []];

    let array_index = 0;
    for (let i = 0; i < flat_board.length; i++) {
        board[array_index].push(flat_board.charAt(i));
        if ((i+1) % 8 === 0) array_index += 1;
    }
    setBoard(board);
};

const Game = (props) => { 
    const [board, setBoard] = useState(initialBoard); 
    const [flatBoard, setFlatBoard] = useState(''); 
    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');
    const { id } = useParams();
    
    // postData to view the board the first time this component loads
    useEffect(() => {
        postData(baseURL + id + '/', {'key': key})
            .then((message) => {
                generateBoard(message.board, setBoard, setFlatBoard);
                setMessage('You are ' + message.role);
            });
        setKey(fetchKey());

        // Refresh the board 
        setInterval(() => {
            postData(baseURL + id + '/', {'key': key})
                .then(message => {
                    if (message.board !== flatBoard) {
                        generateBoard(message.board, setBoard, setFlatBoard);
                    }
                });
           }, refreshInterval);
    }, [id, key, flatBoard]);



    return (
        <>
            <h2>{message}</h2>
            <ChessBoard
            board={board}
            makeMove={(fromMove, toMove) => {
                if (message !== 'You are guest') {
                    askForMove(fromMove, toMove, id, key, setBoard, setFlatBoard, setMessage);
                }
            }}
            />
        </>
    );
};

export default Game;