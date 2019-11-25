import React, { Component } from 'react';
import { withStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { CustomOutlinedInput, OutlinedSelect, handleSelect } from '../components/Inputs';
import FormValidator from '../helpers/form-validation';
import { withToast } from '../components/Toast';
// import { addProject } from '../api/projects';

const styles = {
    pageContent: {
        display: 'flex',
    },
    projectPreview: {
        margin: "10px"
    },
    addProjectPage: {
        margin: "10px"
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        width: '100%'
    },
}

class AddProject extends Component {
    constructor(props) {
        super(props);
        this.validators = FormValidator([
            {
                field: 'title',
                method: validator.isEmpty,
                validWhen: false,
                message: 'Title is required.'
            },
            {
                field: 'industry',
                method: validator.isEmpty,
                validWhen: false,
                message: 'Industry is required'
            },
            {
                field: 'location',
                method: validator.isEmpty,
                validWhen: false,
                message: 'location is required'
            },
            {
                field: 'fundingGoal',
                method: validator.isNumeric,
                validWhen: true,
            }
        ]);
        this.state = {
            title: '',
            subtitle: '',
            industry: '',
            location: '',
            images: [],
            fundingGoal: 0,
            validation: this.validators.valid()
        }
    }

    handleInput = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log('submitted')
    }

    disableSubmit = () => {
        const { title, industry, location } = this.state;

        return [title, industry, location].some((value) => !value);
    };

    render() {
        const { classes } = this.props;
        const { title, subtitle, industry, location, images, fundingGoal, validation } = this.state;
        return (
            <main className={classes.pageContent}>
                <div className={classes.projectPreview}>
                    <h2>Product Preview Thing</h2>
                    <Button type="submit" variant="contained" color="primary" >
                        Preview
                    </Button>
                </div>
                <div className={classes.addProjectPage}>
                    <h2>Start with basics</h2>
                    <form className={classes.form} onSubmit={this.handleSubmit} >
                        <CustomOutlinedInput
                            name="title"
                            value={title}
                            label="title"
                            onChange={this.handleInput}
                            type="title"
                            required
                            error={validation.title.isInvalid}
                            helperText={validation.title.message}
                        />
                        <CustomOutlinedInput
                            name="subtitle"
                            value={subtitle}
                            label="subtitle"
                            onChange={this.handleInput}
                            type="subtitle"
                        />
                        <CustomOutlinedInput
                            name="fundingGoal"
                            value={fundingGoal}
                            label="fundingGoal"
                            onChange={this.handleInput}
                            type="fundingGoal"
                            error={validation.fundingGoal.isInvalid}
                            helperText={validation.fundingGoal.message}
                        />
                    </form>
                </div>
            </main>
        )
    }
}

export default withToast(withStyles(styles)(AddProject));