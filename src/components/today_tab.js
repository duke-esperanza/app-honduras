import React, { Component } from 'react';
import Columns from 'react-columns';
import  style from '../styles/tabs.css';
//import { Panel } from 'react-bootstrap';
import Patient from './patient_list_item';
import TodayAppointment from './todayAppointment';
import { Paper, Typography, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import factory from '../backend/appointmentFactory';



class TodayTab extends Component{
  constructor(props){
    super(props);

    this.state = {
      title: props.title,
      appointments: [],
    }
  }

  componentWillMount() {
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: "keybQixDhiGoMKCTi"}).base('appuPqYIxCcvESuzm');
    var appointmentData = [];
    var count = 0;
    base('Appointments').select({
      filterByFormula: 'IS_SAME(TODAY(), date, "day")'
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          appointmentData[count] = record.fields;
          count++;
        });
        fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
      this.setState({
        appointments: appointmentData
      })
    }.bind(this));
  }

  render(){
    const content = this.state.appointments.map((someData) =>
      <div key={someData.ID}>
        <TodayAppointment first={someData.first_name} last={someData.last_name} time={someData.appointment_time} phone={someData.phone}/>
      </div>
    )
    return(
      <div>
        <Paper className='title' elevation={2}>
          <Typography className='title' variant='h4'>
            <strong>
              {this.state.title}
            </strong>
          </Typography>
        </Paper>
        <Paper className='tab' elevation={3}>
          <div>
            {content}
          </div>
        </Paper>
      </div>

    );
  };
};
export default TodayTab;