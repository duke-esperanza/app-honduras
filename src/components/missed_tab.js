import React, { Component } from 'react';
import Columns from 'react-columns';
import  style from '../styles/tabs.css';
//import { Panel } from 'react-bootstrap';
import Patient from './patient_list_item';
import { Paper, Grid } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    var base = new Airtable({apiKey: "keybQixDhiGoMKCTi"}).base('appuPqYIxCcvESuzm');
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
                <ListSubheader>{name}</ListSubheader>
                {dict[name].map(appt => (
                  <ListItem key={appt.date}>
                    <ListItemText primary={appt.date} />
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
