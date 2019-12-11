import React, { Component, Fragment } from 'react';
import { 
  withStyles, 
  Grid,
  Typography } from '@material-ui/core';
import moment from 'moment';

import FilterTabs from 'components/FilterTabs';
import ProjectCard from 'components/ProjectCard';
import ProfileDetailPanel from 'components/ProfileDetailPanel';
import { getUser } from 'api/users';
import { withPageContext } from 'components/pageContext';
const standinProfilePic = '/images/ee72493c158dc6aafc0831429481101b97cb10b7.png';
const standinProjectPic = '/images/a8b330accea0c77385355109bf6d88761738e377.png';

const FILTER_TYPES = ['projects', 'investments']
// TODO: setUserDetails should take (id, profile)
// this.props.setUserDetails(profileId, profile.data.name, profile.data.about, profile.data.profilePic, profile.data.location);

const styles = (theme) => ({
  pageContent: {
    [theme.breakpoints.up('md')]: {
      padding: '0',
    }
  },
  projectInvestmentWrapper: {
    width: '75%',
    padding: '2em 3em'
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
    padding: 5
  }
});


// const ConversationListPanel = styled(Paper)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   padding: 60,

//   [theme.breakpoints.up('lg')]: {
//     paddingLeft: '25%'
//   }
// }));


class ProfilePage extends Component {
  state = {
    displayFilter: 'projects',
    isCurrentUser: false,
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
    if (!this.props.userAuthenticated) { //TODO: this should be handled at higher level
      this.props.activateToast('Please log in to view profiles', 'error');
      return this.props.history.push('/login');
    }

    //if the route has an id param isCurrentUser is false
    const profileId = this.props.match.params.id || this.props.userDetails.id;
    getUser(profileId).then((profile) => {
      this.setState(
        {
          profile: profile.data,
          isCurrentUser: this.getUserType()
        }
      )
    }).catch((err) => {
      if (err) this.props.history.push('/');
    })
  }

  getUserType = () => {
    let isCurrentUser
    if (this.props.match.params.id === undefined){
      return true
    } else if (this.props.match.params.id === this.props.userDetails.id){
      return true
    }
  }
  
  renderUserInfo() {
    const { profilePic, name, location, about, expertise } = this.state.profile;
    const avatarPic = profilePic ? profilePic : standinProfilePic

    return (
      <Fragment>
        <ProfileDetailPanel
          id={this.props.userDetails.id}
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

  setFilter = (filter) => this.setState({displayFilter: filter});

  renderTabs = (classes) => {
    const {investments, projects} = this.state.profile;
    if(investments.length !== 0 && projects.length !== 0 ){
      return (
        <div className={classes.projectInvestmentHeader}>
          <FilterTabs filters={FILTER_TYPES} setFilter={this.setFilter} />
        </div>
      )
    }
  }

  renderData = () => {
    const { profile, displayFilter, isCurrentUser } = this.state;
    let data

    if (displayFilter === 'investments') {
      data = profile.investments.map(inv => inv.project)
    } else {
      data = profile.projects 
    } 
    if(data.length === 0) {
        return (
          <Typography
            variant="h3"
            color="secondary"
            component="p"
            style={{ textAlign: 'center' }}>
            {
              isCurrentUser ? 
              'You have no projects or investments' :
              'This user has no projects or investments'
            }
          </Typography>
        )
    }
    else if (data) {
      return (
        <Grid container classes={{ root: 'project-section' }} 
        spacing={8} 
        
        justify="left">
          {
            data ?
              data.map((project, ix) => (
                <Grid item sm={12} alignItems="stretch" key={ix}>
                  <ProjectCard
                    key={ix}
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
                {this.renderData()}
              </div>
            </div>
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default withPageContext(withStyles(styles)(ProfilePage));
