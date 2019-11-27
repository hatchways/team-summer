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

const ProjectHeader = styled('header')(({theme}) => ({
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

  [theme.breakpoints.up('md')]: {
    maxWidth: '65%',
    gridTemplateColumns: '2fr 1fr'
  }
}), { withTheme: true });

const DetailsCardAbout = styled('div')(({theme}) => ({
  marginBottom: theme.spacing(4)
}));


class Project extends React.Component {
  state = {
    title: 'Urban Jungle: eco-friendly coffee shop',
    subtitle: 'Fresh Coffee. Community. All rolled into one cup.',
    description: 'Coffee shop will make its best effort to create a unique place where customers can socialize with each other in a comfortable and relaxing environment while enjoying the best brewed coffee or espresso and pastries in town. We will be in the business of helping our customers to relieve their daily stresses by providing piece of mind through great ambience, convenient location, friendly customer service, and products of consistently high quality.',
    industry: 'Food and Craft',
    location: 'San Jose, CA',
    fundingGoal: 23850,
    images: [
      '/images/placeholder-sunset.jpg'
    ]
  };

  projectDetailsCard() {
    const { classes } = this.props;
    const { description, location } = this.state;

    return (
      <Card elevation={4}>
        <CardMedia component="img" image="/images/placeholder-sunset.jpg"
                   title="Project image"
                   height="460"
        />
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

  render() {
    const { classes } = this.props;
    const { title, subtitle, industry } = this.state;

    return (
      <Main>
        <ProjectHeader>
          <Grid container direction="column" alignItems="center">
            <IndustryLabel>
              <Typography variant="body1">{industry}</Typography>
            </IndustryLabel>
            <Typography variant="h2" className={classes.pageTitle}>{title}</Typography>
            <Typography variant="subtitle2">{subtitle}</Typography>
          </Grid>
        </ProjectHeader>
        <ProjectGrid>
          {this.projectDetailsCard()}
          <Card elevation={4}>
            Test
          </Card>
        </ProjectGrid>
      </Main>
    );
  }
}

export default withStyles(styles)(Project);
