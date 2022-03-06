import React, { useState } from 'react'
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import classNames from "classnames";
import { loginUser } from '../../actions/securityActions';
import { connect } from 'react-redux';

function Login(props) {
    const { errors } = props;
    const navigate = useNavigate();
    const [user, setUser] = useState({
      username: "",
      password: "",
      });
  
    const onSubmit = (e) =>  {
      e.preventDefault();
      props.loginUser(user, navigate);
    }
  
    const onChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
    }
  
    return (
        <div className="login">
        <div className="container">
            <div className="row">
            <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <form onSubmit={onSubmit}>
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
            </div>
            </div>
        </div>
        </div>
    );
}

const mapStateToProps = state => ({
    errors: state.errors
  })
  Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

export default connect(mapStateToProps, {loginUser})(Login);