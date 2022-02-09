import React, { useEffect, useState, useRef } from "react";
import {getProject, createProject} from "../../actions/projectActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import { useLocation, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

function UpdateProject(props) {
    const location = useLocation();
    const {errors} = props;

    const [project, setProject] = useState(location.state == null ? {} : location.state.project);
    const [origProject, setOrigProject] = useState(project);
    const firstRun = useRef(true);
    const params = useParams();
    if(location.state == null && Object.keys(props.project).length === 0) {
        const { id } = params;
        props.getProject(id);
    }
    useEffect(() => {
        if(Object.keys(props.project).length !== 0 && firstRun.current) {
            setProject(props.project);
            setOrigProject(props.project);
            firstRun.current = false;
        }
    })
    const onSubmit = (e) =>  {
        e.preventDefault();
        props.createProject(project);
        setProject(origProject);
    }
    const onChange = (e) => {
        setProject({...project, [e.target.name] : e.target.value});
    }
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Project form</h5>
              <hr />
              {(errors.projectIdentifier || props.submitted) &&  (
                <Navigate to="/dashboard" replace={true} />
              )}
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.projectName
                      })}  
                    placeholder="Project Name"
                    name="projectName"
                    value={project.projectName}
                    onChange={onChange} 
                  />
                </div>
                { errors.projectName && 
                    <p className="invalid-feedback">
                        {errors.projectName}
                    </p>
                      
                }
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={project.id}
                    name="projectIdentifier"
                    value={project.identifier}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <textarea
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.description
                  })}  
                    placeholder="Project Description"
                    name="description"
                    value={project.description}
                    onChange={onChange} 
                  />
                </div>
                { errors.description && 
                    <p className="invalid-feedback">
                        {errors.description}
                    </p>
                      
                }
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="startDate"
                    value={project.startDate}
                    onChange={onChange} 
                  />
                </div>

                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="endDate"
                    value={project.endDate}
                    onChange={onChange} 
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = state => ({
    project: state.project.project,
    submitted: state.project.submitted,
    errors: state.errors
})
UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    createProject: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    submitted: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {getProject, createProject})(UpdateProject)