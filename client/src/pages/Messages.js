import React from 'react';
import { styled, useMediaQuery } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect } from 'react-router-dom';

import MessagesConversationPanel from '../components/MessagesConversationPanel';
import MessagesChatPanel from '../components/MessagesChatPanel';
import { withPageContext } from '../components/pageContext';
import { getConversations } from '../api/messages';

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

// Placeholder Conversations
/*
* {
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
*
* */

class Messages extends React.Component {
  state = {
    activeConversation: 0,
    showChatPanel: false,
    conversations: []
  };

  async componentDidMount() {
    if (!this.props.userDetails.id) {
      this.props.activateToast('Please Log in to view messages', 'error');
      return this.props.history.push('/login');
    }

    const response = await getConversations(this.props.userDetails.id);
    this.setState({ conversations: response.data });
  }

  // onSubmit = (event) => {
  //   const { socket } = this.props;
  //
  //   socket.emit('message', {
  //     id: this.props.userDetails.id,
  //     message: this.state.message
  //   }, { token: localStorage.getItem('jwtToken') });
  // };

  switchPanelDisplay = (conversationId) => {
    this.setState({
      showChatPanel: !this.state.showChatPanel,
      activeConversation: conversationId
    });
  };

  renderPageComponents = () => {
    const componentProps = {
      conversations: this.state.conversations,
      activeConversation: this.activeConversation,
      switchPanelDisplay: this.switchPanelDisplay,
      desktop: this.props.desktop,
      ...this.props
    };

    if (this.props.desktop) {
      return (
        <React.Fragment>
          <MessagesConversationPanel {...componentProps}/>
          <MessagesChatPanel {...componentProps} />
        </React.Fragment>
      );
    } else {
      if (this.state.showChatPanel) return <MessagesChatPanel {...componentProps} />;

      return <MessagesConversationPanel {...componentProps}/>;
    }
  };

  render() {
    return (
      <Main>
        {this.renderPageComponents()}
      </Main>
    );
  }
}

const withMediaQuery = Component => props => {
  const mediaQuery = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return <Component desktop={mediaQuery} {...props} />;
};

export default withPageContext(withStyles(styles)(withMediaQuery(Messages)));