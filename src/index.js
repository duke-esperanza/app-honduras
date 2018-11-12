import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TopBar from './components/TopBar';
import Body from './components/body';
import {HashRouter} from 'react-router-dom';
import factory from './backend/appointmentFactory';
const appfact = factory.getInstance();




class App extends Component{
  state = {
    ready : false,
    appdata: null,
    namesdata: null,
  }
  componentWillMount(){
    console.log("reading");
    var appointments = [];
    var names = new Set();
    var mrecords = [];
    //function retrieves data from the airtable an puts into appointments
    var count = 0;
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: "keyYFWbcwIfgdSCb4"}).base('appuPqYIxCcvESuzm');

    base('Appointments').select({
      //add conditions here
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function(record) {
            appointments[count] = record.fields;
            mrecords[count] = record;
            names.add( record.get("first_name") + " " + record.get("last_name"));
            count += 1;
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        // ReactDOM.render(<Page ref={(Search) => {window.Search.setAppointments(data)}} />, document.getElementById("root"));
        if (err) { console.error(err); return; }
        names = Array.from(names);
        for (var i=0; i < names.length; i++){
          names[i] = {label:names[i]};
        };
        var namez = names.map(names => ({
          value: names.label,
          label: names.label,
        }));
        appfact.setNames(namez);
        appfact.setAppointments(appointments);
        appfact.setRecords(mrecords);
        this.setState({ready : true, appdata : appointments, namesdata : namez});
    }.bind(this));
  }
  render(){
      return(
        <div>
          <TopBar/>
          <Body/>
        </div>
      );
  }
}





ReactDOM.render(
  <HashRouter><App/></HashRouter>,
  document.getElementById('root')
);
