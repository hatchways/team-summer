import React from 'react';
import { withStyles, lighten } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';

const styles = (theme) => ({
  card: {
    minWidth: 200,
    margin: 10,
    transition: '0.3s',

    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
    }
  },
  cardHead: {
    minHeight: 75,
    padding: '20px 30px 10px 30px'
  },
  cardBody: {
    minHeight: 65,
    padding: '10px 30px 20px 30px'
  },
  cardFooter: {
    minHeight: 65,
    borderTop: `1px solid ${lighten(theme.palette.secondary.main, 0.5)}`,
    padding: '10px 30px 20px 30px'
  },
  media: {
    height: 250
  },
  content: {
    padding: 0,
    textAlign: 'left',

    '&:last-child': {
      padding: 0
    }
  },
  fundingAmounts: {
    display: 'flex',

    '& :nth-child(2), & :nth-child(3)': {
      marginRight: 5
    }
  },
  projectMeta: {
    display: 'flex',

    '& :first-child': {
      marginRight: 15
    }
  },
  heading: {
    fontWeight: 'bold'
  },
  subheading: {
    lineHeight: 1.8
  }
});

const ProjectHead = ({ classes, name }) => (
  <div className={classes.cardHead}>
    <Typography variant="h5">{name}</Typography>
  </div>
);

const ProjectBody = ({ classes, funding, goal, equality, daysLeft }) => (
  <div className={classes.cardBody}>
    <div className={classes.fundingAmounts}>
      <Typography variant="overline">$</Typography>

      <Typography variant="h6">
        {funding.toLocaleString()}
      </Typography>

      <Typography variant="h6" color="secondary">/</Typography>

      <Typography variant="h6" color="secondary">
        {goal.toLocaleString()}
      </Typography>
    </div>
    <div className={classes.projectMeta}>
      <Typography variant="body2" color="secondary">Equality exchange: {equality}%</Typography>
      <Typography variant="body2" color="secondary">Days left: {daysLeft}</Typography>
    </div>
  </div>
);

const ProjectFooter = ({ creator, location, classes }) => (
  <div className={classes.cardFooter}>
    <Typography variant="h6">
      {creator.name}
    </Typography>
    <Typography variant="body2" color="secondary">
      {creator.location}
    </Typography>
  </div>
);

const ProjectCard = (props) => {
  console.log(props);
  return (
    <Card elevation={3}>
      <CardMedia
        className={props.classes.media}
        image={
          'https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg'
        }/>
      <CardContent className={props.classes.content}>
        <ProjectHead {...props}/>
        <ProjectBody {...props}/>
        {props.creator && (
          <ProjectFooter {...props}/>
        )}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(ProjectCard);
