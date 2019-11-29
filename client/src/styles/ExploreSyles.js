import { styled } from '@material-ui/core/styles/';

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

export const Grid = styled('div')(({ theme, ...props }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridGap: 30,
  margin: '0 auto'
}));