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

class Project extends React.Component {
  state = {
    project: {
      title: 'Urban Jungle: eco-friendly coffee shop',
      subtitle: 'Fresh Coffee. Community. All rolled into one cup.',
      description: 'Coffee shop will make its best effort to create a unique place where customers can socialize with each other in a comfortable and relaxing environment while enjoying the best brewed coffee or espresso and pastries in town. We will be in the business of helping our customers to relieve their daily stresses by providing piece of mind through great ambience, convenient location, friendly customer service, and products of consistently high quality.',
      industry: 'Food and Craft',
      location: 'San Jose, CA',
      funding: {
        donorCount: 0,
        fundingTotal: 0
      },
      fundingGoal: 52000,
      daysLeft: 200,
      equalityExchange: 10,
      images: [
        '/images/placeholder-sunset.jpg',
        '/images/placeholder-ocean.jpg'
      ]
    },
    user: {
      id: '222',
      name: 'James Hampton',
      avatar: ''
    }
  };

  async componentDidMount() {
    let project = await getProject(this.props.match.params.id).then((response) => response.data.project);

    project.daysLeft = Math.max(0, moment({hours: 0}).diff(project.fundingDeadline, 'days'));

    if (project.images.length === 0) project.images = ['/images/image-not-found.png'];

    this.setState({ project, user: project.user });
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
        <CardCarousel images={images}/>
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

    const handleSendMessage = () => {
      this.props.history.push(`/messages/${user.id}`);
    };

    const handleFundProject = () => {
      //TODO: Implement fund logic
    };

    const disableFunding = () => {
      // TODO: Logic to handle disabling funding of project, maybe if project fund period has ended
      // Disabled by default for now until funding logic is added
      return true;
    };

    return (
      <Card elevation={0}>
        <ProjectStyles.CardLine/>
        <ProjectStyles.FundraisingAmounts>
          <Typography variant="h5">$</Typography>
          <Typography variant="h3">{funding.fundingTotal.toLocaleString()}</Typography>
          <Typography variant="h5" color="secondary">/</Typography>
          <Typography variant="h5" color="secondary">{fundingGoal.toLocaleString()}</Typography>
        </ProjectStyles.FundraisingAmounts>

        <PercentageProgressBar value={calculateCompleted()}/>

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
              ? <img src={user.avatar} alt="Project creator avatar"/>
              : user.name.split('')[0]
            }
          </Avatar>
          <Typography variant="h6">{user.name}</Typography>
        </ProjectStyles.CreatorProfile>

        <ProjectStyles.ProjectActionButtons>
          <Button variant="outlined" color="secondary" onClick={handleSendMessage}>Send Message</Button>
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

export default withStyles(ProjectStyles.styles)(Project);
