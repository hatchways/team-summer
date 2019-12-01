import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import * as ExploreStyles from '../styles/ExploreSyles';
import ProjectCard from '../components/ProjectCard';
import { withPageContext } from '../components/pageContext';
import { OutlinedSelect } from '../components/Inputs';
import { getUserProjects } from '../api/projects';

// Placeholder projects = {
// {
//         title: 'Urban Jungle: eco-friendly coffee shop',
//         funding: 23874,
//         fundingGoal: 40000,
//         equality: 10,
//         daysLeft: 44,
//         industry: 'Technology',
//         creator: {
//           name: 'James Hampton',
//           location: 'Toronto, Canada'
//         }
//       },
//       {
//         title: 'An Easy-to-use, Powerful AI Camera',
//         funding: 34912,
//         fundingGoal: 55000,
//         equality: 10,
//         daysLeft: 12,
//         industry: 'Art',
//         creator: {
//           name: 'Todd Biggerstaff',
//           location: 'California, USA'
//         }
//       },
//       {
//         title: 'test',
//         funding: 200,
//         fundingGoal: 500,
//         equality: 10,
//         daysLeft: 10,
//         industry: 'Technology',
//         creator: {
//           name: 'Zack Newman',
//           location: 'California, USA'
//         }
//       }}

class Explore extends React.Component {
  state = {
    projects: [],
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
    industrySelect: 'All Industries',
    locationSelect: 'Everywhere'
  };

  async componentDidMount() {
    const getProjects = await getUserProjects(this.props.userDetails.id);
    const projects = getProjects.data;

    this.setState({ projects });
  }

  handleFilterSelects = (event) => {
    const { target: { name, value } } = event;

    this.setState({ [name]: value });
  };

  projectFilter = () => {
    const { industrySelect, locationSelect } = this.state;

    return this.state.projects.filter((project) => {
      const industryCondition = project.industry === industrySelect;
      const locationCondition = project.location.includes(locationSelect);

      if (industrySelect !== 'All Industries' && locationSelect !== 'Everywhere') {
        return industryCondition && locationCondition;
      }

      if (industrySelect !== 'All Industries') return industryCondition;

      if (locationSelect !== 'Everywhere') return locationCondition;

      return project;
    });
  };

  render() {
    const { classes } = this.props;
    const { industries, locations, industrySelect, locationSelect } = this.state;

    const filteredPosts = this.projectFilter();

    return (
      <ExploreStyles.Main>
        <Typography variant="h2" className={classes.pageTitle}>Explore Projects</Typography>
        {/* Filtering Projects */}
        <ExploreStyles.FilterContainer>
          {/* Industry Filter */}
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

          {/* Location filter*/}
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

        {filteredPosts.length === 0 && (
          <Typography variant="h4" component="p" color="secondary" style={{ textAlign: 'center' }}>
            No Projects found
          </Typography>
        )}

        {/* Project Grid */}
        <ExploreStyles.Grid>
          {filteredPosts.map(({_id: id, ...project}, index) => (
            <ProjectCard
              key={index}
              onClick={() => this.props.history.push(`/projects/${id}`)}
              creator={{
                name: project.user.name,
                location: project.location
              }}
              title={project.title}
              funding={project.funding.fundingTotal}
              fundingGoal={project.fundingGoal}
              industry={project.industry}
              daysLeft={parseInt(moment(project.fundingDeadline).fromNow().split(' ')[1])}
            />
          ))}

        </ExploreStyles.Grid>
      </ExploreStyles.Main>
    );
  }
}

export default withPageContext(withStyles(ExploreStyles.styles)(Explore));