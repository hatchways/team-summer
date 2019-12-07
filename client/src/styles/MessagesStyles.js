import React from 'react';
import { lighten, styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const avatarSize = 60;

export const styles = (theme) => ({
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
  userCardName: {
    marginBottom: 2,
    wordWrap: 'break-word',
    fontWeight: 600
  },
  messagePreview: {
    width: '50%'
  }
});

export const Main = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(100px, 0.8fr) minmax(100px, 1.2fr)',
  height: 'calc(100vh - 74px)'
}));

// Conversation List section
export const ConversationListPanel = styled(Paper)(({ theme }) => ({
  padding: 60,

  [theme.breakpoints.up('lg')]: {
    paddingLeft: '25%'
  }
}));

export const ConversationList = styled('div')(({ theme }) => ({
  maxHeight: 450,
  overflow: 'auto',
  padding: 5
}));

export const NewCount = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 100,

  width: 39,
  height: 25,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

export const UserConversationCard = styled(({ active, ...props }) => <Card {...props}/>)(({ theme, ...props }) => ({
  display: 'flex',
  alignItems: 'center',

  border: props.active ? `2px solid ${theme.palette.primary.main}` : '2px solid #ffffff',

  marginBottom: 10,
  padding: '30px 20px',

  '&:last-of-type': {
    marginBottom: 0
  }
}));

// Message Section

export const CurrentConversation = styled('div')(({theme}) => ({

}));

export const CurrentConversationDetails = styled('div')(({theme}) => ({
  display: 'flex',
  padding: '25px 35px',
  borderBottom: `1px solid ${lighten(theme.palette.secondary.main, 0.7)}`
}));

export const CurrentConversationUserInfo = styled('div')(({theme}) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',

  '& h4, & p': {
    margin: 0
  }
}));