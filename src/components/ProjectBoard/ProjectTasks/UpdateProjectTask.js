import React, { useEffect, useRef, useState } from 'react'
import PropTypes from "prop-types"
import { connect } from 'react-redux'
import { updateProjectTask, getProjectTask } from '../../../actions/backlogActions'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import classnames from "classnames";
function UpdateProjectTask(props) {
  const { errors } = props;
  const navigate = useNavigate();



  const location = useLocation();

  const [projectTask, setProjectTask] = useState(location.state == null ? {summary: "",
                                                                          acceptanceCriteria: "",
                                                                          dueDate: "",
                                                                          priority: "",
                                                                          status: ""
                                                                            } : location.state.projectTask);
  const [origProjectTask, setOrigProjectTask] = useState(projectTask);

  const params = useParams();
  const firstRun = useRef(true);

  const { id } = params;
  const { taskId } = params;


  useEffect(() => {
    if(location.state == null && Object.keys(props.projectTask).length === 0 && !errors.projectNotFound) {
        props.getProjectTask(id, taskId);
    }
    
    if(errors.projectNotFound) {
        navigate("/dashboard");
    }
    if(Object.keys(props.projectTask).length !== 0 && firstRun.current) {
        setProjectTask(props.projectTask);
        setOrigProjectTask(props.projectTask);
        firstRun.current = false;
    }
  })

  const onChange = (e) => {
    setProjectTask({...projectTask, [e.target.name] : e.target.value});
  }

  const onSubmit = (e) =>  {
    e.preventDefault();
    props.updateProjectTask(projectTask, navigate);
    setProjectTask(origProjectTask);
  }

  return (
    <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to= {`/projectBoard/${id}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Update Project Task</h4>
                    <p className="lead text-center">Project Name: {projectTask.projectIdentifier} + Project Task ID: {projectTask.projectSequence}</p>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" 
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.summary
                                    })}  
                                    name="summary" 
                                    placeholder="Project Task summary"
                                    value= {projectTask.summary}
                                    onChange={onChange}/>
                        </div>
                        { errors.summary && 
                            <p className="invalid-feedback">
                                {errors.summary}
                            </p>
                              
                        }
                        <div className="form-group">
                            <textarea className="form-control form-control-lg" 
                                        placeholder="Acceptance Criteria" 
                                        name="acceptanceCriteria"
                                        value= {projectTask.acceptanceCriteria || ""}
                                        onChange={onChange}></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input type="date" 
                                    className="form-control form-control-lg" 
                                    name="dueDate" 
                                    value={projectTask.dueDate || ""}
                                    onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" 
                                    name="priority"
                                    value={projectTask.priority}
                                    onChange={onChange}>
                                <option value={0}>Select Priority</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <select className="form-control form-control-lg" 
                                    name="status"
                                    value={projectTask.status}
                                    onChange={onChange}>
                                <option value="">Select Status</option>
                                <option value="TO_DO">TO DO</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="DONE">DONE</option>
                            </select>
                        </div>

                        <input type="submit" className="btn btn-primary btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
const mapStateToProps = state => ({
    errors: state.errors,
    projectTask: state.backlog.projectTask
})

UpdateProjectTask.propTypes = {
    updateProjectTask: PropTypes.func.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    projectTask: PropTypes.object.isRequired
}
export default connect(mapStateToProps, {updateProjectTask, getProjectTask})(UpdateProjectTask)
