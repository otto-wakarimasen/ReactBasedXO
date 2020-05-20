import React from "react";
import Board from "./board";
import calculateWinner from "./helpers/calculateWinner";

export default class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      xIsNext: true,
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0
    };
  }

  handleClick(i) {
    const { xIsNext, history } = this.state;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares }]),
      xIsNext: !xIsNext,
      stepNumber: ++this.state.stepNumber
    });
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: move % 2 ? false : true
    });
  }

  renderMoves() {
    return this.state.history.map((step, move) => {
      const desc = move ? "Ход №" + move : "Начало игры";
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>
            {desc}
          </a>
        </li>
      );
    });
  }

  render() {
    const { xIsNext, history, stepNumber } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Победитель: " + winner;
    } else {
      status = "Следующий ход:" + (xIsNext ? "X" : "O");
    }

    function refreshPage() {
      window.location.reload(false);
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
          <div className="reset">
            <div className="resetBtn" onClick={refreshPage}>
              Начать сначала
            </div>
          </div>
        </div>
        <div className="game-info">
          <div className="history">
            <div>{status}</div>
            <br />
            <hr />
            История ходов:<ul>{this.renderMoves()}</ul>
          </div>
        </div>
      </div>
    );
  }
}
