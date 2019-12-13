import React from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AlertBadge from './AlertBadge';

import { setNotificationToSeen, deleteNotification } from 'api/notifications';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    }
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

function CustomizedMenus({ history, alerts, classes, investmentNotifications, setNotifications }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const redirectToProfile = (id) => {
        return history.push(`/profile/${id}`)
    }

    const redirectToProject = (id) => {
        return history.push(`/projects/${id}`)
    }

    const markAsSeen = (id, idx) => {
        setNotificationToSeen(id)
            .then(() => {
                investmentNotifications[idx].seen = true;
                setNotifications(investmentNotifications);
            })
            .catch(err => console.log(err));
    }

    const handleDeleteNotification = (id) => {
        deleteNotification(id)
            .then(() => {
                const filteredInvestments = investmentNotifications.filter(notification => notification._id !== id)
                setNotifications(filteredInvestments)
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <AlertBadge alerts={alerts} onClick={handleClick} />
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose} >
                {
                    investmentNotifications.length
                        ? investmentNotifications.map((notification, idx) => {
                            const { _id, investor, investmentAmount, project, seen } = notification
                            const notificationMessage = `invested $${investmentAmount} in ${project.title}!`
                            return (
                                <StyledMenuItem className={seen ? classes.isSeenFade : classes.styledMenuItem} key={_id}>
                                    <ListItemIcon className={classes.listItem}>
                                        <Avatar className={classes.investorIcon} src={investor.profilePic || null} onClick={() => redirectToProfile(investor._id)}>
                                            {
                                                investor.profilePic
                                                    ? investor.profilePic
                                                    : investor.name
                                                        ? investor.name.split('')[0]
                                                        : '?'
                                            }
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={notificationMessage} onClick={() => redirectToProject(project._id)} />
                                    <VisibilityIcon className={classes.seenIcon} onClick={() => markAsSeen(_id, idx)} />
                                    <HighlightOffIcon onClick={() => handleDeleteNotification(_id)} />
                                </StyledMenuItem>
                            )
                        })
                        : ''
                }
            </StyledMenu>
        </div>
    );
}

export default withRouter(withStyles({
    styledMenuItem: {
        padding: '8px'
    },
    isSeenFade: {
        padding: '8px',
        opacity: '40%',
    },
    listItem: {
        minWidth: '40px'
    },
    investorIcon: {
        height: '25px',
        width: '25px'
    },
    seenIcon: {
        marginLeft: '5px',
        marginRight: '5px'
    },
    deleteIcon: {
        marginRight: '5px'
    }
})(CustomizedMenus))