import React from 'react';

const ProjectCard = ({name, funding, goal, imageUrl}) => {

  return(
      <div className="project-card">
        <div className='project-image'>
            <img src={imageUrl} />
        </div>
        <div className="project-name">
          <p>{title}</p>
        </div>

        <div className="project-status">
          <p>{`${funding} / ${goal}`}</p>
        </div>
    </div>
  )
}

export default ProjectCard;
