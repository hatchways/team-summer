import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { capitalize } from '@material-ui/core/utils';

import { CustomOutlinedInput } from 'components/Inputs';
import CenteredPageHeader from 'components/CenteredPageHeader';
import FormValidator from 'helpers/form-validation';
import { createOrLoginUser } from 'api/users';
import { withPageContext } from 'components/pageContext';

const styles = {
  pageContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
    padding: '40px 30px',
    maxWidth: 500
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  lastInput: {
    marginBottom: 80
  }
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.validators = FormValidator([
      {
        field: 'name',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Name is Required'
      },
      {
        field: 'email',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Email is required'
      },
      {
        field: 'email',
        method: validator.isEmail,
        validWhen: true,
        message: 'Email format is incorrect'
      },
      {
        field: 'password',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Password is required'
      },
      {
        field: 'password',
        method: (value) => value.length >= 6,
        validWhen: true,
        message: 'Password must be 6 characters or more'
      },
      {
        field: 'confirmPassword',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Confirm Password is required'
      },
      {
        field: 'confirmPassword',
        method: (value, state) => state.password === value,
        validWhen: true,
        message: 'Passwords must match'
      }
    ]);

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      validation: this.validators.valid()
    };
  }

  handleInput = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  disableSubmit = () => {
    const { name, email, password, confirmPassword } = this.state;

    return [name, email, password, confirmPassword].some((value) => !value);
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    let validation = this.validators.validate(this.state);
    this.setState({ validation });

    if (validation.isValid) {
      const { name, email, password } = this.state;

      let userRegistration = await createOrLoginUser('register', { name, email, password });

      if (userRegistration.hasOwnProperty('err')) {
        validation[userRegistration.property] = {
          isInvalid: true,
          message: capitalize(userRegistration.err)
        };
        return this.setState({ validation });
      }

      if (userRegistration.hasOwnProperty('success')) {
        this.props.activateToast('Successful registration', 'success');
        this.props.setUserDetails(userRegistration.id, userRegistration.name);
        this.props.setAuthenticated(true);
        this.props.history.push('/profile')
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { name, email, password, confirmPassword, validation } = this.state;

    return (
      <main className={classes.pageContent}>
        <CenteredPageHeader
          title="Create an Account"
          descriptionText={
            <span>
              Already a member? <Link to="/login">Login</Link>
            </span>
          }
        />
        <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
          <CustomOutlinedInput
            name="name"
            value={name}
            label="Name"
            onChange={this.handleInput}
            required
            error={validation.name.isInvalid}
            helperText={validation.name.message}
          />
          <CustomOutlinedInput
            name="email"
            value={email}
            label="Email"
            onChange={this.handleInput}
            type="email"
            required
            error={validation.email.isInvalid}
            helperText={validation.email.message}
          />
          <CustomOutlinedInput
            name="password"
            value={password}
            label="Password"
            onChange={this.handleInput}
            type="password"
            required
            error={validation.password.isInvalid}
            helperText={validation.password.message}
          />
          <CustomOutlinedInput
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm Password"
            onChange={this.handleInput}
            className={classes.lastInput}
            type="password"
            required
            error={validation.confirmPassword.isInvalid}
            helperText={validation.confirmPassword.message}
          />

          <Button type="submit" variant="contained" color="primary" disabled={this.disableSubmit()}>
            Create account
          </Button>
        </form>
      </main>
    );
  }
}

export default withPageContext(withStyles(styles)(SignUp));
