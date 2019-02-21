import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      prevRes: 0,
      prevOp: "+",
      newNum: true,
      repEq: false,
      repOp: 0
    }
  }

  render() {
    return (
      <div className="App">
        <table className="Calculator" border="1">
          <tbody>
            <tr>
              <th className="calcResult" colSpan="4">
                {this.state.result}
              </th>
            </tr>
            <tr>
              <td className="calcButtonRes" colSpan="2" onClick={() => this.clear()}>{"CLEAR"}</td>
              <td className="calcButtonOp" colSpan="1" onClick={() => this.opClick("*")}>{"*"}</td>
              <td className="calcButtonOp" colSpan="1" onClick={() => this.opClick("/")}>{"÷"}</td>
            </tr>
            <tr>
              <td className="calcButtonNum" colSpan="1" onClick={() => this.numClick(7)}>{"7"}</td>
              <td className="calcButtonNum" colSpan="1" onClick={() => this.numClick(8)}>{"8"}</td>
              <td className="calcButtonNum" colSpan="1" onClick={() => this.numClick(9)}>{"9"}</td>
              <td className="calcButtonOp" colSpan="1" onClick={() => this.opClick("-")}>{"-"}</td>
            </tr>
            <tr>
              <td className="calcButtonNum" colSpan="1" onClick={() => this.numClick(4)}>{"4"}</td>
              <td className="calcButtonNum" colSpan="1" onClick={() => this.numClick(5)}>{"5"}</td>
              <td className="calcButtonNum" colSpan="1" onClick={() => this.numClick(6)}>{"6"}</td>
              <td className="calcButtonOp" colSpan="1" onClick={() => this.opClick("+")}>{"+"}</td>
            </tr>
            <tr>
              <td className="calcButtonNum" colSpan="1" onClick={() => this.numClick(1)}>{"1"}</td>
              <td className="calcButtonNum" colSpan="1" onClick={() => this.numClick(2)}>{"2"}</td>
              <td className="calcButtonNum" colSpan="1" onClick={() => this.numClick(3)}>{"3"}</td>
              <td className="calcButtonOp" colSpan="1" onClick={() => this.opClick("=")}>{"="}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  numClick(num) {
    if (this.state.newNum == true) {
      console.log("Writing next Num")
      this.setState({ prevRes: this.state.result })
      this.setState({ result: num });
      this.setState({ newNum: false });
    } else {
      this.setState({ result: this.state.result * 10 + num });
    }
  }

  opClick(op) {
    //Calculate result if user presses equals, or on 2nd operator
    console.log("Calculating result");

    //1st & 2nd operands
    var first;
    var second;

    //If not repeating equals, change the 2nd operand
    if (!this.state.repEq) {
      first = this.state.prevRes;
      second = this.state.result;
    } else { //If repeating equals, set first op to current result
      first = this.state.result;
      second = this.state.repOp;
    }

    if (op == "=") {
      //Repeat operator and 2nd operand with consecutive clicks
      this.setState({ repEq: true });
      this.setState({ repOp: second });

      this.calcResult(first, second)
    } else if (second != null) {

      //Only calculate when repEq is false
      if (!this.state.repEq) {
        this.calcResult(first, second);
      }
      this.setState({ prevOp: op });
      this.setState({ newNum: true });
      this.setState({ repEq: false });
    }
  }

  calcResult(first, second) {
    //Calculate current number with last number
    var calcResult;


    switch (this.state.prevOp) {
      case ("+"):
        calcResult = first + second;
        break;
      case ("-"):
        calcResult = first - second;
        break;
      case ("*"):
        calcResult = first * second;
        break;
      case ("/"):
        calcResult = first / second;
        break;
    }
    this.setState({ prevRes: second });
    this.setState({ result: calcResult });
  }

  clear() {
    this.setState({ prevRes: 0 }); //Previous result stored
    this.setState({ result: 0 }) //Current result displayed
    this.setState({ prevOp: "+" }) //Previous operator
    this.setState({ newNum: true }) //Start writing a new num
    this.setState({ repEq: false })  //Repeated equals
    this.setState({ repOp: 0 }) //Repeated operand
  }

}

export default App;
