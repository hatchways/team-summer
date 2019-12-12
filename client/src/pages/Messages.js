import React from 'react';
import { styled, useMediaQuery } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import MessagesConversationPanel from 'components/MessagesConversationPanel';
import MessagesChatPanel from 'components/MessagesChatPanel';
import { withPageContext } from 'components/pageContext';
import { getConversations } from 'api/messages';

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
  height: 'calc(100vh - 74px)',

  [theme.breakpoints.up('md')]: {
    display: 'grid',
    gridTemplateColumns: 'minmax(100px, 0.8fr) minmax(100px, 1.2fr)'
  }
}));

class Messages extends React.Component {
  state = {
    activeConversation: 0,
    showChatPanel: false,
    conversations: []
  };
  chatWindowRef = React.createRef();

  scrollChatToBottom = () => {
    if (this.state.conversations.length > 0 &&
      (this.state.desktop || (!this.props.desktop && this.state.showChatPanel))) {
      const chatWindow = this.chatWindowRef.current;

      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  };

  handleSetMessage = (conversationId, sender, content) => {
    let conversationIndex = 0;
    let conversations = [...this.state.conversations];

    conversations.find((conversation, index) => {
      if (conversation._id === conversationId) {
        conversationIndex = index;
      }
      return conversation._id === conversationId;
    });

    conversations[conversationIndex].messages.push({ sender, content });

    this.setState({ conversations });
    this.scrollChatToBottom();
  };

  async componentDidMount() {
    if (!this.props.userDetails.id) {
      this.props.activateToast('Please Log in to view messages', 'error');
      return this.props.history.push('/login');
    }

    const response = await getConversations(this.props.userDetails.id);
    this.setState({ conversations: response.data });
    this.scrollChatToBottom();

    this.props.socket.on('newMessage', (data) => {
      this.handleSetMessage(data.conversation, data.sender, data.content);
    });
  }

  switchPanelDisplay = (conversationId) => {
    this.setState({ showChatPanel: !this.state.showChatPanel });
    this.setState({activeConversation: conversationId})
  };

  renderPageComponents = () => {
    const componentProps = {
      conversations: this.state.conversations,
      activeConversation: this.state.activeConversation,
      switchPanelDisplay: this.switchPanelDisplay,
      desktop: this.props.desktop,
      handleSetMessage: this.handleSetMessage,
      chatWindowRef: this.chatWindowRef,
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