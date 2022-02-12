import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from "classnames";
import { addProjectTask} from '../../../actions/backlogActions';
import PropTypes from "prop-types";

function AddProjectTask(props) {
    const params = useParams();
    const navigate = useNavigate();
    const {id} = params;
    const {errors} = props;
    const [projectTask, setProjectTask] = useState({
    "summary": "",
    "acceptanceCriteria": "",
    "status": "",
    "priority": 0,
    "dueDate": "",
    "projectIdentifier": id,
    "errors": {}
    });
    const onSubmit = (e) =>  {
        e.preventDefault();
        props.addProjectTask(id, projectTask, navigate);
    }

    const onChange = (e) => {
        setProjectTask({...projectTask, [e.target.name] : e.target.value});
    }
  return (
    <div className="add-PBI">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Link to={`/projectBoard/${id}`} className="btn btn-light">
                        Back to Project Board
                    </Link>
                    <h4 className="display-4 text-center">Add Project Task</h4>
                    <p className="lead text-center">Project Name + Project Code</p>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" 
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.summary
                                    })}  
                                    name="summary" 
                                    placeholder="Project Task summary"
                                    value={projectTask.summary}
                                    onChange={onChange}
                                    />
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
                                        value={projectTask.acceptanceCriteria}
                                        onChange={onChange} 
                                        ></textarea>
                        </div>
                        <h6>Due Date</h6>
                        <div className="form-group">
                            <input type="date" 
                                    className="form-control form-control-lg" 
                                    name="dueDate"
                                    value={projectTask.dueDate}
                                    onChange={onChange} 
                                    />
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" 
                                    name="priority"
                                    value={projectTask.priority}
                                    onChange={onChange} 
                                    >
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
                                    onChange={onChange} 
                                    >
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
    errors: state.errors
})

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {addProjectTask})(AddProjectTask);
