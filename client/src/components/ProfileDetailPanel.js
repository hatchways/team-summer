import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Button, Paper, Typography} from '@material-ui/core';

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
    }
  },
  body: {
    margin: '10px 0'
  }
}));

const ProfileDetailPanel = ({ imageUrl, name, location, about, expertise, buttonType }) => {
  
    const classes = useStyles();
  
    return (
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar} src={imageUrl || null} />
        <Typography variant="h3">{name}</Typography>
        <Typography variant="body1" classes={{body1: classes.body}}> Location</Typography>
        <Button type="submit" variant="outlined" color="primary">
          {buttonType}
        </Button>
        <Typography variant="body1" classes={{body1: classes.body}}>About me</Typography>
        <Typography variant="body1" classes={{body1: classes.body}}>Expertise</Typography>
      </Paper>
    );
};

export default ProfileDetailPanel;
