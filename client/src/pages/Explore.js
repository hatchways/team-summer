import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import * as ExploreStyles from '../styles/ExploreSyles';
import ProjectCard from '../components/projectCard';
import { withPageContext } from '../components/pageContext';
import { OutlinedSelect } from '../components/Inputs';


class Explore extends React.Component {
  state = {
    projects: [
      {
        title: 'Urban Jungle: eco-friendly coffee shop',
        funding: 23874,
        fundingGoal: 40000,
        equality: 10,
        daysLeft: 44,
        industry: 'Marketing',
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
        industry: 'Art',
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
        industry: 'Technology',
        creator: {
          name: 'Zack Newman',
          location: 'London, UK'
        }
      }
    ],
    industries: [
      'All Industries',
      'Technology',
      'Marketing',
      'Engineering',
      'Art',
      'Film'
    ],
    locations: [
      'Everywhere',
      'New York',
      'California',
      'Georgia',
      'Florida'
    ],
    industrySelect: 'all',
    locationSelect: 'Everywhere'
  };

  handleFilterSelects = (event) => {
    const { target: { name, value } } = event;

    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    const { projects, industries, locations, industrySelect, locationSelect } = this.state;

    return (
      <ExploreStyles.Main>
        <Typography variant="h2" className={classes.pageTitle}>Explore Projects</Typography>
        <ExploreStyles.FilterContainer>
          <OutlinedSelect
            labelText="Industry"
            selectName="industrySelect"
            selectId="industrySelect"
            value={industrySelect}
            setState={this.handleFilterSelects}
          >
            {industries.map((industry, index) => (
              <option key={index} value={industry}>{industry}</option>
            ))}
          </OutlinedSelect>

          <OutlinedSelect
            labelText="Location"
            selectName="locationSelect"
            selectId="locationSelect"
            value={locationSelect}
            setState={this.handleFilterSelects}
          >
            {locations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </OutlinedSelect>
        </ExploreStyles.FilterContainer>
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