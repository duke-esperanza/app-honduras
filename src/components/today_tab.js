import React, { Component } from 'react';
import '../styles/tabs.css';
import TodayAppointment from './todayAppointment';
import { Paper, Typography} from '@material-ui/core';



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
    console.log(process.env.REACT_APP_AIRTABLE_KEY);
    console.log(process.env.REACT_APP_AIRTABLE_BASE);
    
    var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);
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
