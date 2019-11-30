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
        title: 'Urban Jungle: eco-friendly coffee shop',
        funding: 23874,
        fundingGoal: 40000,
        equality: 10,
        daysLeft: 44,
        industry: 'Entertainment',
        creator: {
          name: 'James Hampton',
          location: 'Toronto, Canada'
        }
      },
      {
        title: 'An Easy-to-use, Powerful AI Camera',
        funding: 34912,
        fundingGoal: 55000,
        equality: 10,
        daysLeft: 12,
        industry: 'Arts & Craft',
        creator: {
          name: 'Todd Biggerstaff',
          location: 'Melbourne, AU'
        }
      },
      {
        title: 'test',
        funding: 200,
        fundingGoal: 500,
        equality: 10,
        daysLeft: 10,
        industry: 'Production',
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
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
            />
          ))}
        </ExploreStyles.Grid>
      </ExploreStyles.Main>
    );
  }
}

export default withPageContext(withStyles(ExploreStyles.styles)(Explore));