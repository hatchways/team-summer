import { CircularProgress } from '@material-ui/core';
import React from 'react';

export default () => (
  <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
    <CircularProgress size={50}/>
  </div>
)