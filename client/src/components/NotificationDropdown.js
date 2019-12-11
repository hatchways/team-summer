import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AlertBadge from './AlertBadge';

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

function CustomizedMenus({ history, alerts, classes, notifications }) {
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
                    notifications.length
                        ? notifications.map((notification) => {
                            const { _id, investor, investmentAmount, project, } = notification
                            const notificationMessage = `invested $${investmentAmount} in ${project.title}!`
                            return (
                                <StyledMenuItem key={_id}>
                                    <ListItemIcon>
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
    investorIcon: {
        height: '25px',
        width: '25px'
    }
})(CustomizedMenus))