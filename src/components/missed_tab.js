import React, { Component } from 'react';
import '../styles/tabs.css';
import { Paper} from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

class MissedTab extends Component{

  constructor(props){
    super(props);

    this.state = {
      dates: [],
      appointments: []
    }
  }

  componentWillMount() {
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);
    var appointmentData = [];
    base('Appointments').select({
      filterByFormula: 'AND(status = 4, IS_BEFORE(date, TODAY()))',
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
          appointmentData.push(record.fields);
        });
        fetchNextPage();
    }, function done(err) {
      if (err) { console.error(err); return; }
      this.setState({
        appointments: appointmentData
      })
    }.bind(this));
  }

  componentNameMap = (list, nameList) => {
    var map = {};
    for(var i = 0; i < list.length; i++){
      var name = list[i].first_name;
      if(!map[name]){
        map[name] = [];
        nameList.push(name);
      }
      map[name].push(list[i]);
    }
    return map;
  }

  render(){
    var nameList = [];
    var dict = this.componentNameMap(this.state.appointments, nameList);
    return(
      <div>
        <Paper className='title' elevation={2}>
          <Typography className='title' variant='h4'>
            <strong>
              Missed Appointments
            </strong>
          </Typography>
        </Paper>
        <Paper className='tab' elevation= {3}>
          <List subheader={<li />}>
            {nameList.map(name => (
              <li key={name} className='listSection'>
                <ListSubheader><Typography variant='h6'>{name}</Typography></ListSubheader>
                {dict[name].map(appt => (
                  <ListItem key={appt.date}>
                    <ListItemText primary={<Typography variant='h5'>Date: {appt.date}</Typography>} />
                  </ListItem>
                ))}
              </li>
            ))}
          </List>
        </Paper>
      </div>

    );
  };
};
export default MissedTab;
