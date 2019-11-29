import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as ExploreStyles from '../styles/ExploreSyles';
import ProjectCard from '../components/projectCard';
import { withPageContext } from '../components/pageContext';


class Explore extends React.Component {
  state = {
    projects: [
      {
        name: 'Urban Jungle: eco-friendly coffee shop',
        funding: 23874,
        goal: 40000,
        equality: 10,
        daysLeft: 44,
        creator: {
          name: 'James Hampton',
          location: 'Toronto, Canada'
        }
      },
      {
        name: 'An Easy-to-use, Powerful AI Camera',
        funding: 34912,
        goal: 55000,
        equality: 10,
        daysLeft: 12,
        creator: {
          name: 'Todd Biggerstaff',
          location: 'Melbourne, AU'
        }
      },
      { name: 'test',
        funding: 200,
        goal: 500,
        equality: 10,
        daysLeft: 10,
        creator: {
          name: 'Zack Newman',
          location: 'London, UK'
        }
      },
      { name: 'test2',
        funding: 200,
        goal: 500,
        equality: 10,
        daysLeft: 300,
        creator: {
          name: 'Zack Newman',
          location: 'London, UK'
        }
      }
    ]
  };

  render() {
    const { classes } = this.props;
    const { projects } = this.state;

    return (
      <ExploreStyles.Main>
        <Typography variant="h2" className={classes.pageTitle}>Explore Projects</Typography>
        <ExploreStyles.Grid>
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              {...project}
            />
          ))}
        </ExploreStyles.Grid>
      </ExploreStyles.Main>
    );
  }
}

export default withPageContext(withStyles(ExploreStyles.styles)(Explore));