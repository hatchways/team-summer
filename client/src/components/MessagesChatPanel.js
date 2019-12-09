import React from 'react';
import { lighten } from '@material-ui/core/styles';
import { Avatar, IconButton, styled, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const ConversationNavigation = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  borderBottom: `1px solid ${lighten(theme.palette.secondary.main, 0.7)}`
}));

const CurrentConversationDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: '25px 35px',
  borderBottom: `1px solid ${lighten(theme.palette.secondary.main, 0.7)}`
}));

const CurrentConversationUserInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',

  '& h4, & p': {
    margin: 0
  }
}));

export default ({ classes, conversations, activeConversation, desktop, switchPanelDisplay }) => {
  const currentConversation = conversations.find((conversation) => conversation.id === activeConversation);

  if (!currentConversation) return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Typography variant="h3" color="secondary" component="p">No current conversation</Typography>
    </div>
  );

  return (
    <div>
      {!desktop && (
        <ConversationNavigation onClick={() => switchPanelDisplay(0)}>
          <ChevronLeftIcon/>
          <Typography variant="h6" component="p">Back to Conversation List</Typography>
        </ConversationNavigation>
      )}
      <CurrentConversationDetails>
        <Avatar className={classes.userPicture}>
          {currentConversation.user.avatar || currentConversation.user.name.split('')[0]}
        </Avatar>
        <CurrentConversationUserInfo>
          <Typography variant="h4">{currentConversation.user.name}</Typography>
          <Typography variant="body1" color="secondary">{currentConversation.user.location}</Typography>
        </CurrentConversationUserInfo>

        <IconButton>
          <SettingsIcon/>
        </IconButton>
      </CurrentConversationDetails>
    </div>
  );
}