import React, { useState } from 'react';
import { styled, useMediaQuery } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import MessagesConversationPanel from '../components/MessagesConversationPanel';
import MessagesChatPanel from '../components/MessagesChatPanel';
import { withPageContext } from '../components/pageContext';

const avatarSize = 60;

const styles = (theme) => ({
  conversationListHeader: {
    marginBottom: 30
  },
  userListHeader: {
    marginRight: 10
  },
  userPicture: {
    width: avatarSize,
    height: avatarSize,
    marginRight: 15
  },
  userPictureSmall: {
    width: avatarSize - 10,
    height: avatarSize - 10,
    marginRight: 15
  },
  userCardName: {
    marginBottom: 2,
    wordWrap: 'break-word',
    fontWeight: 600
  },
  messagePreview: {
    width: '50%'
  },
  sendMessageInput: {
    padding: 30,
    flexGrow: 1
  }
});

const Main = styled('div')(({ theme }) => ({
  display: 'grid',
  height: 'calc(100vh - 74px)',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(100px, 0.8fr) minmax(100px, 1.2fr)'
  }
}));

const Messages = (props) => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [showChatPanel, toggleChatPanel] = useState(true);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: {
        name: 'Evan',
        avatar: null,
        location: 'California'
      },
      messages: [
        {
          sender: 0,
          content: 'This is a test message!'
        },
        {
          sender: 0,
          content: 'Test response'
        },
        {
          sender: 1,
          content: 'Test response'
        },
        {
          sender: 0,
          content: 'Test response'
        },
        {
          sender: 1,
          content: 'Test response'
        },
        {
          sender: 0,
          content: 'Test response'
        },
      ]
    },
    {
      id: 2,
      user: {
        name: 'Kevin',
        avatar: null,
        location: 'New York'
      },
      messages: [
        {
          sender: 0,
          content: 'This is a test message!'
        },
        {
          sender: 1,
          content: 'Test response'
        }
      ]
    }
  ]);

  const desktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  // onSubmit = (event) => {
  //   const { socket } = this.props;
  //
  //   socket.emit('message', {
  //     id: this.props.userDetails.id,
  //     message: this.state.message
  //   }, { token: localStorage.getItem('jwtToken') });
  // };

  const switchPanelDisplay = (conversationId) => {
    toggleChatPanel(!showChatPanel);
    setActiveConversation(conversationId);
  };

  const renderPageComponents = () => {
    const conversationProps = {
      conversations,
      activeConversation,
      switchPanelDisplay,
      ...props
    };

    const chatProps = {
      conversations,
      activeConversation,
      desktop,
      switchPanelDisplay,
      ...props
    };

    if (desktop) {
      return (
        <React.Fragment>
          <MessagesConversationPanel {...conversationProps}/>
          <MessagesChatPanel {...chatProps} />
        </React.Fragment>
      );
    } else {
      if (showChatPanel) return <MessagesChatPanel {...chatProps} />;

      return <MessagesConversationPanel {...conversationProps}/>;
    }
  };

  return (
    <Main>
      {renderPageComponents()}
    </Main>
  );
};

export default withPageContext(withStyles(styles)(Messages));