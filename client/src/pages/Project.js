import React from 'react';
import {
  Typography,
  styled,
  withStyles,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent
} from '@material-ui/core';

const styles = (theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(1.2)
  },
  projectDetailsContent: {
    padding: theme.spacing(5)
  }
});

const Main = styled('main')(() => ({
  //Spacing & Page width
  padding: 40
}), { withTheme: false });

const ProjectHeaderWrapper = styled('header')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8)
}));

const IndustryLabel = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 100,
  padding: '5px 20px',
  marginBottom: theme.spacing(1)
}), { withTheme: true });

const ProjectGrid = styled(Grid)(({ theme }) => ({
  display: 'grid',
  maxWidth: '100%',
  margin: '0 auto',
  gridGap: 40,

  [theme.breakpoints.up('lg')]: {
    maxWidth: '65%',
    gridTemplateColumns: '2fr 1fr'
  }
}), { withTheme: true });

const DetailsCardAbout = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4)
}));

const CardLine = styled('div')(({ theme }) => ({
  width: '100%',
  height: 7,
  backgroundColor: '#000000',
  marginBottom: theme.spacing(6)
}));

const FundraisingAmounts = styled('div')(({ theme }) => ({
  // Alignment
  display: 'flex',
  justifyContent: 'center',
  padding: '0 30px 0 30px',

  '& > h5:first-child': {
    marginRight: 5,
    marginTop: 0,
    fontWeight: 500
  },

  '& > h3': {
    marginTop: 5
  },

  '& > h5:nth-child(3)': {
    marginTop: 8,
    marginLeft: 5,
    marginRight: 5
  },

  '& > h5:last-child': {
    marginTop: 10
  }
}));


class Project extends React.Component {
  state = {
    title: 'Urban Jungle: eco-friendly coffee shop',
    subtitle: 'Fresh Coffee. Community. All rolled into one cup.',
    description: 'Coffee shop will make its best effort to create a unique place where customers can socialize with each other in a comfortable and relaxing environment while enjoying the best brewed coffee or espresso and pastries in town. We will be in the business of helping our customers to relieve their daily stresses by providing piece of mind through great ambience, convenient location, friendly customer service, and products of consistently high quality.',
    industry: 'Food and Craft',
    location: 'San Jose, CA',
    fundingRaised: 23550,
    fundingGoal: 52000,
    images: [
      '/images/placeholder-sunset.jpg'
    ]
  };

  projectHeaderContent() {
    const { classes } = this.props;
    const { industry, subtitle, title } = this.state;

    return (
      <ProjectHeaderWrapper>
        <Grid container direction="column" alignItems="center">
          <IndustryLabel>
            <Typography variant="body1">{industry}</Typography>
          </IndustryLabel>
          <Typography variant="h2" className={classes.pageTitle}>{title}</Typography>
          <Typography variant="subtitle2">{subtitle}</Typography>
        </Grid>
      </ProjectHeaderWrapper>
    );
  }

  projectDetailsCard() {
    const { classes } = this.props;
    const { description, location } = this.state;

    return (
      <Card elevation={4}>
        <CardMedia component="img" image="/images/placeholder-sunset.jpg"
                   title="Project image"
                   height="460"/>
        <CardContent className={classes.projectDetailsContent}>
          <DetailsCardAbout>
            <Typography variant="h3">About</Typography>
            <Typography variant="body1">{description}</Typography>
          </DetailsCardAbout>
          <Typography variant="h4">Location: </Typography>
          <Typography variant="h5">{location}</Typography>
        </CardContent>
      </Card>
    );
  }

  projectFundraisingCard() {
    const { fundingRaised, fundingGoal } = this.state;
    return (
      <Card elevation={0}>
        <CardLine/>
        <FundraisingAmounts>
          <Typography variant="h5">$</Typography>
          <Typography variant="h3">{fundingRaised.toLocaleString()}</Typography>
          <Typography variant="h5" color="secondary">/</Typography>
          <Typography variant="h5" color="secondary">{fundingGoal.toLocaleString()}</Typography>
        </FundraisingAmounts>
      </Card>
    );
  }

  render() {
    return (
      <Main>
        {this.projectHeaderContent()}
        <ProjectGrid>
          {this.projectDetailsCard()}
          {this.projectFundraisingCard()}
        </ProjectGrid>
      </Main>
    );
  }
}

export default withStyles(styles)(Project);
