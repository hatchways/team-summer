import React, { useState } from 'react';
import { lighten, styled } from '@material-ui/core/styles';
import {
  Avatar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Menu,
  MenuItem
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

const ConversationNavigationStyles = styled('div')(({ theme }) => ({
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

const MessageInput = styled('form')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  paddingRight: 50,
  borderTop: `1px solid ${lighten(theme.palette.secondary.main, 0.7)}`
}));

const ConversationNavigation = ({ switchPanelDisplay }) => (
  <ConversationNavigationStyles onClick={() => switchPanelDisplay(0)}>
    <ChevronLeftIcon/>
    <Typography variant="h6" component="p">Back to Conversation List</Typography>
  </ConversationNavigationStyles>
);

const ConversationDetails = ({ classes, currentConversation, conversationActions }) => {
  const [showConversationActions, toggleConversationActions] = useState(null);

  return (
    <CurrentConversationDetails>
      <Avatar className={classes.userPicture} src={currentConversation.users[0].profilePic || null}>
        {!currentConversation.users[0].profilePic && currentConversation.users[0].name.split('')[0]}
      </Avatar>
      <CurrentConversationUserInfo>
        <Typography variant="h4">{currentConversation.users[0].name}</Typography>
        <Typography variant="body1" color="secondary">{currentConversation.users[0].location}</Typography>
      </CurrentConversationUserInfo>

      <IconButton onClick={(event) => toggleConversationActions(event.currentTarget)}>
        <SettingsIcon/>
      </IconButton>
      <Menu
        id={`conversation-${currentConversation._id}-details-menu`}
        anchorEl={showConversationActions}
        keepMounted
        open={Boolean(showConversationActions)}
        onClose={() => toggleConversationActions(null)}
      >
        {conversationActions.map((action, index) => (
          <MenuItem key={`${action.label}-${index}`} onClick={action.callback}>{action.label}</MenuItem>
        ))}
      </Menu>
    </CurrentConversationDetails>
  );
};

const Chat = ({ classes, currentConversation, chatWindowRef, userDetails }) => (
  <MessagesSection ref={chatWindowRef}>
    {/* No Messages */}
    {currentConversation.messages.length === 0 && (
      <React.Fragment>
        <Typography variant="h3" color="secondary" component="p" style={{ textAlign: 'center' }}>
          No Messages
        </Typography>
        <Typography variant="h4" color="secondary" component="p" style={{ textAlign: 'center' }}>
          Say hello!
        </Typography>
      </React.Fragment>

    )}

    {/* Message line */}
    {currentConversation.messages.map((message, index) => (
      <MessageItem key={index} sent={message.sender === userDetails.id}>
        {message.sender !== userDetails.id && (
          <Avatar className={classes.userPictureSmall} src={currentConversation.users[0].profilePic || null}>
            {!currentConversation.users[0].profilePic && currentConversation.users[0].name.split('')[0]}
          </Avatar>
        )}
        <MessageBubble>
          <Typography variant="body2">{message.content}</Typography>
        </MessageBubble>
      </MessageItem>
    ))}
  </MessagesSection>
);

const NewMessageInput = ({ classes, sendMessage, currentConversation, outboundMessage, setOutboundMessage, desktop }) => (
  <MessageInput onSubmit={sendMessage(currentConversation.users[0]._id, currentConversation._id)}>
    <InputBase classes={{ root: classes.sendMessageInput }}
               placeholder="Type your message"
               value={outboundMessage}
               onChange={(event) => setOutboundMessage(event.target.value)}
    />
    {desktop
      ? <Button variant="contained" color="primary" disabled={!outboundMessage}
                onClick={sendMessage(currentConversation.users[0]._id, currentConversation._id)}>
        Submit</Button>
      : <IconButton color="primary" type="submit" disabled={!outboundMessage}>
        <SendIcon/>
      </IconButton>
    }
  </MessageInput>
);

export default (props) => {
  const { classes } = props;
  const [outboundMessage, setOutboundMessage] = useState('');

  const currentConversation = props.conversations.find((conversation) => conversation.id === props.activeConversation);

  if (!currentConversation) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h3" color="secondary" component="p">No current conversation</Typography>
    </div>
  );

  const sendMessage = (receiver, conversation) => (event) => {
    event.preventDefault();
    props.socket.emit('sendMessage', {
        sender: props.userDetails.id,
        receiver,
        conversation,
        content: outboundMessage
      },
      { token: localStorage.getItem('jwtToken') });

    props.handleSetMessage(conversation, props.userDetails.id, outboundMessage);
    setOutboundMessage('');
  };

  const conversationActions = [
    {label: 'Delete', callback: () => props.removeConversation(currentConversation._id)}
  ];

  const commonProps = {
    classes,
    currentConversation,
    desktop: props.desktop
  };

  return (
    <ConversationGrid>
      {!props.desktop && (
        <ConversationNavigation switchPanelDisplay={props.switchPanelDisplay}/>
      )}

      <ConversationDetails currentConversation={currentConversation}
                           conversationActions={conversationActions} {...commonProps} />

      <Chat
        chatWindowRef={props.chatWindowRef}
        userDetails={props.userDetails}
        {...commonProps}
      />

      <NewMessageInput outboundMessage={outboundMessage}
                       setOutboundMessage={setOutboundMessage}
                       sendMessage={sendMessage}
                       {...commonProps}
      />
    </ConversationGrid>
  );
}