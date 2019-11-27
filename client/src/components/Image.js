import React, { useState } from 'react';
import { withStyles } from '@material-ui/core'

const styles = {
  deleteIcon: {
    margin: 'auto',
    position: 'absolute',
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
  const { classes, image, deleteImage } = props;
  const [isHovering, setHovering] = useState(false);

  const handleMouseHover = () => {
    setHovering(toggleHoverState)
  }

  const toggleHoverState = () => {
    setHovering(!isHovering)
  }

  return (
    <div className={classes.imageContainer}>
      {
        isHovering && <sup className={classes.deleteIcon}>Click to delete</sup>
      }
      <img
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
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