import React from 'react';
import { Avatar, Grid, styled, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

const ConversationListPanel = styled(Paper)(({ theme }) => ({
  padding: 60,

  [theme.breakpoints.up('lg')]: {
    paddingLeft: '25%'
  }
}));

const ConversationListStyled = styled('div')(({ theme }) => ({
  maxHeight: 'calc(100vh - 74px)',
  overflowY: 'scroll',
  padding: 5
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

const UserConversationCard = styled(({ active, ...props }) => <Card {...props}/>)(({ theme, ...props }) => ({
  display: 'flex',
  alignItems: 'center',

  cursor: 'pointer',
  border: props.active ? `2px solid ${theme.palette.primary.main}` : '2px solid #ffffff',

  marginBottom: 10,
  padding: '30px 20px',

  '&:last-of-type': {
    marginBottom: 0
  }
}));

const ConversationList = ({ conversations, classes, activeConversation, switchPanelDisplay }) => {
  return (
    <ConversationListStyled>
      {conversations.map((conversation, index) => (
        <UserConversationCard
          key={index}
          active={conversation.id === activeConversation}
          elevation={2}
          onClick={() => switchPanelDisplay(conversation.id)}
        >

          <Avatar className={classes.userPicture}>
            {conversation.user.avatar || conversation.user.name.split('')[0]}
          </Avatar>
          <Grid container direction="column">
            <Typography variant="h5" component="p"
                        className={classes.userCardName}>{conversation.user.name}</Typography>
            <Typography variant="body1"
                        display="inline"
                        noWrap
                        color="secondary"
                        className={classes.messagePreview}>
              {'Hello! This is my last message'}
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