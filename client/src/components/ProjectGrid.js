import { styled } from '@material-ui/core/styles';

export default styled('div')(({ theme, ...props }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridGap: 30,
  margin: '0 auto'
}));