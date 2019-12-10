import React from 'react';
import { withStyles, lighten, styled } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';
// import PropTypes from 'prop-types';
const standinProjectPic = 'https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg'

const IndustryLabel = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 100,
  padding: '5px 20px',
  marginBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    padding: '0',
  }
}), { withTheme: true });

const styles = (theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    transition: '0.3s',
    cursor: 'pointer',

    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
    }
  },
  cardImgContainer: {
    width: '100%',
    height: '415px',
    position: 'relative'
  },
  media: {
    width: '100%',
    height: '100%'
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',

    padding: 0,

    '&:last-child': {
      padding: 0
    }
  },
  cardHead: {
    height: '5%',
    padding: '20px 30px 20px 30px'
  },
  cardBody: {
    height: '5%',
    padding: '20px 30px 20px 30px'
  },
  cardFooter: {
    borderTop: `1px solid ${lighten(theme.palette.secondary.main, 0.5)}`,
    padding: '20px 30px 20px 30px'
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
      // marginRight: 15
    }
  },
  heading: {
    fontWeight: 'bold'
  },
  subheading: {
    lineHeight: 1.8
  }
});

// const ProjectHead = ({ classes }) => (
//   <div className={classes.cardHead}>
//     <Typography variant="h5">{'title'}</Typography>
//   </div>
// );

// const ProjectBody = ({ classes }) => (
//   <div className={classes.cardBody}>
//     <div className={classes.fundingAmounts}>
//       <Typography variant="overline" component="p">$</Typography>



//       <Typography variant="h6" color="secondary">/</Typography>

//       <Typography variant="h6" color="secondary">
//         {goal ? goal.toLocaleString() : 0}
//       </Typography>
//     </div>
//     <div className={classes.projectMeta}>
//       <Typography variant="body2" color="secondary">Equality exchange: {equality || 0}%</Typography>
//       <Typography variant="body2" color="secondary">Days left: {daysLeft}</Typography>
//     </div>
//   </div>
// );

// const ProjectFooter = ({ creator, classes }) => (
//   <div className={classes.cardFooter}>
//     <Typography variant="h6">
//       {creator.name}
//     </Typography>
//     <Typography variant="body2" color="secondary">
//       {creator.location}
//     </Typography>
//   </div>
// );

const PlaceholderCard = (props) => {
  return (
    <Grid item xs={12} alignItems="stretch" >
    <Card elevation={4} className={props.classes.card} onClick={props.onClick}>
      <div className={props.classes.cardHead}>
        <Typography variant="h5">LAUNCH</Typography>
      </div>
      <div className={props.classes.cardImgContainer}>
        <CardMedia
          className={props.classes.media}
          image={standinProjectPic}/>
      </div>
    </Card>
    </Grid>
  );
};


export default withStyles(styles)(PlaceholderCard);
