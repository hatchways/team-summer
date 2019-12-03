import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      width: '30%',
      minHeight: '100vh'
    },
  },
  avatar: {
    width: 60,
    height: 60,
    margin: '10px auto',
    [theme.breakpoints.up('md')]: {
      margin: '30px auto',
    },
  },
  button: {
    margin: '10px 0px 10px 0px',
  }
}));

const ProfileDetailPanel = ({ id, profilePic, name, location, about, expertise, buttonType, history }) => {

  const classes = useStyles();

  const handleRedirect = (buttonType) => (event) => {
    event.preventDefault();
    if (buttonType === 'edit') {
      const userInfo = { id, profilePic, name, location, about };
      history.push({
        pathname: `profile/edit/${id}`,
        state: userInfo
      });
    } else if (buttonType === 'message') {
      // TO DO MESSAGING
    }
  }

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar} src={profilePic || null} />
      <Typography variant="h3">{name}</Typography>
      <Typography variant="body1">{location}</Typography>
      <Button classes={{ root: classes.button }} type="submit" variant="outlined" color="primary" onClick={handleRedirect(buttonType)}>
        {buttonType}
      </Button>
      <Typography variant="body1">{about}</Typography>
      <Typography variant="body1">{expertise}</Typography>
    </Paper>
  );
};

export default ProfileDetailPanel;
