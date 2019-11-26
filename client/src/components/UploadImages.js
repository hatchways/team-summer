import React, { useCallback } from 'react';
import { withStyles, Typography } from '@material-ui/core'
import { useDropzone } from 'react-dropzone';

const styles = {
    uploadContainer: {
        display: 'flex'
    },
    dragBox: {
        display: 'flex',
        border: '2px solid #bdbdbd',
        height: '150px',
        width: '175px',
        margin: '2px',
        padding: '5px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    dragBoxText: {
        margin: 'auto',
        textAlign: 'center',
    },
    images: {
        display: 'flex',
        flexWrap: 'wrap',
        border: '2px solid #bdbdbd',
        borderRadius: '5px',
        height: '150px',
        width: '250px',
        margin: '5px',
        padding: '5px',
        cursor: 'pointer'
    },
    image: {
        maxHeight: '75px',
        maxWidth: '75px',
        padding: '2px'
    }
}

const UploadImages = (props) => {
    const { classes, setImages, images } = props;

    const onDrop = useCallback(acceptedFiles => {
        setImages(acceptedFiles)
    }, [setImages])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <React.Fragment>
            <Typography variant='h3'>Upload images</Typography>
            <div className={classes.uploadContainer} {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={classes.dragBox}>
                    {
                        isDragActive ?
                            <Typography className={classes.dragBoxText} variant='subtitle1'>Drop the files here ...</Typography> :
                            <span className={classes.dragBoxText}>
                                <Typography variant='subtitle1'>Drag 'n' drop some files here,</Typography>
                                <Typography variant='subtitle1'>or click to select files</Typography>
                            </span>
                    }
                </div>
                <div className={classes.images}>
                    {
                        images ?
                            images.map(image => (
                                <img
                                    className={classes.image}
                                    key={image.name}
                                    src={URL.createObjectURL(image)}
                                    alt=""
                                />
                            )) :
                            <Typography variant='subtitle1'>Select images to see preview here.</Typography>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default withStyles(styles)(UploadImages)