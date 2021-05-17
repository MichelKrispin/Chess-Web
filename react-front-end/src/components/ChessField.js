import React from 'react';
import ImageCard from './ImageCard';


const ChessField = (props) => {
    const className =
    ((props.column % 2 === (props.row % 2)) ? 'light' : 'dark') +
    (props.active ? ' active' : '');
    
    const image = props.figure !== ' ' ? ImageCard( props.figure ) : null;

    return (
        <button
         onClick={() => {
             props.handleClick(props.row, props.column);
            }}
            className={className}
            >
            {image}
            { /* props.figure */ }
        </button>
    );
};

export default ChessField;
