import React, { useState } from 'react';
import { lighten, styled } from '@material-ui/core/styles';
import {
  Avatar,
  IconButton,
  Typography,
  InputBase,
  Button
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SendIcon from '@material-ui/icons/Send';

const ConversationGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  maxHeight: 'calc(100vh - 74px)',
  gridTemplateRows: '50px 90px 1fr 100px',
  [theme.breakpoints.up('md')]: {
    gridTemplateRows: '100px 1fr 100px'
  }
}));

const ConversationNavigation = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  borderBottom: `1px solid ${lighten(theme.palette.secondary.main, 0.7)}`
}));

const CurrentConversationDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 35px',
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

const MessagesSection = styled('div')(({ theme }) => ({
  padding: '50px 35px',
  overflowY: 'auto'
}));

const MessageItem = styled(({ sent, ...props }) => <div {...props}/>)(({ theme, ...props }) => ({
  display: 'flex',
  flexDirection: props.sent ? 'row-reverse' : 'row',

  marginBottom: 35
}));

const MessageBubble = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',

  backgroundColor: lighten(theme.palette.secondary.main, 0.8),
  borderRadius: 100
}));

const MessageInput = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  paddingRight: 50,
  borderTop: `1px solid ${lighten(theme.palette.secondary.main, 0.7)}`
}));

export default (props) => {
  const { classes } = props;
  const [outboundMessage, setOutboundMessage] = useState('');

  const currentConversation = props.conversations.find((conversation) => conversation.id === props.activeConversation);

  if (!currentConversation) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" color="secondary" component="p">No current conversation</Typography>
    </div>
  );

  return (
    <ConversationGrid>
      {!props.desktop && (
        <ConversationNavigation onClick={() => props.switchPanelDisplay(0)}>
          <ChevronLeftIcon/>
          <Typography variant="h6" component="p">Back to Conversation List</Typography>
        </ConversationNavigation>
      )}
      <CurrentConversationDetails>
        <Avatar className={classes.userPicture} src={currentConversation.users[0].profilePic || null}>
          {!currentConversation.users[0].profilePic && currentConversation.users[0].name.split('')[0]}
        </Avatar>
        <CurrentConversationUserInfo>
          <Typography variant="h4">{currentConversation.users[0].name}</Typography>
          <Typography variant="body1" color="secondary">{currentConversation.users[0].location}</Typography>
        </CurrentConversationUserInfo>

        <IconButton>
          <SettingsIcon/>
        </IconButton>
      </CurrentConversationDetails>

      <MessagesSection>
        {currentConversation.messages.length === 0 && (
          <React.Fragment>
            <Typography variant="h3" color="secondary" component="p" style={{ textAlign: 'center' }}>
              No Messages
            </Typography>
            <Typography variant="h4" color="secondary" component="p" style={{textAlign: 'center'}}>
              Say hello!
            </Typography>
          </React.Fragment>

        )}
        {currentConversation.messages.map((message, index) => (
          <MessageItem key={index} sent={message.sender !== 0}>
            {message.sender === 0 && (
              <Avatar className={classes.userPictureSmall}>
                {currentConversation.user.avatar || currentConversation.user.name.split('')[0]}
              </Avatar>
            )}
            <MessageBubble>
              <Typography variant="body2">{message.content}</Typography>
            </MessageBubble>
          </MessageItem>
        ))}
      </MessagesSection>
      <MessageInput>
        <InputBase classes={{ root: classes.sendMessageInput }}
                   placeholder="Type your message"
                   value={outboundMessage}
                   onChange={(event) => setOutboundMessage(event.target.value)}
        />
        {props.desktop
          ? <Button variant="contained" color="primary" disabled={!outboundMessage}>Submit</Button>
          : <IconButton color="primary" disabled={!outboundMessage}>
            <SendIcon/>
          </IconButton>
        }
      </MessageInput>
    </ConversationGrid>
  );
}