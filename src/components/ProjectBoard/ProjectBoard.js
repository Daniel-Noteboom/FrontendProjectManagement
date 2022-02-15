import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import {Link, useNavigate, useParams} from "react-router-dom"
import Backlog from './Backlog';
import PropTypes from "prop-types";
import { getBacklog } from '../../actions/backlogActions';

function ProjectBoard(props) {
    const {projectTasks} = props.backlog;
    const params = useParams();
    const firstRun = useRef(true);
    const navigate = useNavigate();
    useEffect(() => {
        if(firstRun.current) {
            const {id} = params;
            props.getBacklog(id);
            firstRun.current = false;
        }
    })
  
  let BoardContent;
  const boardAlgorithm = (errors, projectTasks) => {
      if(projectTasks.length < 1) {
          if(errors.projectNotFound) {
              return (
                  <div className="alert alert-danger text-center" role="alert">
                    {errors.projectNotFound}
                  </div>
              )
          } else {
              return (
                <div className="alert alert-info text-center" role="alert">
                    No Project Tasks on this board
                </div>
              )
          }
      } else {
          return <Backlog projectTasks={projectTasks}/>
      }
  }

  return (
     <div className="container">
     <Link to={`/addProjectTask/${params.id}`} className="btn btn-primary mb-3">
         <i className="fas fa-plus-circle"> Create Project Task</i>
     </Link>
     <br />
     <hr />
    { boardAlgorithm(props.errors, projectTasks) }
    </div>
  )
}

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
})

ProjectBoard.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getBacklog})(ProjectBoard);