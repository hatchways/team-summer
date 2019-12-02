import { styled } from '@material-ui/core/styles';

export const styles = (theme) => ({
  pageTitle: {
    marginBottom: 50
  }
});

export const Main = styled('main')(({theme}) => ({
  padding: '50px 30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  [theme.breakpoints.up('md')]: {
    padding: '50px 80px'
  }
}));

export const FilterContainer = styled('div')(({ theme, ...props }) => ({
  margin: '0 auto 30px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '& .MuiInputBase-root': {
    marginBottom: 20,
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: 'unset'
    },
  },

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
    margin: '0 auto 70px auto',
  }
}));
