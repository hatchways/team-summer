import React, { Component, Fragment } from 'react';
import ProjectCard from '../components/projectCard';
import ProfileDetailPanel from '../components/ProfileDetailPanel';
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import { getUser } from '../api/users';
import { withPageContext } from '../components/pageContext';

import './profile.css';

class ProfilePage extends Component {
  state = {
    profile: {
      _id: '',
      name: '',
      location: '',
      projects: [
        {
          name: 'testname2',
          funding: 500,
          goal: 1000
        },
        {
          name: 'testname',
          funding: 500,
          goal: 1000
        },
        {
          name: 'testname3',
          funding: 5030,
          goal: 10030
        },
        {
          name: 'testname4',
          funding: 5040,
          goal: 10400
        }
      ],
      imageUrl: ''
    }
  };

  componentDidMount() {
    const id = this.props.match.params.id || JSON.parse(localStorage.getItem('userData')).id;
    getUser(id).then((profile) => {
      this.setState({ profile: profile.data });
    });
  }

  renderUserInfo() {
    const { imageUrl, name, location, about, expertise } = this.state.profile;

    return (
      <Fragment>
        <ProfileDetailPanel
          imageUrl={imageUrl}
          name={name}
          location={location}
          about={about}
          expertise={expertise}
          buttonType={this.getButtonType()}
        />
      </Fragment>
    );
  }

  getButtonType() {
    const { profile } = this.state;
    return profile._id === JSON.parse(localStorage.getItem('userData')).id ? 'edit' : 'message';
  }

  handleClick() {
    console.log('clicked');
    //TODO: edit page
    //TODO: msg functionality
  }

  renderProjects = () => {
    const { projects } = this.state.profile;

    return (
      <Grid container classes={{ root: 'project-section' }} spacing={3} justify="center">
        {projects.map(({ id, name, funding, goal, imageUrl }, ix) => (
          <Grid item xs={12} md={6} key={ix}>
            <ProjectCard
              key={ix}
              id={id}
              name={name}
              funding={funding}
              goal={goal}
              imageUrl={imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  render() {
    return (
      <div className="profilePage">
        {this.renderUserInfo()}
        {this.renderProjects()}
      </div>
    );
  }
}

export default withPageContext(ProfilePage);
