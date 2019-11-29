import { lighten, styled } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

export const styles = (theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(1.2)
  },
  projectDetailsContent: {
    padding: theme.spacing(5)
  },
  fundraisingBar: {
    height: 8,
    width: 250,
    borderRadius: 100,
  },
  fundraisingBarPrimary: {
    backgroundColor: theme.palette.primary.main
  },
  fundraisingBarSecondary: {
    backgroundColor: lighten(theme.palette.secondary.main, 0.8)
  },
  fundraisingEquity: {
    textAlign: 'center',
    marginBottom: 30
  }
});

export const Main = styled('main')(() => ({
  //Spacing & Page width
  padding: 40
}), { withTheme: false });

export const ProjectHeaderWrapper = styled('header')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8)
}));

export const IndustryLabel = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 100,
  padding: '5px 20px',
  marginBottom: theme.spacing(1)
}), { withTheme: true });

export const ProjectGrid = styled(Grid)(({ theme }) => ({
  display: 'grid',
  maxWidth: '100%',
  margin: '0 auto',
  gridGap: 40,

  [theme.breakpoints.up(1130)]: {
    maxWidth: '65%',
    gridTemplateColumns: '2fr 1fr'
  }
}), { withTheme: true });

export const DetailsCardAbout = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4)
}));

export const CardLine = styled('div')(({ theme }) => ({
  width: '100%',
  height: 7,
  backgroundColor: '#000000',
  marginBottom: theme.spacing(6)
}));

export const FundraisingAmounts = styled('div')(({ theme }) => ({
  // Alignment
  display: 'flex',
  justifyContent: 'center',
  // Container spacing
  padding: '0 30px 0 30px',
  marginBottom: 40,

  '& > h5:first-child': {
    marginRight: 5,
    marginTop: 0,
    fontWeight: 500
  },

  '& > h3': {
    marginTop: 5
  },

  '& > h5:nth-child(3)': {
    marginTop: 8,
    marginLeft: 5,
    marginRight: 5
  },

  '& > h5:last-child': {
    marginTop: 10
  }
}));

export const FundraisingStatContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  borderTop: `1px solid ${lighten(theme.palette.secondary.main, 0.5)}`,
  borderBottom: `1px solid ${lighten(theme.palette.secondary.main, 0.5)}`,
  marginBottom: 30
}));

export const FundraisingStat = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 25,

  '&:first-of-type': {
    borderRight: `1px solid ${lighten(theme.palette.secondary.main, 0.5)}`
  },

  '& > h4, & > p': {
    margin: 0,
    textAlign: 'center'
  }
}));

export const CreatorProfile = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 30,

  '& .MuiAvatar-root': {
    marginBottom: 5
  }
}));

export const ProjectActionButtons = styled('div')(({theme}) => ({
  display: 'grid',
  justifyItems: 'center',
  gridTemplateRows: 'repeat(2, 1fr)',
  gridGap: 10
}));