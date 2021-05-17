import React from 'react';
import { Link } from 'react-router-dom';
import { toGamePath } from '../Constants';
import './GameList.css';

const numberWords = [
    'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 
    'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
    'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
];


export const GameList = (props) => {
    const { games } = props;

    if (!games || games.length === 0) {
        return (<p>No games available.</p>);
    }

    return (
        <ul>
            <h2 className='list-head'>Listing all games</h2>
            {games.map((game) => {
                return (
                    <Link key={game.id} to={toGamePath(game.id)} className='game-link'>
                        <li className='game-list'>
                                {'Game ' + numberWords[game.id]}
                        </li>
                    </Link>
                );
            })}
        </ul>
    );
};

export function GameListLoading(Component) {
    return function GameListLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return (<Component {...props} />);
        return (
            <p style={{ textAlign: 'center', fontSize: '30px' }}>
                Fetching the data... This might take a while...
            </p>
        );
    };
};

