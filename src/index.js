import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';
import {BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import AddProject from './components/Projects/AddProject';
import {connect, Provider} from "react-redux";
import store from "./store";
import UpdateProject from './components/Projects/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import AddProjectTask from './components/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './components/Layout/Landing';
import Register from './components/UserManagement/register';
import Login from './components/UserManagement/login';
import checkValidToken from "./security/checkValidToken";
import jwtDecode from "jwt-decode";
import { SET_TOKEN } from './actions/types';
import setTokenHeader from './security/setTokenHeader';
import { loginHelper, loginUser, logout, logoutHelper } from './actions/securityActions';
import PropTypes from "prop-types";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.IsAuth = this.IsAuth.bind(this);
    const jwtToken = localStorage.token;
    if (jwtToken) {
      loginHelper(store.dispatch, jwtToken);
      const decodedJwtToken = jwtDecode(jwtToken);
      const currentTime = Date.now() / 1000;
      if (decodedJwtToken.exp < currentTime) {
        logoutHelper(store.dispatch);
      }
    }
  }
  
  
  IsAuth({ children, redirectTo, authNeeded }) {
    let state = store.getState();
    let validToken = state.security.success;
    authNeeded = authNeeded == "false" ? false : true;
    if((authNeeded && validToken) || (!authNeeded && !validToken))
      return children 
    else return <Navigate to={redirectTo} />;
  }

  render() {
    const IsAuth = this.IsAuth;
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Header />  
            <Routes>
              <Route path="" element={
                <IsAuth redirectTo="/dashboard" authNeeded = "false">
                  <Landing />
                </IsAuth> }/>
              <Route path="register" element={
                <IsAuth redirectTo="/dashboard" authNeeded = "false">
                  <Register />
                </IsAuth>
              } />
              <Route path="login" element={
                <IsAuth redirectTo="/dashboard" authNeeded = "false">
                  <Login />
                </IsAuth>
              } />
              <Route path="dashboard" element={
                <IsAuth redirectTo="/login" authNeeded ="true">
                  <Dashboard />
                </IsAuth>
              } />              
              <Route path="addProject" element={
                <IsAuth redirectTo="/login" authNeeded ="true">
                  <AddProject />
                </IsAuth>
              } />              
              <Route path="updateProject/:id" element={
                <IsAuth redirectTo="/login" authNeeded ="true">
                  <UpdateProject />
                </IsAuth>
              } />              
              <Route path="projectBoard/:id" element={
                <IsAuth redirectTo="/login" authNeeded ="true">
                  <ProjectBoard />
                </IsAuth>
              } />              
              <Route path="addProjectTask/:id" element={
                <IsAuth redirectTo="/login" authNeeded ="true">
                  <AddProjectTask />
                </IsAuth>
              } />              
              <Route path="updateProjectTask/:id/:taskId" element={
                <IsAuth redirectTo="/login" authNeeded ="true">
                  <UpdateProjectTask />
                </IsAuth>
              } />
            </Routes>
          </div>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));