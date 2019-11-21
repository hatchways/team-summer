import React from 'react';

const UserDetailsSidebar = ({name, funding, goal, imageUrl}) => {

    return (
        <div>
            <img src={imageUrl} />
            <div>{name}</div>
            <div>{location}</div>
            <div>{about}</div>
            <div>{expertise}</div>
        </div>
    )
}

export default UserDetailsSidebar;
