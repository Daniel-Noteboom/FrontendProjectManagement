import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import AddProject from './components/Projects/AddProject';
import {Provider} from "react-redux";
import store from "./store";
import UpdateProject from './components/Projects/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Header />  
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="addProject" element={<AddProject />} />
              <Route path="updateProject/:id" element={<UpdateProject />} />
              <Route path="/projectBoard/:id" element={<ProjectBoard />} />
              <Route path="/addProjectTask/:id" element={<AddProjectTask />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));