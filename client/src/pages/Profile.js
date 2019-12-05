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
      textShadow: '1px 1px #B2B1B7',
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
    });
  }

  changeDisplay = (display) => {
    this.setState({ setDisplay: display })
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

  renderData = (data) => {
    return (
      <Grid container classes={{ root: 'project-section' }} spacing={3} justify="center">
        {
          data ?
            data.map((project, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ProjectCard
                  key={index}
                  onClick={() => this.props.history.push(`/projects/${project._id}`)}
                  title={project.title}
                  image={project.images[0]}
                  funding={project.funding.fundingTotal}
                  fundingGoal={project.fundingGoal}
                  industry={project.industry}
                  daysLeft={moment({ hours: 0 }).diff(project.fundingDeadline, 'days') * -1}
                />
              </Grid>
            )) : ''
        }
      </Grid >
    );
  };

  render() {
    const { classes } = this.props;
    const { projects, investments } = this.state.profile;
    const investedProjects = investments ? investments.map(investment => investment.project) : [];

    return (
      <main className={classes.pageContent}>
        {this.renderUserInfo()}
        <div className={classes.projectInvestmentContent}>
          <div className={classes.headerContent}>
            <Typography classes={{ h2: classes.header }} variant="h2" onClick={() => this.changeDisplay('projects')}>Projects</Typography>
            <Typography classes={{ h2: classes.header }} variant="h2" onClick={() => this.changeDisplay('investments')}>Investments</Typography>
          </div>
          {this.state.setDisplay === 'projects' && this.renderData(projects)}
          {this.state.setDisplay === 'investments' && this.renderData(investedProjects)}
        </div>
      </main>
    );
  }
}

export default withPageContext(withStyles(styles)(ProfilePage));
