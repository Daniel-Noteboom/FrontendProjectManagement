import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
function ChangeButton(props) {
  return (
    <button className={props.className} 
    onClick={props.onClick}>{props.name}
    </button>
  );
}
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }
  render() {
    return (
      <div className = {"main"}>
        <h1> React Counter </h1>
        <h1> {this.state.counter} </h1>
        <ChangeButton
          name={"Increment"}
          className={"btn btn-success"}
          onClick={() => this.setState({counter: this.state.counter + 1})}
        />
        <ChangeButton
          name={"Decrement"}
          className={"btn btn-danger"}
          onClick={() => this.setState({counter: this.state.counter - 1})}
        />
        <ChangeButton
          name={"Reset"}
          className={"btn btn-primary"}
          onClick={() => this.setState({counter: this.state.counter = 0})}
        />
      </div>
    )

  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     history: [
  //       {
  //         squares: Array(9).fill(null)
  //       }
  //     ],
  //     stepNumber: 0,
  //     xIsNext: true
  //   };
  // }

  // handleClick(i) {
  //   const history = this.state.history.slice(0, this.state.stepNumber + 1);
  //   const current = history[history.length - 1];
  //   const squares = current.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? "X" : "O";
  //   this.setState({
  //     history: history.concat([
  //       {
  //         squares: squares,
  //         move: i
  //       }
  //     ]),
  //     stepNumber: history.length,
  //     xIsNext: !this.state.xIsNext,
  //     chronological: true
  //   });
  // }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: (step % 2) === 0
  //   });
  // }

  // render() {
  //   const history = this.state.history;
  //   const current = history[this.state.stepNumber];
  //   const winningIndexes = calculateWinner(current.squares);
  //   const winner = winningIndexes != null ? current.squares[winningIndexes[0]] : null;

  //   const moves = history.map((step, move) => {
  //     const desc = move ?
  //       'Go to move #' + move :
  //       'Go to game start';
  //     return (
  //       <li key={move} className={this.state.stepNumber == move ? 'bold' : ''}>
  //         <button onClick={() => this.jumpTo(move)}>{desc}</button>
  //         <span> {step.move != null ? Math.floor(step.move / 3) + ',' + step.move % 3 : ''}</span>
  //       </li>
  //     );
  //   });

  //   let status;
  //   if (winner) {
  //     status = "Winner: " + winner;
  //   } else if(this.state.stepNumber == 9) {
  //     status = "Draw"
  //   } else {
  //     status = "Next player: " + (this.state.xIsNext ? "X" : "O");
  //   }

  //   return (
  //     <div className="game">
  //       <div className="game-board">
  //         <Board
  //           squares={current.squares}
  //           onClick={i => this.handleClick(i)}
  //           winningIndexes={winningIndexes}
  //         />
  //       </div>
  //       <div className="game-info">
  //         <div>{status}</div>
  //         <ol>{this.state.chronological ? moves : moves.reverse()}</ol>
  //         <button onClick={() => this.setState({
  //           chronological : !this.state.chronological
  //         })
  //       }> Toggle</button>
  //       </div>
  //     </div>
  //   );
  // }
// }

