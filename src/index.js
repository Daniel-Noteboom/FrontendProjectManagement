import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AddProject from './components/Projects/AddProject';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />  
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addProject" element={<AddProject />} />

            <Route path="/addProject" component={AddProject}/>
          </Routes>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// function ChangeButton(props) {
  //   return (
  //     <button className={props.className} 
  //     onClick={props.onClick}>{props.name}
  //     </button>
  //   );
  // }
  // class Counter extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       counter: 0
  //     }
  //   }
  //   render() {
  //     return (
  //       <div className = {"main"}>
  //         <h1> React Counter </h1>
  //         <h1> {this.state.counter} </h1>
  //         <ChangeButton
  //           name={"Increment"}
  //           className={"btn btn-success"}
  //           onClick={() => this.setState({counter: this.state.counter + 1})}
  //         />
  //         <ChangeButton
  //           name={"Decrement"}
  //           className={"btn btn-danger"}
  //           onClick={() => this.setState({counter: this.state.counter - 1})}
  //         />
  //         <ChangeButton
  //           name={"Reset"}
  //           className={"btn btn-primary"}
  //           onClick={() => this.setState({counter: this.state.counter = 0})}
  //         />
  //       </div>
  //     )
  
  //   }
  // }