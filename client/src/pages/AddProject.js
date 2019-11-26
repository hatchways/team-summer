import React, { Component } from 'react';
import { Typography, withStyles, Button, TextField } from '@material-ui/core';
import validator from 'validator';

import { OutlinedSelect } from '../components/Inputs';
import UploadImages from '../components/UploadImages';
import FormValidator from '../helpers/form-validation';
import { withToast } from '../components/Toast';
import { addProject } from '../api/projects';

const styles = {
    pageContent: {
        display: 'flex',
        justifyContent: 'left'
    },
    projectPreviewContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0px 20px 0px 10px',
        padding: '20px 50px 20px 30px',
        boxShadow: '2px 0px 4px 2px #D3D3D3',
    },
    addProjectPage: {
        margin: '10px',
        padding: '20px',
    },
    formLine: {
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        width: '100%'
    },
    fundingGoalContainer: {
        marginBottom: '40px'
    },
}

const industries = [
    { id: 0, name: '' },
    { id: 1321, name: 'Technology' },
    { id: 21423, name: 'Marketing' },
    { id: 42342, name: 'Engineering' },
    { id: 21342, name: 'Art' },
    { id: 93082, name: 'Film' }
]

const locations = [
    { id: 0, name: '' },
    { id: 123, name: 'New York' },
    { id: 431, name: 'California' },
    { id: 903, name: 'Georgia' },
    { id: 223, name: 'Florida' }
]

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
            uploading: false,
            title: '',
            subtitle: '',
            industry: '',
            location: '',
            images: [],
            fundingGoal: 0,
            formData: {},
            validation: this.validators.valid()
        }
    }

    componentDidMount() {
        this.setState({ formData: new FormData() })
    }

    handleInput = (event) => {
        const { value, name } = event.target;
        const { formData } = this.state;
        formData.set(name, value);
        this.setState({ [name]: value, formData })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const validation = this.validators.validate(this.state);
        this.setState({ validation });

        if (validation.isValid) {
            const { formData } = this.state;
            const { id } = this.props.match.params; // will have to change eventually.
            const newProject = await addProject(id, formData);
            if (newProject.success) {
                console.log(newProject);
                this.props.history.push('/profile');
                this.props.activateToast('Upload Successful', 'success');
            } else if (newProject.err) {
                console.log(newProject.err);
            }
        }
    }

    setImages = (newImages) => {
        const { formData } = this.state;
        if (this.state.images.length + newImages.length > 6) {
            console.log('Cannot add anymore images.')
            return;
        }
        const addImage = [...this.state.images, ...newImages];
        for (const image of addImage) {
            formData.append('images', image);
        }
        formData.append('images', addImage);
        this.setState({ images: addImage });
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
                <div className={classes.projectPreviewContainer}>
                    <Typography variant="h3" align='left'>Product Preview</Typography>
                    <Button type="submit" variant="contained" color="primary" >
                        Preview
                    </Button>
                </div>
                <div className={classes.addProjectPage}>
                    <Typography variant="h2" align='left'>Start with basics</Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit} >

                        <Typography variant="h3">Title</Typography>
                        <TextField
                            name="title"
                            value={title}
                            fullWidth={true}
                            onChange={this.handleInput}
                            type="title"
                            variant="outlined"
                            required
                            error={validation.title.isInvalid}
                            helperText={validation.title.message}
                        />


                        <Typography variant="h3">Subtitle</Typography>
                        <TextField
                            name="subtitle"
                            value={subtitle}
                            fullWidth={true}
                            onChange={this.handleInput}
                            type="subtitle"
                            variant="outlined"
                        />

                        <Typography variant="h3">Industry</Typography>
                        <OutlinedSelect
                            name="industry"
                            selectId="industry"
                            setState={this.handleInput}
                            selectName="industry"
                            value={industry}
                        >
                            {
                                industries.map(industry => {
                                    return (
                                        <option
                                            key={industry.id}
                                            value={industry.name}
                                        >
                                            {industry.name}
                                        </option>
                                    )
                                })
                            }
                        </OutlinedSelect>
                        <Typography variant="h3">Project Location</Typography>
                        <OutlinedSelect
                            name="location"
                            selectId="location"
                            setState={this.handleInput}
                            selectName="location"
                            value={location}
                        >
                            {
                                locations.map(location => {
                                    return (
                                        <option
                                            key={location.id}
                                            value={location.name}
                                        >
                                            {location.name}
                                        </option>
                                    )
                                })
                            }
                        </OutlinedSelect>
                        <UploadImages setImages={this.setImages} images={images} />
                        <div className={classes.fundingGoalContainer}>
                        <Typography variant="h3">Funding Goal Amount</Typography>
                        <TextField
                            name="fundingGoal"
                            value={fundingGoal}
                            fullWidth={true}
                            onChange={this.handleInput}
                            type="fundingGoal"
                            variant="outlined"
                            error={validation.fundingGoal.isInvalid}
                            helperText={validation.fundingGoal.message}
                        />
                        </div>
                        <Button type="submit" variant="contained" color="primary" disabled={this.disableSubmit()}>
                            Submit
                        </Button>
                    </form>
                </div>
            </main>
        )
    }
}

export default withToast(withStyles(styles)(AddProject));