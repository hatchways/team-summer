import React, { useState } from 'react';
import { withStyles } from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const styles = {
  deleteIconContainer: {
    position: 'absolute',
    height: '75px',
    width: '75px',
    backgroundColor: 'grey',
    opacity: '50%',
    borderRadius: '10px',
    display: 'flex',
  },
  deleteIcon: {
    height: '30px',
    width: '30px',
    margin: 'auto',
    opacity: '100%'
  },
  imageContainer: {
    margin: '4px',
    maxHeight: '75px',
  },
  image: {
    maxHeight: '75px',
    maxWidth: '75px',
    borderRadius: '10px',
    cursor: 'pointer'
  }
}

const Image = (props) => {
  const { classes, image, deleteImage, showBig } = props;
  const [isHovering, setHovering] = useState(false);

  const handleMouseHover = () => {
    setHovering(toggleHoverState)
  }

  const toggleHoverState = () => {
    setHovering(!isHovering)
  }

  return (
    <div className={classes.imageContainer} onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover}>
      {
        isHovering && <div className={classes.deleteIconContainer}><DeleteOutlinedIcon className={classes.deleteIcon} /></div>
      }
      <img
        onClick={() => deleteImage(image)}
        className={classes.image}
        key={image.name}
        src={URL.createObjectURL(image)}
        alt=""
      />
    </div>
  )
}

export default withStyles(styles)(Image);