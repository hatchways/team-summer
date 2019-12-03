import React, { Component, Fragment } from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment';

import ProjectCard from '../components/ProjectCard';
import ProfileDetailPanel from '../components/ProfileDetailPanel';
import { getUser } from '../api/users';
import { withPageContext } from '../components/pageContext';

import './profile.css';

class ProfilePage extends Component {
  state = {
    profile: {
      _id: '',
      name: '',
      location: '',
      projects: [],
      imageUrl: ''
    }
  };

  componentDidMount() {
    if (!this.props.userAuthenticated) {
      this.props.activateToast('Please log in to view profiles', 'error');
      return this.props.history.push('/login');
    }

    const id = this.props.match.params.id || this.props.userDetails.id;
    getUser(id).then((profile) => {
      this.props.setUserDetails(id, profile.data.name, profile.data.about, profile.data.profilePic, profile.data.location);
      this.setState({ profile: profile.data });
    });
  }

  renderUserInfo() {
    const { profilePic, name, location, about, expertise } = this.state.profile;

    return (
      <Fragment>
        <ProfileDetailPanel
          id={this.props.userDetails.id}
          profilePic={profilePic}
          name={name}
          location={location}
          about={about}
          expertise={expertise}
          buttonType={this.getButtonType()}
          history={this.props.history}
        />
      </Fragment>
    );
  }

  getButtonType() {
    const { profile } = this.state;
    return this.props.userAuthenticated && profile._id === this.props.userDetails.id ? 'edit' : 'message';
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
        {
          projects ?
            projects.map((project, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ProjectCard
                  key={index}
                  onClick={() => this.props.history.push(`/projects/${project._id}`)}
                  title={project.title}
                  image={project.images[0]}
                  funding={project.funding.fundingTotal}
                  fundingGoal={project.fundingGoal}
                  industry={project.industry}
                  daysLeft={parseInt(moment(project.fundingDeadline).fromNow().split(' ')[1])}
                />
              </Grid>
            )) : ''
        }
      </Grid >
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
