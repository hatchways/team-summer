import React from 'react';
import { Typography, withStyles, Button, TextField } from '@material-ui/core';
import validator from 'validator';

import { OutlinedSelect } from '../components/Inputs';
import UploadImages from '../components/UploadImages';
import FormValidator from '../helpers/form-validation';
import { editUser } from '../api/users';
import { locations } from '../dummyData/dropDownItems'
import { withPageContext } from '../components/pageContext';

const styles = {
  pageContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  editProfilePage: {
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
  formLine: {
    marginBottom: '20',
  },
  button: {
    margin: '20px 0px 10px 0px'
  }
}

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.validators = FormValidator([
      {
        field: 'name',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Name is Required'
      },
    ])
    this.state = {
      name: '',
      about: '',
      image: [],
      location: '',
      formData: {},
      validation: this.validators.valid()
    }
  }

  componentDidMount() {
    const { name, about, profilePic, location } = this.props.location.state;
    console.log(this.props.location.state)
    this.setState({ name, about, image: [profilePic], location, formData: new FormData() });
  }

  handleInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { name, about, image, location, formData } = this.state;
    const validation = this.validators.validate(this.state);
    this.setState({ validation });

    if (validation.isValid) {
      formData.set('name', name);
      formData.set('about', about);
      formData.set('location', location);
      if (typeof image[0] === 'string') {
        formData.set('profilePic', image[0])
      } else {
        formData.set('image', image[0]);
      }
      const { id } = this.props.userDetails;
      console.log(this.state)
      const newUserData = await editUser(id, formData);
      if (newUserData.success) {
        console.log(newUserData);
        this.props.activateToast('Edit Successful', 'success');
        this.props.history.push('/profile');
      } else if (newUserData.err) {
        console.log(newUserData.err)
      }
    }
  }

  setImages = (image) => {
    if (image.length > 1) {
      console.log('Cannot add anymore images.')
      return;
    }
    this.setState({ image });
  }

  deleteImage = () => {
    this.setState({ image: '' })
  }

  disableSubmit = () => {
    const { name } = this.state;

    return [name].some((value) => !value);
  };

  render() {
    const { classes } = this.props;
    const { name, image, location, about, validation } = this.state;

    return (
      <main className={classes.pageContent}>
        <div className={classes.editProfilePage}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <Typography variant="h4">Name</Typography>
            <TextField
              name="name"
              classes={{ root: classes.formLine }}
              value={name}
              fullWidth={true}
              onChange={this.handleInput}
              type="name"
              variant="outlined"
              required
              error={validation.name.isInvalid}
              helperText={validation.name.message}
            />
            <Typography variant="h4">About</Typography>
            <TextField
              name="about"
              classes={{ root: classes.formLine }}
              value={about}
              fullWidth={true}
              onChange={this.handleInput}
              type="about"
              variant="outlined"
            />
            <UploadImages setImages={this.setImages} images={image} deleteImage={this.deleteImage} />
            <OutlinedSelect
              name="location"
              labelText="Location"
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
            <Button classes={{ root: classes.button }} type="submit" variant="contained" color="primary" disabled={this.disableSubmit()}>
              Submit
            </Button>
          </form>
        </div>
      </main>
    )
  }
}

export default withPageContext(withStyles(styles)(EditProfile));