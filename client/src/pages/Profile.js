import React, { Component, Fragment } from 'react';
import {
  withStyles,
  Grid,
  Typography
} from '@material-ui/core';

import FilterTabs from 'components/FilterTabs';
import ProjectCard from 'components/ProjectCard';
import ProfileDetailPanel from 'components/ProfileDetailPanel';
import { getUser } from 'api/users';
import { withPageContext } from 'components/pageContext';
import Loading from 'components/Loading';
import { daysLeft } from 'helpers/formatting';

const FILTER_TYPES = ['projects', 'investments'];

const styles = (theme) => ({
  pageContent: {
    [theme.breakpoints.up('md')]: {
      padding: '0'
    }
  },
  projectInvestmentWrapper: {
    width: 'auto',
    padding: '2em 3em',
    [theme.breakpoints.up('md')]: {
      width: '90%'
    }
  },
  projectInvestmentHeader: {
    marginBottom: '35px'
  },
  header: {
    display: 'inline',
    paddingRight: '35px',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.main
    }
  },
  placeholderText: {
    maxHeight: 460,
    overflowY: 'auto',
    padding: 5,
    textAlign: 'left',
    margin: '50px'
  }
});

class ProfilePage extends Component {
  state = {
    isPending: false,
    isCurrentUser: false,
    currentUserId: '',
    displayFilter: 'projects',
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
    this.fetchUserProfile();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchUserProfile();
    }
  }

  async fetchUserProfile() {
    //if the route has an id param isCurrentUser is false
    const currentUserId = this.props.userDetails.id;
    this.setState({ isPending: TextTrackCueList });
    const profileId = this.props.match.params.id || this.props.userDetails.id;
    getUser(profileId).then((profile) => {
      this.setState(
        {
          isPending: false,
          profile: profile.data,
          currentUserId: this.props.userDetails.id,
          isCurrentUser: this.getUserType()
        }
      );
    }).catch((err) => {
      this.props.history.push('/');
    });
  }

  getUserType = () => {
    if (this.props.match.params.id === undefined) {
      return true;
    } else if (this.props.match.params.id === this.props.userDetails.id) {
      return true;
    }
  };

  renderUserInfo() {
    const { profilePic, name, location, about, expertise } = this.state.profile;
    const avatarPic = profilePic ? profilePic : null;

    return (
      <Fragment>
        <ProfileDetailPanel
          id={this.props.userDetails.id}
          currentUserId={this.state.profile._id}
          isCurrentUser={this.state.isCurrentUser}
          profilePic={avatarPic}
          name={name}
          location={location}
          about={about}
          expertise={expertise}
          history={this.props.history}
        />
      </Fragment>
    );
  }

  setFilter = (filter) => this.setState({ displayFilter: filter });

  renderTabs = (classes) => {
    const { investments, projects } = this.state.profile;
    if (investments.length !== 0 || projects.length !== 0) {
      return (
        <div className={classes.projectInvestmentHeader}>
          <FilterTabs
            filters={FILTER_TYPES}
            setFilter={this.setFilter}/>
        </div>
      );
    }
  };

  noProjectsInvestmentText = () => {
    const { profile: { projects, investments }, isCurrentUser } = this.state;
    const noProjects = projects.length === 0;
    const noInvestments = investments.length === 0;

    if (isCurrentUser) {
      if (noProjects && noInvestments) return 'You have no projects or investments';
      if (noProjects) return 'You have no projects';
      if (noInvestments) return 'You have no investments';
    } else {
      if (noProjects && noInvestments) return 'This user has no projects or investments';
      if (noProjects) return 'This user has no projects';
      if (noInvestments) return 'This user has no investments';
    }
  };

  renderPlaceholderText = (classes) => {
    return (
      <Typography
        variant="h3"
        className={classes.placeholderText}
        color="secondary"
        component="p">
        {this.noProjectsInvestmentText()}
      </Typography>
    );
  };

  renderProjects = () => {
    const { classes } = this.props;
    const { profile, displayFilter } = this.state;
    let data;

    if (displayFilter === 'investments') {
      data = profile.investments.map(inv => inv.project);
    } else {
      data = profile.projects;
    }

    if (data.length > 0) {
      return (
        <Grid container
              classes={{ root: 'project-section' }}
              spacing={8}
              justify="flex-start">
          {
            data.map((project, ix, arr) => (
              <Grid item
                    sm={12} md={arr.length > 1 ? 6 : 10} key={ix}>
                <ProjectCard
                  key={ix}
                  onClick={() => this.props.history.push(`/projects/${project._id}`)}
                  title={project.title}
                  image={project.images[0]}
                  funding={project.funding.fundingTotal}
                  fundingGoal={project.fundingGoal}
                  industry={project.industry}
                  daysLeft={daysLeft(project.fundingDeadline)}
                />
              </Grid>
            ))
          }
        </Grid>
      );
    } else if (this.state.isPending) {
      return <Loading/>;
    } else {
      return this.renderPlaceholderText(classes);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.pageContent}>
        <Grid container spacing={2}>
          <Grid container item xs={12} md={3}>
            {this.renderUserInfo()}
          </Grid>
          <Grid container item xs={12} md={9}>
            <div className={classes.projectInvestmentWrapper}>
              {this.renderTabs(classes)}
              <div>
                {this.renderProjects()}
              </div>
            </div>
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default withPageContext(withStyles(styles)(ProfilePage));
