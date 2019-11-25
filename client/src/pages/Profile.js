import React, {Component, Fragment} from 'react';
import ProjectCard from '../components/projectCard';
import ProfileDetailPanel from '../components/ProfileDetailPanel';
import { withStyles, Button, Grid, Typography } from '@material-ui/core';
import { getUser } from '../api/users';

class ProfilePage extends Component {
  state = {
    profile: {
      id: this.props.match.params.id,
      name: '',
      location: '',
      about: '',
      expertise: '',
      projects: [],
      imageUrl: ''
    },
    currentUserId: localStorage.getItem('id') || ""
  };

  componentDidMount() {
    const { id } = this.state.profile;
    const profile = getUser(id).then((profile) => {
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
          buttonType={this.getButtonType()}/>
      </Fragment>
    );
  }

  getButtonType() {
    const { profile, currentUserId } = this.state;
    return profile.id === currentUserId ? 'edit' : 'message';
  }

  handleClick() {
    console.log('clicked');
    //TODO: edit page
    //TODO: msg functionality
  }

  renderProjects = () => {
    const { projects } = this.state.profile

    return (
        <Grid container spacing={2} justify="center">
          {projects.map(({ id, name, funding, goal, imageUrl }, ix) => (
            <Grid item xs key={name}>
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
      <div className="profilePage" style={{display: 'flex'}}>
        {this.renderUserInfo()}
        {this.renderProjects()}
      </div>
    );
  }
}

export default ProfilePage;
