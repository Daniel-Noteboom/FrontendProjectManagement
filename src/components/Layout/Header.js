import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { logout } from '../../actions/securityActions';

export class Header extends Component {

  logout() {   
    this.props.logout();
  }  
  render() {
    const { success} = this.props.token;
    return (
        <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
            <Link to="/" className="navbar-brand">
                Personal Project Management Tool
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="mobile-nav">
            { success && 

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                        className="nav-link"
                        to="/login"
                        onClick={this.logout.bind(this)}
                        >
                        Logout
                        </Link>
                    </li>
                </ul>
}
{ !success && 
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/register" className="nav-link">
                            Sign Up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            Login
                        </Link>
                    </li>
                </ul>
            }
            </div>
        </div>
    </nav>
    </div>
    )
  }
}

const mapStateToProps = state => ({
    token: state.security
})

Header.propTypes = {
    token: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}
export default connect(mapStateToProps, {logout})(Header)
