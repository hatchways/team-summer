import React from 'react';
import { Typography, withStyles, Button, TextField } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import validator from 'validator';

import { OutlinedSelect } from '../components/Inputs';
import FormValidator from '../helpers/form-validation';
import { editUser } from '../api/users';
import { locations } from '../dummyData/dropDownItems'
import { withPageContext } from '../components/pageContext';

const styles = {
  pageContent: {
    display: 'flex',
    justifyContent: 'left'
  },
  // projectPreviewContainer: {
  //   display: 'flex',
  //   width: '25%',
  //   flexDirection: 'column',
  //   marginRight: '20px',
  //   marginLeft: '10px',
  //   padding: '30px 50px 20px 30px',
  //   boxShadow: '2px 0px 4px 2px #D3D3D3',
  // },
  // addProjectPage: {
  //   margin: '10px',
  //   padding: '20px',
  // },
  // form: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'left',
  //   width: '100%',
  //   marginTop: '30px'
  // },
  // formLine: {
  //   marginBottom: '20',
  // },
  // button: {
  //   margin: '20px 0px 10px 0px'
  // }
}

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      location: '',
      about: '',
      formData: {}
    }
  }

  componentDidMount() {
    this.setState({ formData: new FormData() });
  }

  handleInput = (event) => {
    const { value, name } = event.target;
    const { formData } = this.state;
    formData.set(name, value);
    this.setState({ [name]: value, formData });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { image, formData } = this.state;
    formData.append('image', image);
    const { id } = this.props.userDetails;
    const newUserData = await editUser(id, formData);
    if (newUserData.success) {
      console.log(newUserData);
      this.props.activateToast('Edit Successful', 'success');
    } else if (newUserData.err) {
      console.log(newUserData.err)
    }
  }

  render() {
    const { classes } = this.props;
    const { name, image, location, about } = this.state;
    return (
      <main className={classes.pageContent}>

      </main>
    )
  }
}

export default withPageContext(withStyles(styles)(EditProfile));