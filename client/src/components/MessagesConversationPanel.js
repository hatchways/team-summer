import React from 'react';
import { Avatar, Grid, styled, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

const ConversationListPanel = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: 'calc(100% - 120px)',
  padding: 60,

  [theme.breakpoints.up('lg')]: {
    paddingLeft: '25%'
  }
}));

const NewCount = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 100,

  width: 39,
  height: 25,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const ConversationListStyled = styled('div')(({ theme }) => ({
  maxHeight: 460,
  width: '100%',
  overflowY: 'auto',
  padding: 5,

  [theme.breakpoints.up(416)]: {
    width: '80%'
  }
}));

const UserConversationCard = styled(({ active, ...props }) => <Card {...props}/>)(({ theme, ...props }) => ({
  display: 'flex',
  alignItems: 'center',

  cursor: 'pointer',
  border: props.active ? `2px solid ${theme.palette.primary.main}` : '2px solid #ffffff',

  marginBottom: 10,
  padding: '30px 20px',

  '&:last-of-type': {
    marginBottom: 0
  },

  '& .conversation-user-picture': {
    width: 60,
    height: 60,
    marginRight: 15
  }
}));

const getLastMessageByUser = (conversation, userId) => {
  const message = conversation.messages.find((message) => message.sender === userId);

  return message ? message.content : null
};

const ConversationList = ({ conversations, classes, activeConversation, switchPanelDisplay }) => {
  return (
    <ConversationListStyled>
      {conversations.length === 0 && (
        <Typography variant="h6" color="secondary" component="p" style={{ textAlign: 'center' }}>
          No conversations
        </Typography>
      )}
      {conversations.map((conversation, index) => (
        <UserConversationCard
          key={index}
          active={conversation._id === activeConversation}
          elevation={2}
          onClick={() => switchPanelDisplay(conversation._id)}
        >

          <Avatar className="conversation-user-picture" src={conversation.users[0].profilePic || null}>
            {!conversation.users[0].profilePic && conversation.users[0].name.split('')[0]}
          </Avatar>
          <Grid container direction="column">
            <Typography variant="h5" component="p"
                        className={classes.userCardName}>{conversation.users[0].name}</Typography>
            <Typography variant="body1"
                        display="inline"
                        noWrap
                        color="secondary"
                        className={classes.messagePreview}>
              {getLastMessageByUser(conversation, conversation.users[0]._id)}
            </Typography>
          </Grid>

        </UserConversationCard>
      ))}
    </ConversationListStyled>
  );
};

export default (props) => {
  const { classes } = props;

  return (
    <ConversationListPanel elevation={5}>

      <Grid container alignItems="center" className={classes.conversationListHeader}>
        <Typography variant="h4" component="h3" className={classes.userListHeader}>Messages</Typography>
        <NewCount>
          <Typography variant="h6" component="p">2</Typography>
        </NewCount>
      </Grid>

      <ConversationList {...props}/>
    </ConversationListPanel>
  );
}