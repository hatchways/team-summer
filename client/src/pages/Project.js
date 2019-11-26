import React from 'react';
import { Typography, styled, withStyles, Grid } from '@material-ui/core';

const styles = (theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(1.2)
  }
});

const Main = styled('main')(() => ({
  // Alignment
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  //Spacing & Page width
  margin: '0 auto',
  padding: 40
}), { withTheme: false });

const ProjectHeader = styled('header')(() => ({
  textAlign: 'center',

  '& > h2': {
    marginBottom: 15
  }
}), { withTheme: false });

const IndustryLabel = styled('div')(({theme}) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 100,
  padding: '5px 20px',
  marginBottom: theme.spacing(1)
}), {withTheme: true});

class Project extends React.Component {
  state = {
    title: 'Urban Jungle: eco-friendly coffee shop',
    subtitle: 'Fresh Coffee. Community. All rolled into one cup.',
    industry: 'Food and Craft'
  };

  render() {
    const { classes } = this.props;
    const { title, subtitle, industry } = this.state;

    return (
      <Main>
        <ProjectHeader>
          <Grid container direction="column" alignItems="center">
            <IndustryLabel>
              <Typography variant="h6">{industry}</Typography>
            </IndustryLabel>
            <Typography variant="h2" className={classes.pageTitle}>{title}</Typography>
            <Typography variant="subtitle2">{subtitle}</Typography>
          </Grid>
        </ProjectHeader>
      </Main>
    );
  }
}

export default withStyles(styles)(Project);
