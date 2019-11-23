import React from 'react';
import {
    withStyles,
    Button
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CenteredPageHeader from '../components/CenteredPageHeader';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    pageContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
    },
    projectPreviewContainer: {
        display: "flex",
        justifyContent: "left",
        flexDirection: "column",
        marginRight: "50px",
        boxShadow: '5px 0 5px -2px #888',
        textAlign: "left"
    },
    createProjectContainer: {

    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    textField: {
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        width: 200,
      },
};

class LaunchProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',

        }
    }
    handleInput = () => {

    }

    disableSubmit = () => {

    }

    handleSubmit = (event) => {

    }

    render () {
        const {classes} = this.props
        return (
        <main className={classes.pageContent}>
            <div className={classes.projectPreviewContainer}>
            {/* <CenteredPageHeader
                title="Project title should be here!"
            /> */}
            <h3>Project title should be here</h3>
            </div>

            <div className={classes.createProjectContainer}>
            {/* <CenteredPageHeader
                title="Start with basics"
            />
             */}
             <h3>Start with the basics</h3>
            <form className={classes.form}>
                <TextField
                    id="standard-multiline-static"
                    label="Title"
                    multiline
                    defaultValue=" "
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    id="standard-multiline-static"
                    label="Subtitle"
                    multiline
                    defaultValue="Text"
                    className={classes.textField}
                    margin="normal"
                />
                {/* {renderIndustryMenu(demoItems)}
                {renderLocationMenu(demoLocations)} */}
                <h4>Download Images</h4>
                <TextField
                    id="standard-multiline-static"
                    label="Funding Goal Amount"
                    multiline
                    defaultValue="$10,000"
                    className={classes.textField}
                    margin="normal"
                />
            </form>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                // disabled={this.disableSubmit()}
                >
                Save
            </Button>
            </div>
        </main>
        )
    }
}

export default withStyles(styles)(LaunchProject);