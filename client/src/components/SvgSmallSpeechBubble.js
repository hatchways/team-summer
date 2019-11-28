import React from 'react';
import PropTypes from 'prop-types';

const SvgSmallSpeechBubble = (props) => (
  <svg width={props.width || 40} height={props.height || 24} fill="none" {...props}>
    <rect y={0.45} width={props.width || 40} height={(props.height - 4) || 20} rx={10} fill={props.color || '#000000'}/>
    <path fill={props.color || '#000000'} d="M20.5 14l4.95 4.95-4.95 4.95-4.95-4.95z"/>
  </svg>
);

SvgSmallSpeechBubble.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
};

export default SvgSmallSpeechBubble