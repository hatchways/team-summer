import { styled } from '@material-ui/core/styles';

export const styles = (theme) => ({
  pageTitle: {
    marginBottom: 50
  }
});

export const Main = styled('main')({
  padding: '50px 80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
});

export const FilterContainer = styled('div')(({ theme, ...props }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',

  width: '30%',
  margin: '0 auto 70px auto',
}));
