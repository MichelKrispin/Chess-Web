import React from 'react';
import ChessField from './ChessField.js';

const ChessRow = (props) => {
    return (
        <tr>
            {props.content.map((figure, i) => {
                return (
                    <td key={i}>
                        <ChessField
                        active={ i === props.active }
                        figure={figure}
                        handleClick={props.handleClick}
                        row={props.row}
                        column={i}
                        />
                    </td>
                );
            })}
        </tr>
    );
};

export default ChessRow;
