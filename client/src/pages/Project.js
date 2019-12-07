import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment'

import * as ProjectStyles from '../components/ProjectPageStyles';
import CardCarousel from '../components/CardCarousel';
import PercentageProgressBar from '../components/PercentageProgressBar';
import { getProject } from '../api/projects';

import { withPageContext } from '../components/pageContext';

class Project extends React.Component {
  state = {
    project: {
      _id: null,
      title: '',
      subtitle: '',
      description: '',
      industry: '',
      location: '',
      funding: {
        donorCount: 0,
        fundingTotal: 0
      },
      fundingGoal: 0,
      daysLeft: 0,
      equalityExchange: 0,
      images: [
        '/images/image-not-found.png'
      ]
    },
    user: {
      _id: '',
      name: '',
      avatar: ''
    }
  };

  async componentDidMount() {
    try {
      const response = await getProject(this.props.match.params.id);
      const project = response.data;
      project.daysLeft = Math.max(0, moment({ hours: 0 }).diff(project.fundingDeadline, 'days') * -1);

      if (project.images.length === 0 || project.images[0] === '/images/image-not-found.png') project.images = ['/images/image-not-found.png'];

      this.setState({ project, user: project.user });
    } catch (err) {
      console.log(err)
    }
  }

  projectHeaderContent() {
    const { classes } = this.props;
    const { industry, subtitle, title } = this.state.project;

    return (
      <ProjectStyles.ProjectHeaderWrapper>
        <Grid container direction="column" alignItems="center">
          <ProjectStyles.IndustryLabel>
            <Typography variant="body1">{industry}</Typography>
          </ProjectStyles.IndustryLabel>
          <Typography variant="h2" className={classes.pageTitle}>{title}</Typography>
          <Typography variant="subtitle2">{subtitle}</Typography>
        </Grid>
      </ProjectStyles.ProjectHeaderWrapper>
    );
  }

  projectDetailsCard() {
    const { classes } = this.props;
    const { description, location, images } = this.state.project;

    return (
      <Card elevation={4}>
        <CardCarousel images={images} />
        <CardContent className={classes.projectDetailsContent}>
          <ProjectStyles.DetailsCardAbout>
            <Typography variant="h3">About</Typography>
            <Typography variant="body1">{!description ? 'No Description found' : description}</Typography>
          </ProjectStyles.DetailsCardAbout>
          <Typography variant="h4">Location: </Typography>
          <Typography variant="h5">{location}</Typography>
        </CardContent>
      </Card>
    );
  }

  projectFundraisingCard() {
    const { classes } = this.props;
    const { user } = this.state;
    const { funding, fundingGoal, daysLeft, equalityExchange } = this.state.project;

    const calculateCompleted = () => {
      if (!funding.fundingTotal) return 0;

      const percentageComplete = Math.round((funding.fundingTotal * 100) / fundingGoal);
      return Math.min(percentageComplete, 100);
    };

    const handleEditProjectRedirect = () => {
      const { project } = this.state;
      const { _id: id, title, subtitle, description, industry, images, location, fundingGoal, fundingDeadline } = project;
      const projectUserId = this.state.user._id;
      const projectInfo = { id, title, subtitle, description, industry, images, location, fundingGoal, fundingDeadline, projectUserId };
      this.props.history.push({
        pathname: `edit/${id}`,
        state: projectInfo
      });
    }

    const handleSendMessage = () => {
      this.props.history.push(`/messages/${user.id}`);
    };
    
    const handleFundProject = () => {
      const { history, userDetails, match } = this.props

      history.push({
        pathname: '/checkout',
        state: {
          userId: userDetails.id,
          projectId: match.params.id,
          projectTitle: this.state.project.title
        }
      })
    }

    const disableFunding = () => {
      // TODO: Logic to handle disabling funding of project, maybe if project fund period has ended
      // Disabled by default for now until funding logic is added
      return false;
    };

    const getButtonType = () => {
      const userId = this.state.user._id;
      return this.props.userAuthenticated && userId === this.props.userDetails.id
        ? <Button variant="outlined" color="primary" onClick={handleEditProjectRedirect}>Edit</Button>
        : <Button variant="outlined" color="secondary" onClick={handleSendMessage}>Send Message</Button>;
    }

    return (
      <Card elevation={0}>
        <ProjectStyles.CardLine />
        <ProjectStyles.FundraisingAmounts>
          <Typography variant="h5">$</Typography>
          <Typography variant="h3">{funding.fundingTotal.toLocaleString()}</Typography>
          <Typography variant="h5" color="secondary">/</Typography>
          <Typography variant="h5" color="secondary">{fundingGoal.toLocaleString()}</Typography>
        </ProjectStyles.FundraisingAmounts>

        <PercentageProgressBar value={calculateCompleted()} />

        <Typography variant="body1" className={classes.fundraisingEquity}>Equity
          Exchange: {equalityExchange}% </Typography>

        <ProjectStyles.FundraisingStatContainer>
          <ProjectStyles.FundraisingStat>
            <Typography variant="h4">{funding.donorCount}</Typography>
            <Typography variant="body1" color="secondary">Backers</Typography>
          </ProjectStyles.FundraisingStat>

          <ProjectStyles.FundraisingStat>
            <Typography variant="h4">{daysLeft}</Typography>
            <Typography variant="body1" color="secondary">Days to go</Typography>
          </ProjectStyles.FundraisingStat>
        </ProjectStyles.FundraisingStatContainer>

        <ProjectStyles.CreatorProfile>
          <Avatar>
            {user.avatar
              ? <img src={user.avatar} alt="Project creator avatar" />
              : user.name.split('')[0]
            }
          </Avatar>
          <Typography variant="h6">{user.name}</Typography>
        </ProjectStyles.CreatorProfile>

        <ProjectStyles.ProjectActionButtons>
          {getButtonType()}
          {!disableFunding() && (
            <Button variant="contained" color="primary" onClick={handleFundProject}>Fund This Project</Button>
          )}
        </ProjectStyles.ProjectActionButtons>
      </Card>
    );
  }

  render() {
    return (
      <ProjectStyles.Main>
        {this.projectHeaderContent()}
        <ProjectStyles.ProjectGrid>
          {this.projectDetailsCard()}
          {this.projectFundraisingCard()}
        </ProjectStyles.ProjectGrid>
      </ProjectStyles.Main>
    );
  }
}

export default withPageContext(withStyles(ProjectStyles.styles)(Project));
