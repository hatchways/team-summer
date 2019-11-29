import React from 'react';
import { LinearProgress, styled, Typography, withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {withPageContext} from './pageContext';
import SvgSmallSpeechBubble from './SvgSmallSpeechBubble';

const styles = (theme) => ({
  fundraisingBar: {
    height: 8,
    width: 250,
    borderRadius: 100
  },
  fundraisingBarPrimary: {
    backgroundColor: theme.palette.primary.main
  },
  fundraisingBarSecondary: {
    backgroundColor: lighten(theme.palette.secondary.main, 0.8)
  }
});

const ComponentContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '250px',
  margin: '0 auto 30px auto'
}));

const LabelContainer = styled('div')(({ theme, ...props }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  left: `${Math.min((props.percent - 8), 100)}%`
}));

const Label = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  left: 8,
  color: '#ffffff',
  fontSize: '0.7em'
}));

const PercentageProgressBar = ({ value, className, classes }) => {
  return (
    <ComponentContainer className={className}>
      <LabelContainer percent={value}>
        <Label variant="subtitle1">
          {value}%
        </Label>
        <SvgSmallSpeechBubble/>
      </LabelContainer>

      <LinearProgress variant="determinate" value={value}
                      className={classes.fundraisingBar}
                      classes={{
                        root: classes.fundraisingBarSecondary,
                        bar: classes.fundraisingBarPrimary
                      }}/>

    </ComponentContainer>
  );
};

PercentageProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  className:PropTypes.object
};

export default withPageContext(withStyles(styles)(PercentageProgressBar));