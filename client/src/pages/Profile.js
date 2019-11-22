import React, {Component} from 'react';
import ProjectCard from '../components/projectCard';
import { withStyles, Button, Grid } from '@material-ui/core';
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
    currentUserId: localStorage.getItem('id')
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
      <div className="profile-details">
        <div>
            <div><h3>{name}</h3></div>
            <div><p>location</p></div>
        </div>
        {this.renderButton()}
        <div>
            <div><p>about me</p></div>
            <div><p>expertise</p></div>
        </div>
      </div>
    );
  }

  renderButton() {
    const { profile, currentUserId } = this.state;
    const buttonType = profile.id === currentUserId ? 'edit' : 'message';

    return (
      <Button type="submit" variant="outlined" color="primary">
        {buttonType}
      </Button>
    );
  }

  handleClick() {
    console.log('clicked');
    //TODO: edit page
    //TODO: msg functionality
  }

  renderProjects = () => {
    const { projects } = this.state.profile

    return (
      <div style={{ marginTop: 50, padding: 50 }}>
        <Grid container spacing={5} justify="center">
          {projects.map(({ id, name, funding, goal, imageUrl }, ix) => (
            <Grid item key={name}>
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
      </div>
    );
  };

  render() {
    return (
      <div className="profilePage">
        <h1>profile pg</h1>
        {this.renderUserInfo()}
        {this.renderProjects()}
      </div>
    );
  }
}

export default ProfilePage;
