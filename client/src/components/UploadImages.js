import React, { useCallback } from 'react';
import { withStyles, Typography } from '@material-ui/core'
import { useDropzone } from 'react-dropzone';

const styles = {
    uploadImagesContainer: {
        marginTop: '30px',
        marginBottom: '10px'
    },
    dropzoneContainer: {
        display: 'flex',
        marginTop: '20px',
        marginBottom: '20px',
        outline: "none"
    },
    dragBox: {
        display: 'flex',
        boxShadow: '0px 0px 3px 2px #D3D3D3',
        height: '150px',
        width: '175px',
        margin: '2px',
        padding: '5px',
        cursor: 'pointer',
        borderRadius: '2px',
    },
    dragBoxText: {
        margin: 'auto',
        textAlign: 'center',
    },
    images: {
        display: 'flex',
        flexWrap: 'wrap',
        height: '150px',
        width: '250px',
        margin: 'auto',
    },
    image: {
        maxHeight: '75px',
        maxWidth: '75px',
        padding: '4px',
        borderRadius: '10px',
        cursor: 'pointer'
    }
}

const UploadImages = (props) => {
    const { classes, setImages, images } = props;

    const onDrop = useCallback(acceptedFiles => {
        setImages(acceptedFiles)
    }, [setImages])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div className={classes.uploadImagesContainer}>
            <Typography variant='h4'>Upload images</Typography>
            <div className={classes.dropzoneContainer}>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className={classes.dragBox}>
                        {
                            isDragActive ?
                                <Typography className={classes.dragBoxText} variant='subtitle1'>Drop the files here ...</Typography> :
                                <span className={classes.dragBoxText}>
                                    <Typography variant='subtitle1'>Drop an image here</Typography>
                                    <Typography variant='subtitle1'>or select a file</Typography>
                                </span>
                        }
                    </div>
                </div>
                <div className={classes.images}>
                    {
                        images.length ?
                            images.map(image => (
                                <img
                                    className={classes.image}
                                    key={image.name}
                                    src={URL.createObjectURL(image)}
                                    alt=""
                                />
                            )) :
                            null
                    }
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(UploadImages)