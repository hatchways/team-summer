import React, { Component } from 'react';
import {
  withStyles,
  Button,
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import validator from 'validator';

import { CustomOutlinedInput, OutlinedSelect } from 'components/Inputs';
import UploadImages from 'components/UploadImages';
import FormValidator from 'helpers/form-validation';
import { addProject } from 'api/projects';
import { locations, industries } from 'dummyData/dropDownItems';
import { withPageContext } from 'components/pageContext';
import CenteredPageHeader from '../components/CenteredPageHeader';

const styles = {
  pageContent: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    width: '100%',
    marginTop: '30px'
  },
  formLine: {
    marginBottom: '20'
  },
  button: {
    margin: '20px 0px 10px 0px'
  }
};

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
      uploading: false,
      title: '',
      subtitle: '',
      description: '',
      industry: '',
      location: '',
      images: [],
      fundingGoal: 0,
      fundingDeadline: '',
      formData: {},
      validation: this.validators.valid()
    };
  }

  componentDidMount() {
    this.setState({ formData: new FormData() });
  }

  handleInput = (event) => {
    let { value, name } = event.target;
    const { formData } = this.state;

    formData.set(name, value);
    this.setState({ [name]: value, formData });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const validation = this.validators.validate(this.state);
    this.setState({ validation });

    if (validation.isValid) {
      const { images, formData } = this.state;
      for (const image of images) {
        formData.append('images', image);
      }

      const newProject = await addProject(formData);
      if (newProject.success) {
        console.log(newProject);
        this.props.activateToast('Upload Successful', 'success');
        this.props.history.push('/profile');
      } else if (newProject.err) {
        console.log(newProject.err);
      }
    }
  };

  setImages = (newImages) => {
    if (this.state.images.length + newImages.length > 6) {
      console.log('Cannot add anymore images.');
      return;
    }
    const addImage = [...this.state.images, ...newImages];

    this.setState({ images: addImage });
  };

  deleteImage = (imgName) => {
    const { images } = this.state;
    const filteredImages = images.filter(image => image !== imgName);
    this.setState({ images: filteredImages });
  };

  disableSubmit = () => {
    const { title, industry, location } = this.state;

    return [title, industry, location].some((value) => !value);
  };

  render() {
    const { classes } = this.props;
    const { title, subtitle, description, industry, location, images, fundingGoal, fundingDeadline, validation } = this.state;

    return (
      <main className={classes.pageContent}>
        <div className={classes.addProjectPage}>
          <CenteredPageHeader
            title="Launch Project"
            descriptionText="Launch your project with a few simple questions"
          />

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

            <UploadImages setImages={this.setImages} showMany={true} images={images} deleteImage={this.deleteImage}/>

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
            <Button classes={{ root: classes.button }} type="submit" variant="contained" color="primary"
                    disabled={this.disableSubmit()}>
              Submit
            </Button>
          </form>
        </div>
      </main>
    );
  }
}

export default withPageContext(withStyles(styles)(AddProject));