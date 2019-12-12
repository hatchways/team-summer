import React, {Component} from 'react';
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

import * as ProjectStyles from 'components/ProjectPageStyles';
import CardCarousel from 'components/CardCarousel';
import PercentageProgressBar from 'components/PercentageProgressBar';
import Checkout from 'components/payments/Checkout';
import Modal from 'components/Modal';
import { getProject } from 'api/projects';

import { withPageContext } from 'components/pageContext';
import { createConversation } from 'api/messages';

class Project extends Component {
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
      images: [
        '/images/image-not-found.png'
      ]
    },
    user: {
      _id: '',
      name: '',
      avatar: ''
    },
    stripeSuccess: false,
    checkoutOpen: false,
    isCurrentUser: false
  };

  async componentDidMount() {
    try {
      const response = await getProject(this.props.match.params.id);
      const project = response.data;
      const isCurrentUser = this.props.userDetails.id === project.user._id
      project.daysLeft = Math.max(0, moment({ hours: 0 })
        .diff(project.fundingDeadline, 'days') * -1);

      if (project.images.length === 0 || project.images[0] === '/images/image-not-found.png') {
        project.images = ['/images/image-not-found.png']
      }

      this.setState({ 
        project, 
        isCurrentUser,
        user: project.user
      });

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

  renderCheckoutForm = () => {
    const { userDetails, match } = this.props

    return (
      <Modal handleClosePopup={this.handleClosePopup}>
        <Checkout
          userId={userDetails.id}
          projectId={match.params.id}
          handleClosePopup={this.handleClosePopup}
          handlePaymentCompletion={this.handlePaymentCompletion}
          projectTitle={this.state.project.title} />
      </Modal>
    )
  }

  handleSelectFundProject = (e) => {
    e.preventDefault()
    this.setState({ checkoutOpen: true })
  };

  handleClosePopup = (e) => {
    e.preventDefault()
    this.setState({ checkoutOpen: false })
  };

  emitSocketInvestment = () => {
    const { user: { _id, name }, project: { title } } = this.state

    this.props.socket.emit('investment', {
      id: _id,
      name: name,
      projectName: title
    }, { token: localStorage.getItem('jwtToken') })
  }

  handlePaymentCompletion = (investmentAmount) => {
    if (investmentAmount !== null) {
      this.props.activateToast('Success. you invested.', 'success')
      this.emitSocketInvestment()
      this.applyInvestment(investmentAmount)
    } else {
      this.props.activateToast('Payment was not successful', 'error')
    }
  }

  applyInvestment = (investment) => {
    const donorCount = this.state.project.funding.donorCount + 1
    const fundingTotal = this.state.project.funding.fundingTotal + parseInt(investment)

    const newState = {
      ...this.state,
      stripeSuccess: true,
      checkoutOpen: false,
      project: {
        ...this.state.project,
        funding: {
          ...this.state.project.funding,
          donorCount,
          fundingTotal
        }
      }
    }

    this.setState(newState)
  }

  projectFundraisingCard() {
    const { user, project: { funding, fundingGoal, daysLeft }} = this.state;

    const calculateCompleted = () => {
      if (!funding.fundingTotal) return 0;

      const percentageComplete = Math.round((funding.fundingTotal * 100) / fundingGoal);
      return Math.min(percentageComplete, 100);
    };

    const handleEditProject = () => {
      const { project } = this.state;
      const { _id: id, title, subtitle, description, industry, images, location, fundingGoal, fundingDeadline } = project;
      const projectUserId = this.state.user._id;
      const projectInfo = { id, title, subtitle, description, industry, images, location, fundingGoal, fundingDeadline, projectUserId };
      this.props.history.push({
        pathname: `edit/${id}`,
        state: projectInfo
      });
    };

    const handleSendMessage = async () => {
      await createConversation([this.props.userDetails.id, this.state.user._id])
        .catch((error) => console.log(error));

      this.props.history.push('/messages');
    };

    const getButtonType = () => {
      const {isCurrentUser: cur} = this.state

      return (
        <Button 
          variant="outlined" 
          color={cur ? 'primary' : 'secondary'} 
          onClick={cur ? handleEditProject : handleSendMessage} >
          {cur ? 'Edit' : 'Send'}
        </Button>
      )
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
              : user.name[0]
            }
          </Avatar>
          <Typography variant="h6">{user.name}</Typography>
        </ProjectStyles.CreatorProfile>

        <ProjectStyles.ProjectActionButtons>
          {getButtonType()}
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSelectFundProject}>
            Fund This Project
            </Button>
        </ProjectStyles.ProjectActionButtons>
      </Card>
    );
  }

  render() {
    return (
      <ProjectStyles.Main>
        {this.projectHeaderContent()}
        <ProjectStyles.ProjectGrid>
          {
            this.state.checkoutOpen &&
            this.renderCheckoutForm()
          }
          {this.projectDetailsCard()}
          {this.projectFundraisingCard()}
        </ProjectStyles.ProjectGrid>
      </ProjectStyles.Main>
    );
  }
}

export default withPageContext(withStyles(ProjectStyles.styles)(Project));
