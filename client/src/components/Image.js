import React, { useState } from 'react';
import { withStyles } from '@material-ui/core'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const styles = {
  deleteIconContainer: {
    position: 'absolute',
    height: '75',
    width: '75',
    backgroundColor: 'grey',
    opacity: '50%',
    borderRadius: '10',
    display: 'flex',
  },
  deleteIcon: {
    height: '30',
    width: '30',
    margin: 'auto',
    opacity: '100%'
  },
  imageContainer: {
    margin: '4',
    maxHeight: '75',
  },
  image: {
    maxHeight: '75',
    maxWidth: '75',
    borderRadius: '10',
    cursor: 'pointer'
  }
}

const Image = (props) => {
  const { classes, image, deleteImage } = props;
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