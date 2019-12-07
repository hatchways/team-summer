import React from 'react';
import { Typography, Grid, Avatar, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import * as MessageStyles from '../styles/MessagesStyles';
import { withPageContext } from '../components/pageContext';
import withStyles from '@material-ui/core/styles/withStyles';

class Messages extends React.Component {
  state = {
    message: '',
    receivedMessage: '',
    activeConversation: 0,
    conversations: [
      {
        id: 0,
        user: {
          name: 'Evan',
          avatar: null,
          location: 'California'
        },
        active: true
      },
      {
        id: 1,
        user: {
          name: 'Kevin',
          avatar: null,
          location: 'New York'
        },
        active: false
      }
    ]
  };

  onSubmit = (event) => {
    const { socket } = this.props;

    socket.emit('message', {
      id: this.props.userDetails.id,
      message: this.state.message
    }, { token: localStorage.getItem('jwtToken') });
  };

  renderConversationList() {
    const { classes } = this.props;

    return (
      <MessageStyles.ConversationList>
        {this.state.conversations.map((conversation, index) => (
          <MessageStyles.UserConversationCard key={index} active={conversation.active} elevation={2}>
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
          </MessageStyles.UserConversationCard>
        ))}
      </MessageStyles.ConversationList>
    );
  }

  renderConversationPanel() {
    const { classes } = this.props;

    return (
      <MessageStyles.ConversationListPanel elevation={5}>

        <Grid container alignItems="center" className={classes.conversationListHeader}>
          <Typography variant="h4" component="h3" className={classes.userListHeader}>Messages</Typography>
          <MessageStyles.NewCount>
            <Typography variant="h6" component="p">2</Typography>
          </MessageStyles.NewCount>
        </Grid>

        {this.renderConversationList()}
      </MessageStyles.ConversationListPanel>
    );
  }

  renderMessageSection() {
    const { classes } = this.props;
    const { conversations, activeConversation } = this.state;

    const currentConversation = conversations.find((conversation) => conversation.id === activeConversation);

    return (
      <MessageStyles.CurrentConversation>
        <MessageStyles.CurrentConversationDetails>
          <Avatar className={classes.userPicture}>
            {currentConversation.user.avatar || currentConversation.user.name.split('')[0]}
          </Avatar>
          <MessageStyles.CurrentConversationUserInfo>
            <Typography variant="h4">{currentConversation.user.name}</Typography>
            <Typography variant="body1" color="secondary">{currentConversation.user.location}</Typography>
          </MessageStyles.CurrentConversationUserInfo>
          <IconButton>
            <SettingsIcon/>
          </IconButton>
        </MessageStyles.CurrentConversationDetails>
      </MessageStyles.CurrentConversation>
    );
  };

  render() {
    return (
      <MessageStyles.Main>
        {this.renderConversationPanel()}
        {this.renderMessageSection()}
      </MessageStyles.Main>
    );
  }
}

export default withPageContext(withStyles(MessageStyles.styles)(Messages));