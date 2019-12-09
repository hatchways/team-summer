import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MonitizationIcon from '@material-ui/icons/Send';
import AlertBadge from './AlertBadge';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
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

export default function CustomizedMenus({ alerts, messages, notifications }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    notifications
                        ? notifications.map((notification) => {
                            const { _id, investor, investmentAmount, project, } = notification
                            const notificationMessage = `${investor.name} invested ${investmentAmount} in your project ${project.title}`
                            return (
                                <StyledMenuItem key={_id}>
                                    <ListItemIcon>
                                        <MonitizationIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={notificationMessage} />
                                </StyledMenuItem>
                            )
                        })
                        : ''
                }
            </StyledMenu>
        </div>
    );
}