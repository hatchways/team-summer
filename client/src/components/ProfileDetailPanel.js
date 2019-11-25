import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Button, Paper, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    width: '30%',
    minHeight: '100vh'
  },
  avatar: {
    width: 60,
    height: 60,
    margin: '30px auto'
  }
}));

const ProfileDetailPanel = ({ imageUrl, name, location, about, expertise, buttonType }) => {
  
    const classes = useStyles();
  
    return (
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar} src={imageUrl || null} />
        <Typography variant="h5" component="h3">
          <h3>{name}</h3>
          <p>location</p>
        </Typography>
        <Button type="submit" variant="outlined" color="primary">
          {buttonType}
        </Button>
        <Typography component="p">
          <p>about me</p>
          <p>expertise</p>
        </Typography>
      </Paper>
    );
};

export default ProfileDetailPanel;
