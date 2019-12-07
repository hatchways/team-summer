import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        padding: theme.spacing(0, 2),
    },
}));

export default function AlertBadge({ alerts, onClick }) {
    const classes = useStyles();

    return (
        <IconButton onClick={onClick} aria-label="4 pending messages" className={classes.margin}>
            <Badge badgeContent={alerts} color="primary">
                <NotificationsIcon />
            </Badge>
        </IconButton>
    );
}
