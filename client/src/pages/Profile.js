import React, { Component, Fragment } from 'react';
import { withStyles, Typography, Grid } from '@material-ui/core';
import moment from 'moment';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



import ProjectCard from 'components/ProjectCard';
import ProfileDetailPanel from 'components/ProfileDetailPanel';
import { getUser } from 'api/users';
import { withPageContext } from 'components/pageContext';
const standinProfilePic = '/images/ee72493c158dc6aafc0831429481101b97cb10b7.png';
const standingProjectPic = '/images/a8b330accea0c77385355109bf6d88761738e377.png';

const styles = (theme) => ({
  pageContent: {
    display: 'flex',
  },
  projectInvestmentWrapper: {
    padding: '2em 3em'
  },
  projectInvestmentHeader: {
    marginBottom: '35px'
  },
  projectInvestmentContent: {
    // margin: '25px 0 25px'
    display: 'flexGrow',
  },
  header: {
    display: 'inline',
    paddingRight: '35px',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.main
    }
  },
});

class ProfilePage extends Component {
  state = {
    setDisplay: 'projects',
    tabValue: 0,
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
      //change _id to id
      this.setState({ profile: profile.data });
    });
  }

  changeDisplay = () => {
    const tabValue = this.state.tabValue === 0 ? 1 : 0;
    const display = this.state.tabValue === 0 ? 'projects' : 'investments'
    this.setState({ tabValue })
    this.setState({ setDisplay: display })
  }

  renderUserInfo() {
    const { profilePic, name, location, about, expertise } = this.state.profile;
    const avatarPic = profilePic ? profilePic : standinProfilePic

    return (
      <Fragment>
        <ProfileDetailPanel
          id={this.props.userDetails.id}
          profilePic={avatarPic}
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

  getButtonType = () => {
    const { profile } = this.state;
    return this.props.userAuthenticated && profile._id === this.props.userDetails.id ? 
      'edit' : 'message';
  }

  
  renderTabs = () => {

      return (
        <Fragment>
          <Tabs
            value={this.state.tabValue}
            indicatorColor="primary"
            onChange={this.changeDisplay} >
            <Tab label="Projects" />
            <Tab label="Investments" />
          </Tabs>
        </Fragment>
      );
    
  }

  renderData = (data) => {
    return (
      <Grid container classes={{ root: 'project-section' }} spacing={8} justify="left">
        {
          data ?
            data.map((project, index) => (
              <Grid item sm={12} md={6} key={index}>
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

        <div className={classes.projectInvestmentWrapper}>
          <div className={classes.projectInvestmentHeader}>

          
            {this.renderTabs()}
 

          </div>
          <div className={classes.projectInvestmentContent}>
            {this.state.setDisplay === 'projects' && this.renderData(projects)}
            {this.state.setDisplay === 'investments' && this.renderData(investedProjects)}
          </div>
        </div>

      </main>
    );
  }
}

export default withPageContext(withStyles(styles)(ProfilePage));
