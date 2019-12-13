import React, { Component } from 'react';
import { withStyles, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import validator from 'validator';
import moment from 'moment';

import { CustomOutlinedInput, OutlinedSelect } from 'components/Inputs';
import UploadImages from 'components/UploadImages';
import FormValidator from 'helpers/form-validation';
import { editProject } from 'api/projects';
import { locations, industries } from 'dummyData/dropDownItems';
import { withPageContext } from 'components/pageContext';
import CenteredPageHeader from '../components/CenteredPageHeader';

const styles = {
  pageContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  projectPreviewContainer: {
    display: 'flex',
    width: '25%',
    flexDirection: 'column',
    marginRight: '20px',
    marginLeft: '10px',
    padding: '30px 50px 20px 30px',
    boxShadow: '2px 0px 4px 2px #D3D3D3'
  },
  addProjectPage: {
    margin: '10px',
    padding: '20px'
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
    marginBottom: '20'
  },
  previewButton: {
    margin: '20px 0px 10px 0px'
  },
  submitButton: {
    margin: 'auto'
  }
};

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
        field: 'subtitle',
        method: (value) => value.length <= 50,
        validWhen: true,
        message: 'Subtitle must be 50 characters or less.'
      },
      {
        field: 'description',
        method: (value) => value.length <= 2000,
        validWhen: true,
        message: 'Description must be 2000 characters or less.'
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
    };
  }

  componentDidMount() {
    const {
      id: projectId, title, subtitle, description, industry, location,
      images: updatedImages, fundingGoal, projectUserId
    } = this.props.location.state;
    const fundingDeadline = moment(this.props.location.state.fundingDeadline).format('YYYY-MM-DD');
    const project = {
      projectId,
      title,
      subtitle,
      description,
      industry,
      location,
      updatedImages,
      fundingGoal,
      fundingDeadline
    };
    this.setState({ project, projectUserId, formData: new FormData() });
  }

  handleInput = (event) => {
    const { value, name } = event.target;
    const { project } = this.state;
    project[name] = value;
    this.setState({ project });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const validation = this.validators.validate(this.state.project);
      this.setState({ validation });

      const { project, projectUserId, formData } = this.state;

      if (validation.isValid) {
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
  };

  setImages = (newImages) => {
    const { project } = this.state;
    if (project.updatedImages.length + newImages.length > 6) {
      console.log('Cannot add anymore images.');
      return;
    }
    const addImage = [...project.updatedImages, ...newImages];
    project.updatedImages = addImage;

    this.setState({ project });
  };

  deleteImage = (imgName) => {
    const { project } = this.state;
    const { updatedImages } = project;

    const filteredImages = updatedImages.filter(image => image !== imgName);
    project.updatedImages = filteredImages;
    this.setState({ project });
  };

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
        <div className={classes.addProjectPage}>
          <CenteredPageHeader title="Edit Project" descriptionText=""/>

          <form className={classes.form} onSubmit={this.handleSubmit}>

            <CustomOutlinedInput
              name="title"
              value={title}
              label="Project title"
              onChange={this.handleInput}
              error={validation.title.isInvalid}
              helperText={validation.title.message}
            />

            <CustomOutlinedInput
              name="subtitle"
              value={subtitle}
              label="Subtitle"
              onChange={this.handleInput}
              error={validation.subtitle.isInvalid}
              helperText={validation.subtitle.message}
            />

            <CustomOutlinedInput
              name="description"
              multiline
              rows="5"
              value={description}
              label="Description"
              onChange={this.handleInput}
              error={validation.description.isInvalid}
              helperText={validation.description.message}
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
              helperText={validation.industry.message}>
              {industries.map((industry) => (
                <option
                  key={industry.id}
                  value={industry.name}>
                  {industry.name}
                </option>
              ))}
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
              helperText={validation.location.message}>
              {locations.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}
                </option>
              ))}
            </OutlinedSelect>

            <UploadImages setImages={this.setImages} showMany={true} images={updatedImages}
                          deleteImage={this.deleteImage}/>

            <CustomOutlinedInput
              name="fundingGoal"
              value={fundingGoal}
              label="Funding Goal"
              onChange={this.handleInput}
              error={validation.fundingGoal.isInvalid}
              helperText={validation.fundingGoal.message}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />

            <CustomOutlinedInput
              name="fundingDeadline"
              type="date"
              label="Funding Deadline"
              value={fundingDeadline}
              onChange={this.handleInput}
              required
              InputLabelProps={{
                shrink: true
              }}
              error={validation.fundingDeadline.isInvalid}
              helpertext={validation.fundingDeadline.message}
            />
            <Button classes={{ root: classes.submitButton }} type="submit" variant="contained" color="primary"
                    disabled={this.disableSubmit()}>
              Submit
            </Button>
          </form>
        </div>
      </main>
    );
  }
}

export default withPageContext(withStyles(styles)(EditProject));