import React from 'react';
import { Typography, withStyles, Button, TextField } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
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
    this.state = {
      name: '',
      about: '',
      image: [],
      location: '',
      formData: {}
    }
  }

  componentDidMount() {
    // console.log(this.props.userDetails)
    // const { name, about, location, avatar } = this.props.userDetails;
    const { name, about, profilePic, location } = this.props.location.state;
    console.log(this.props.location.state)
    this.setState({ name, about, image: [profilePic], location, formData: new FormData() });
  }

  // componentWillReceiveProps(nextProps) {
  //   // const { name, about, imageUrl: avatar, location } = this.props.location.state;
  //   if (nextProps.location.name !== this.props.location.state) {
  //     console.log(nextProps)
  //     // this.setState({ name, about, image: [avatar], location, formData: new FormData() });
  //   }
  // }

  handleInput = (event) => {
    const { value, name } = event.target;
    const { formData } = this.state;
    formData.set(name, value);
    this.setState({ [name]: value, formData });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { image, formData } = this.state;
    formData.set('image', image[0]);
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
    const { name, image, location, about } = this.state;

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
            // error={validation.title.isInvalid}
            // helperText={validation.title.message}
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