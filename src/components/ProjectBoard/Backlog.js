import React from 'react'
import ProjectTask from './ProjectTasks/ProjectTask'

function Backlog(props) {
  const {projectTasks} = props;
  const tasks = projectTasks.map(projectTask => (
     <ProjectTask key={projectTask.id} projectTask={projectTask} />
  ));

  let toDoItems = tasks.filter(task => {
      return task.props.projectTask.status === "TO_DO"
  });

  let inProgressItems = tasks.filter(task => {
    return task.props.projectTask.status === "IN_PROGRESS"
  });

  let doneItems = tasks.filter(task => {
    return task.props.projectTask.status === "DONE"
  });


  return (
     <div className="container">
         <div className="row">
             <div className="col-md-4">
                 <div className="card text-center mb-2">
                     <div className="card-header bg-secondary text-white">
                         <h3>TO DO</h3>
                     </div>
                 </div>
            
            {toDoItems}
             </div>
             <div className="col-md-4">
                 <div className="card text-center mb-2">
                     <div className="card-header bg-primary text-white">
                         <h3>In Progress</h3>
                     </div>
                 </div>
               {inProgressItems}
             </div>
             <div className="col-md-4">
                 <div className="card text-center mb-2">
                     <div className="card-header bg-success text-white">
                         <h3>Done</h3>
                     </div>
                 </div>
                {doneItems}
             </div>
         </div>
    </div>
  )
}

export default Backlog
