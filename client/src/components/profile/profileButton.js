import React from 'react';

const ProfileButton = ({type, clsName, handleClick}) => {

  const btnText = type === 'user' ? 'edit' : 'submit'

  const baseClass = "btn"
  const cls = clsName ? `${baseClass} ${clsName}` : baseClass

    return (
        <div>
    	      <button
                className={cls}
                onClick={handleClick}>
                {btnText}
    	      </button>
        </div>
    );
}

export default ProfileButton;