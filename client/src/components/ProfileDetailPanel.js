import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Paper, Typography } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

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
}));

const ProfileDetailPanel = ({ id, imageUrl, name, location, about, expertise, buttonType }) => {

  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar} src={imageUrl || null} />
      <Typography variant="h3">{name}</Typography>
      <Typography variant="body1">{location}</Typography>
      <Button type="submit" variant="outlined" color="primary">
        {
          buttonType === 'edit' ?
            <Link to={`/profile/edit/${id}`}>Edit</Link>
            : buttonType
        }
      </Button>
      <Typography variant="body1">{about}</Typography>
      <Typography variant="body1">{expertise}</Typography>
    </Paper>
  );
};

export default ProfileDetailPanel;
