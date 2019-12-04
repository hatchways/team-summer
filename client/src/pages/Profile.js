import React, { Component, Fragment } from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import moment from 'moment';

import ProjectCard from '../components/ProjectCard';
import ProfileDetailPanel from '../components/ProfileDetailPanel';
import { getUser } from '../api/users';
import { withPageContext } from '../components/pageContext';

import './profile.css';

const styles = {
  pageContent: {
    display: 'flex',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    display: 'inline',
    margin: '10px',
    padding: '20px',
    '&:hover': {
      cursor: 'pointer',
      color: '#E4E8EA',
      textShadow: '2px 2px #B2B1B7',
    }
  },
  projectInvestmentContent: {
    padding: '20px',
  }
}

class ProfilePage extends Component {
  state = {
    setDisplay: 'projects',
    profile: {
      _id: '',
      name: '',
      location: '',
      projects: [],
      imageUrl: '',
      investments: []
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
      console.log(this.state);
    });
  }

  changeDisplay = (display) => {
    this.setState({ setDisplay: display })
    console.log(this.state);
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

  renderInvestments = () => {
    const { investments } = this.state.profile;

    return (
      <Grid container classes={{ root: 'project-section' }} spacing={3} justify="center">
        {
          investments ?
            investments.map((investment, index) => {
              const { project } = investment;
              return (
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
              )
            }) : ''
        }
      </Grid >
    );
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
    const { classes } = this.props;
    return (
      <main className={classes.pageContent}>
        {this.renderUserInfo()}
        <div className={classes.projectInvestmentContent}>
          <div className={classes.headerContent}>
            <Typography classes={{ h2: classes.header }} variant="h2" onClick={() => this.changeDisplay('projects')}>Projects</Typography>
            <Typography classes={{ h2: classes.header }} variant="h2" onClick={() => this.changeDisplay('investments')}>Investments</Typography>
          </div>
          {this.state.setDisplay === 'projects' && this.renderProjects()}
          {this.state.setDisplay === 'investments' && this.renderProjects()}
        </div>
      </main>
    );
  }
}

export default withPageContext(withStyles(styles)(ProfilePage));
