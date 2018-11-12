import React, { Component } from 'react';
import Tab from './appointmenttabs.js';
import TodayTab from './today_tab.js';
import MissedTab from './missed_tab.js';
import FutureTab from './future_tab.js';
import  style from '../styles/tabs.css';
import { Grid } from '@material-ui/core';
import factory from '../backend/appointmentFactory';

const appFact = factory.getInstance();

class Container extends Component {
  constructor(props){
    super(props);

    this.state = {
      appt: appFact.names,
    }
  }

  render(){
    if(this.state.appt === null){
      this.setState({appt: appFact.names});
    }
    return(
      <Grid container spacing={16}>
        <Grid item xs={4}>
          <TodayTab title="Today's Appointments" appointments={this.state.appt}/>
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
