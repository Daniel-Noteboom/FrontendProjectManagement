import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux"
import { createProject } from "../../actions/projectActions";
import { Navigate } from "react-router-dom";
import classnames from "classnames";
export class AddProject extends Component {
  constructor() {
      super()

      this.state = {
        "projectName": "",
        "projectIdentifier": "",
        "description": "",
        "startDate": "",
        "endDate": "",
        "submitted": false,
        "errors": {}
      }
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
      this.setState( {
        [e.target.name]: e.target.value
      });
  }

  onSubmit(e) {
    e.preventDefault();
    const newProject = {
        "projectName": this.state.projectName,
        "projectIdentifier": this.state.projectIdentifier,
        "description": this.state.description,
        "startDate": this.state.startDate,
        "endDate": this.state.endDate
    }
    this.props.createProject(newProject);
  }

  render() {
    const {errors} = this.props;
    const {project} = this.props;

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create Project form</h5>
                        <hr />
                        {project.submitted && (
                            <Navigate to="/dashboard" replace={true} />
                          )}
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" 
                                className={classnames("form-control form-control-lg", {
                                    "is-invalid": errors.projectName
                                  })}    
                                        placeholder="Project Name" 
                                       name="projectName"
                                       value={this.state.projectName}
                                       onChange={this.onChange} />
                            </div>
                            { errors.projectName && 
                                <p className="invalid-feedback">
                                    {errors.projectName}
                                </p>
                                  
                            }
                            <div className="form-group">
                                <input type="text" 
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.projectIdentifier
                                        })}  
                                       placeholder="Unique Project ID" 
                                       name="projectIdentifier"
                                       value={this.state.projectIdentifier}
                                       onChange={this.onChange}
                                     />
                            </div>
                            { errors.projectIdentifier && 
                                <p className="invalid-feedback">
                                    {errors.projectIdentifier}
                                </p>
                                  
                            }
                            <div className="form-group">
                                <textarea  className={classnames("form-control form-control-lg", {
                                                "is-invalid": errors.description
                                            })}  
                                          placeholder="Project Description" 
                                          name="description"
                                          value={this.state.description}
                                          onChange={this.onChange}></textarea>
                            </div>
                            { errors.description && 
                                <p className="invalid-feedback">
                                    {errors.description}
                                </p>
                                  
                            }
                            <h6>Start Date</h6>
                            <div className="form-group">
                                <input type="date" 
                                       className="form-control form-control-lg" 
                                       name="startDate"
                                       value={this.state.startDate}
                                       onChange={this.onChange}
                                       />
                            </div>
                            <h6>Estimated End Date</h6>
                            <div className="form-group">
                                <input type="date" 
                                       className="form-control form-control-lg" 
                                       name="endDate"
                                       value={this.state.endDate} 
                                       onChange={this.onChange}
                                       />
                            </div>

                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    project: state.project
})

export default connect(mapStateToProps, 
                        {createProject}) (AddProject);
