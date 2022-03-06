import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createNewUser } from '../../actions/securityActions';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import classNames from "classnames";

function Register(props) {
  const { errors } = props;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    });

  const onSubmit = (e) =>  {
    e.preventDefault();
    props.createNewUser(user, navigate);
  }

  const onChange = (e) => {
      setUser({...user, [e.target.name] : e.target.value});
  }

  return (
    <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your Account</p>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className={classNames("form-control form-control-lg", {
                  "is-invalid": errors.fullName
                })}  
                placeholder="Name"
                name="fullName"
                value={user.fullName}
                onChange={onChange}
              />
            </div>
            { errors.fullName && 
              <p className="invalid-feedback">
                  {errors.fullName}
              </p>
                
          }
            <div className="form-group">
              <input
                type="email"
                className={classNames("form-control form-control-lg", {
                  "is-invalid": errors.username
                })}                  
                placeholder="Email Address"
                name="username"
                value={user.username}
                onChange={onChange}
              />
            </div>
            { errors.username && 
              <p className="invalid-feedback">
                  {errors.username}
              </p>    
            }
            <div className="form-group">
              <input
                type="password"
                className={classNames("form-control form-control-lg", {
                  "is-invalid": errors.password
                })}                  
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={onChange}
              />
            </div>
            { errors.password && 
              <p className="invalid-feedback">
                  {errors.password}
              </p>
                
          }
            <div className="form-group">
              <input
                type="password"
                className={classNames("form-control form-control-lg", {
                  "is-invalid": errors.confirmPassword
                })}                  
                placeholder="Confirm Password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={onChange}
              />
            </div>
            { errors.confirmPassword && 
              <p className="invalid-feedback">
                  {errors.confirmPassword}
              </p>
                
            }
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

const mapStateToProps = state => ({
  errors: state.errors
})

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {createNewUser})(Register);