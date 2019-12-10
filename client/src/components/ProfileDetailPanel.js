import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      height: '100vh'
      // padding: theme.spacing(3),
    },
  },
  avatar: {
    width: 80,
    height: 80,
    margin: '20px auto',
    [theme.breakpoints.up('md')]: {
      margin: '25px auto 30px',
      width: 100,
      height: 100,
    },
  },
  button: {
    width: '80% !important',
    margin: '10px auto'
  }
}));

const ProfileDetailPanel = (props) => {
  const { id, profilePic, name, location, about, expertise, isCurrentUser, history } = props
  const classes = useStyles();

  const handleRedirect = (e) => {
    e.preventDefault();
    if (isCurrentUser === true) {
      const userInfo = { id, profilePic, name, location, about };
      history.push({
        pathname: `profile/edit/${id}`,
        state: userInfo
      });
    } else {
      // TO DO MESSAGING
    }
  }

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar} src={profilePic || null} />
      <Typography variant="h3">{name}</Typography>
      <Typography variant="body1">{location}</Typography>
      <Button 
        classes={{ root: classes.button }} 
        type="submit" 
        variant="outlined" 
        color="primary" 
        onClick={handleRedirect}>
        {isCurrentUser ? 'edit' : 'message'}
      </Button>
      <Typography variant="body1">{about}</Typography>
      <Typography variant="body1">{expertise}</Typography>
    </Paper>
  );
};

export default ProfileDetailPanel;
