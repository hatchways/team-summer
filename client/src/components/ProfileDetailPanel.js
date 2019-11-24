import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    minHeight: '100vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    width: '30%'
    // color: theme.palette.text.secondary
  }
}));

const ProfileDetailPanel = ({ imageUrl, name, location, about, expertise }) => {
  
    const classes = useStyles();
  
    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h3">
          <h3>{name}</h3>
          <p>location</p>
        </Typography>
        <Typography component="p">
          <p>about me</p>
          <p>expertise</p>
        </Typography>
      </Paper>
    );
};

export default ProfileDetailPanel;
