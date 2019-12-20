import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Paper, Typography } from '@material-ui/core';
import { createConversation } from '../api/messages';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      height: '100vh'
    }
  },
  avatar: {
    width: 80,
    height: 80,
    margin: '20px auto',
    [theme.breakpoints.up('md')]: {
      margin: '25px auto 30px',
      width: 100,
      height: 100
    }
  },
  button: {
    width: '80% !important',
    margin: '10px auto'
  }
}));

const ProfileDetailPanel = (props) => {
  const {
    id,
    profilePic,
    name,
    location,
    about,
    expertise,
    isCurrentUser,
    history
  } = props;
  const classes = useStyles();

  const handleRedirect = async (e) => {
    e.preventDefault();
    if (isCurrentUser === true) {
      history.push({
        pathname: `profile/edit/${id}`,
        state: { id, profilePic, name, location, about }
      });
    } else {
      await createConversation([props.currentUserId, id])
        .catch((error) => console.log(error));

      history.push('/messages');
    }
  };

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar} src={profilePic || null}>
        <Typography variant="h1">{profilePic === null && name[0]}</Typography>
      </Avatar>
      <Typography variant="h3">{name}</Typography>
      {
        location !== "undefined" &&
        <Typography variant="body1">{location}</Typography>
      }
      <Button
        classes={{ root: classes.button }}
        type="submit"
        variant="outlined"
        color="primary"
        onClick={handleRedirect}>
        {isCurrentUser ? 'edit' : 'message'}
      </Button>
      {
        about !== "undefined" &&
        <Typography variant="body1">{about}</Typography>
      }
      <Typography variant="body1">{expertise}</Typography>
    </Paper>
  );
};

export default ProfileDetailPanel;
