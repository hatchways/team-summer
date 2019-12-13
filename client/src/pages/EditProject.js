import React, { Component } from 'react';
import { Typography, withStyles, Button, TextField } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import validator from 'validator';
import moment from 'moment'

import { OutlinedSelect } from 'components/Inputs';
import UploadImages from 'components/UploadImages';
import FormValidator from 'helpers/form-validation';
import { editProject } from 'api/projects';
import { locations, industries } from 'dummyData/dropDownItems'
import { withPageContext } from 'components/pageContext';

const styles = {
  pageContent: {
    display: 'flex',
    justifyContent: 'left'
  },
  projectPreviewContainer: {
    display: 'flex',
    width: '25%',
    flexDirection: 'column',
    marginRight: '20px',
    marginLeft: '10px',
    padding: '30px 50px 20px 30px',
    boxShadow: '2px 0px 4px 2px #D3D3D3',
  },
  addProjectPage: {
    margin: '10px',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    width: '100%',
    marginTop: '30px'
  },
  dateField: {
    marginBottom: '20px'
  },
  formLine: {
    marginBottom: '20',
  },
  previewButton: {
    margin: '20px 0px 10px 0px'
  },
  submitButton: {
    margin: 'auto'
  }
}

class EditProject extends Component {
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
        message: 'Industry is required.'
      },
      {
        field: 'location',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Location is required.'
      },
      {
        field: 'fundingGoal',
        method: (value) => value > 0,
        validWhen: true,
        message: 'Funding goal must be greater than zero.'
      },
      {
        field: 'fundingDeadline',
        method: (value) => validator.isAfter(value),
        validWhen: true,
        message: 'Funding deadline must be after today\'s date.'
      }
    ]);
    this.state = {
      project: {
        projectId: null,
        title: '',
        subtitle: '',
        description: '',
        industry: '',
        location: '',
        updatedImages: [],
        fundingGoal: 0,
        fundingDeadline: ''
      },
      formData: {},
      projectUserId: null,
      validation: this.validators.valid(),
      uploading: false
    }
  }

  componentDidMount() {
    const { 
      id: projectId, title, subtitle, description, industry, location, 
      images: updatedImages, fundingGoal, projectUserId } = this.props.location.state
    const fundingDeadline = moment(this.props.location.state.fundingDeadline).format('YYYY-MM-DD');
    const project = { projectId, title, subtitle, description, industry, location, updatedImages, fundingGoal, fundingDeadline }
    this.setState({ project, projectUserId, formData: new FormData() })
  }

  handleInput = (event) => {
    const { value, name } = event.target;
    const { project } = this.state;
    project[name] = value;
    this.setState({ project })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const validation = this.validators.validate(this.state.project);
      this.setState({ validation });

      const { project, projectUserId, formData } = this.state;

      if (validation.isValid) {
        // for (const name of project) { // have an odd and interesting error where an `ignore_whitespace` property is added with the value of false
        //   console.log(name);
        //   formData.set(name, project[name]);
        // }
        formData.set('title', project.title);
        formData.set('subtitle', project.subtitle);
        formData.set('description', project.description);
        formData.set('industry', project.industry);
        formData.set('location', project.location);
        formData.set('fundingGoal', project.fundingGoal);
        formData.set('fundingDeadline', project.fundingDeadline);

        if (project.updatedImages[0] !== '/images/image-not-found.png') {
          for (const image of project.updatedImages) {
            if (typeof image === 'string') {
              formData.append('stringImage', image);
            } else {
              formData.append('images', image);
            }
          }
        }

        formData.set('projectUserId', projectUserId);

        const { projectId } = project;
        const updatedProject = await editProject(projectId, formData);
        if (updatedProject.success) {
          console.log(updatedProject);
          this.props.activateToast('Upload Successful', 'success');
          this.props.history.push('/profile');
        } else if (updatedProject.err) {
          console.log(updatedProject.err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  setImages = (newImages) => {
    const { project } = this.state
    if (project.updatedImages.length + newImages.length > 6) {
      console.log('Cannot add anymore images.')
      return;
    }
    const addImage = [...project.updatedImages, ...newImages];
    project.updatedImages = addImage;
    this.setState({ project });
  }

  deleteImage = (imgName) => {
    const { project } = this.state;
    const { updatedImages } = project;

    const filteredImages = updatedImages.filter(image => image !== imgName)
    project.updatedImages = filteredImages;
    this.setState({ project })
  }

  disableSubmit = () => {
    const { title, industry, location } = this.state.project;

    return [title, industry, location].some((value) => !value);
  };

  render() {
    const { classes } = this.props;
    const { project, validation } = this.state;
    const { title, subtitle, description, industry, location, updatedImages, fundingGoal, fundingDeadline } = project;

    return (
      <main className={classes.pageContent}>
        <div className={classes.projectPreviewContainer}>
          <Typography variant="h3" align='left'>{title}</Typography>
          <Button classes={{ root: classes.previewButton }} type="submit" variant="contained" color="primary" >
            Preview
                    </Button>
        </div>
        <div className={classes.addProjectPage}>
          <Typography variant="h2" align='left'>Edit your project</Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} >

            <Typography variant="h4">Title</Typography>
            <TextField
              name="title"
              classes={{ root: classes.formLine }}
              value={title}
              fullWidth={true}
              onChange={this.handleInput}
              type="title"
              variant="outlined"
              required
              autoComplete={'false'}
              error={validation.title.isInvalid}
              helperText={validation.title.message}
            />


            <Typography variant="h4">Subtitle</Typography>
            <TextField
              name="subtitle"
              classes={{ root: classes.formLine }}
              value={subtitle}
              fullWidth={true}
              onChange={this.handleInput}
              type="subtitle"
              variant="outlined"
              autoComplete={'false'}
            />

            <Typography variant="h4">Description</Typography>
            <TextField
              name="description"
              multiline
              rows="5"
              classes={{ root: classes.formLine }}
              value={description}
              fullWidth={true}
              onChange={this.handleInput}
              type="description"
              variant="outlined"
            />

            <OutlinedSelect
              useLabel
              name="industry"
              labelText="Industry"
              selectId="industry"
              setState={this.handleInput}
              selectName="industry"
              value={industry}
              error={validation.industry.isInvalid}
              helperText={validation.industry.message}
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
            <OutlinedSelect
              useLabel
              name="location"
              labelText="Location"
              selectId="location"
              setState={this.handleInput}
              selectName="location"
              value={location}
              error={validation.location.isInvalid}
              helperText={validation.location.message}
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
            <UploadImages setImages={this.setImages} showMany={true} images={updatedImages} deleteImage={this.deleteImage} />
            <Typography variant="h4">Funding Goal Amount</Typography>
            <OutlinedInput
              name="fundingGoal"
              id="fundingGoal"
              value={fundingGoal}
              fullWidth={true}
              onChange={this.handleInput}
              type="fundingGoal"
              variant="outlined"
              required
              error={validation.fundingGoal.isInvalid}
              helpertext={validation.fundingGoal.message}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            <Typography variant="h4">Funding Deadline</Typography>
            <TextField
              className={classes.dateField}
              name="fundingDeadline"
              id="fundingDeadline"
              type="date"
              value={fundingDeadline}
              onChange={this.handleInput}
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={validation.fundingDeadline.isInvalid}
              helperText={validation.fundingDeadline.message}
            />
            <Button classes={{ root: classes.submitButton }} type="submit" variant="contained" color="primary" disabled={this.disableSubmit()}>
              Submit
            </Button>
          </form>
        </div>
      </main>
    )
  }
}

export default withPageContext(withStyles(styles)(EditProject));