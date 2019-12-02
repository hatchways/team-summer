import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import * as ExploreStyles from '../styles/ExploreSyles';
import ProjectCard from '../components/ProjectCard';
import Loading from '../components/Loading';
import { withPageContext } from '../components/pageContext';
import { OutlinedSelect } from '../components/Inputs';
import { getUserProjects } from '../api/projects';
import ProjectGrid from '../components/ProjectGrid';

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
    locationSelect: 'Everywhere',
    loading: true
  };

  async componentDidMount() {
    const getProjects = await getUserProjects(this.props.userDetails.id);
    const projects = getProjects.data;

    this.setState({ projects }, () => {
      setTimeout(() => this.setState({loading: false}), 500)
    });
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

  renderGrid() {
    const filteredPosts = this.projectFilter();

    if (this.state.loading) return <Loading />;

    return (
      <ProjectGrid>
          {filteredPosts.map(({_id: id, ...project}, index) => (
            <ProjectCard
              key={index}
              onClick={() => this.props.history.push(`/projects/${id}`)}
              creator={{
                name: project.user.name,
                location: project.location
              }}
              title={project.title}
              image={project.images[0]}
              funding={project.funding.fundingTotal}
              fundingGoal={project.fundingGoal}
              industry={project.industry}
              daysLeft={parseInt(moment(project.fundingDeadline).fromNow().split(' ')[1])}
            />
          ))}

        </ProjectGrid>
    )
  }

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

        {(!this.state.loading && filteredPosts.length === 0) && (
          <Typography variant="h4" component="p" color="secondary" style={{ textAlign: 'center' }}>
            No Projects found
          </Typography>
        )}

        {/* Project Grid */}
        {this.renderGrid()}
      </ExploreStyles.Main>
    );
  }
}

export default withPageContext(withStyles(ExploreStyles.styles)(Explore));