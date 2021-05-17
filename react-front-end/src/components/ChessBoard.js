import React from 'react';
import ChessRow from './ChessRow';
import './ChessBoard.css';

// Handles the move and the clicks
class ChessBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstMove: [-1, -1],  // Remember first move
            secondMove: [-1, -1], // Remember second move
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(row, column) {
        if (this.state.firstMove[0] === -1 && this.state.firstMove[1] === -1) {
            // Set the first move
            this.setState({
                firstMove: [row, column],
            });
        } else if (this.state.firstMove[0] === row && this.state.firstMove[1] === column) {
            // If the second click equals the first selection remove the selection
            this.setState({
                firstMove: [-1, -1],
            });
        } else if (!(this.state.firstMove[0] === row && this.state.firstMove[1] === column)) {
            // Otherwise select also the second one and make a move
            this.setState({
                secondMove: [row, column],
            },
            this.makeMove // Callback when the state setting was finished
            );
        }
    }

    makeMove() {
        this.props.makeMove(this.state.firstMove, this.state.secondMove)

        this.setState({
            firstMove: [-1, -1],
            secondMove: [-1, -1],
        });
    }

    render() {
        return (
            <div className='chessboard'>
                <table>
                    <tbody>
                        {this.props.board.map((row, i) => {
                            return (
                                <ChessRow
                                active={ i === this.state.firstMove[0] ? this.state.firstMove[1] : null }
                                key={i}
                                content={this.props.board[i]}
                                row={i}
                                handleClick={this.handleClick}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default ChessBoard;
