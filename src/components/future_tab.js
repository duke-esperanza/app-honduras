import React, { Component } from "react";
import style from "../styles/tabs.css";
import { Paper, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

class FutureTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: []
    };
  }

  componentWillMount() {
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keybQixDhiGoMKCTi" }).base(
      "appuPqYIxCcvESuzm"
    );
    var appointmentData = [];
    base("Appointments")
      .select({
        filterByFormula:
          "AND(OR(status = 1, status = 2), IS_AFTER(date, TODAY()))"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            appointmentData.push(record.fields);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
          this.setState({
            appointments: appointmentData
          });
        }.bind(this)
      );
  }

  componentMap = (list, dateList) => {
    var map = {};
    for (var i = 0; i < list.length; i++) {
      var date = list[i].date;
      if (!map[date]) {
        map[date] = [];
        dateList.push(date);
      }
      map[date].push(list[i]);
    }
    return map;
  };

  render() {
    console.log(this.state.appointments);
    var dateList = [];
    var dict = this.componentMap(this.state.appointments, dateList);
    return (
      <div>
        <Paper className="title" elevation={2}>
          <Typography className="title" variant="h4">
            <strong>Future Appointments</strong>
          </Typography>
        </Paper>
        <Paper className="tab" elevation={3}>
          <List subheader={<li />}>
            {dateList.map(date => (
              <li key={date} className="listSection">
                <ListSubheader>
                  <Typography variant="h6">{date}</Typography>
                </ListSubheader>
                {dict[date].map(appt => (
                  <ListItem key={appt.first_name}>
                    <ListItemText
                      primary=<Typography variant="h5">
                        {appt.first_name}
                      </Typography>
                    />
                  </ListItem>
                ))}
              </li>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}
export default FutureTab;
