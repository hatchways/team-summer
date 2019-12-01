import React from 'react';
import { Typography, withStyles, Button, TextField } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import validator from 'validator';

import { OutlinedSelect } from '../components/Inputs';
import FormValidator from '../helpers/form-validation';
import { locations } from '../dummyData/dropDownItems'
import { withPageContext } from '../components/pageContext';

const styles = {
  // pageContent: {
  //   display: 'flex',
  //   justifyContent: 'left'
  // },
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
      about: ''
    }
  }

  render() {
    return(
      <div>Heyheyhey</div>
    )
  }
}

export default withPageContext(withStyles(styles)(EditProfile));