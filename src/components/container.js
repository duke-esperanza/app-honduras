import React, { Component } from 'react';
import TodayTab from './today_tab.js';
import MissedTab from './missed_tab.js';
import FutureTab from './future_tab.js';
import  '../styles/tabs.css';
import { Grid } from '@material-ui/core';


class Container extends Component {
  render(){    
    return(
      <Grid container spacing={16}>
        <Grid item xs={4}>
          <TodayTab title="Today's Appointments" />
        </Grid>
        <Grid item xs={4}>
          <FutureTab />
        </Grid>
        <Grid item xs={4}>
          <MissedTab />
        </Grid>
      </Grid>
    );
  };
};
export default Container;
