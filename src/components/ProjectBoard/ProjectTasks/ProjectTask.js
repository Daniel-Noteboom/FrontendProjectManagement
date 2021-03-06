import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProjectTask } from '../../../actions/backlogActions';
import PropTypes from "prop-types";
function ProjectTask(props) {
  const {projectTask} = props;
  let priorityString;
  let priorityClass;

  if(projectTask.priority === 1) {
      priorityClass = "bg-danger text-light"
      priorityString = "HIGH"
  }


  if(projectTask.priority === 2) {
    priorityClass = "bg-warning text-light"
    priorityString = "MEDIUM"
  }

  if(projectTask.priority === 3) {
    priorityClass = "bg-info text-light"
    priorityString = "LOW"
  }
   
  const onDeleteClick = () => {
    props.deleteProjectTask(projectTask.projectIdentifier, projectTask.projectSequence);
  }
  return (
    <div className="card mb-1 bg-light">

        <div className={`card-header text-primary ${priorityClass}`}>
            ID: {projectTask.projectSequence} -- Priority: 
            {" " + priorityString}
        </div>
        <div className="card-body bg-light">
            <h5 className="card-title">{projectTask.summary}</h5>
            <p className="card-text text-truncate ">
                {projectTask.acceptanceCriteria}
            </p>
            <Link to={`/updateProjectTask/${projectTask.projectIdentifier}/${projectTask.projectSequence}`}
                  state={{ projectTask: projectTask }}
                  className="btn btn-primary">
                View / Update
            </Link>

            <button className="btn btn-danger ml-4"
                    onClick={onDeleteClick}>
                Delete
            </button>
        </div>
    </div>
  )
}

ProjectTask.propTypes={
  deleteProjectTask: PropTypes.func.isRequired
}
export default connect(null, {deleteProjectTask})(ProjectTask);
