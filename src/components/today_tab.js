import React, { Component } from "react";
import style from "../styles/tabs.css";
import TodayAppointment from "./todayAppointment";
import { Paper, Typography } from "@material-ui/core";

class TodayTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      appointments: []
    };
  }

  componentWillMount() {
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keybQixDhiGoMKCTi" }).base(
      "appuPqYIxCcvESuzm"
    );
    var appointmentData = [];
    var count = 0;
    base("Appointments")
      .select({
        filterByFormula: 'IS_SAME(TODAY(), date, "day")'
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            console.log(record);
            appointmentData[count] = [record.fields, record.id];
            count++;
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

  render() {
    const content = this.state.appointments.map(someData => (
      <div key={someData[1]}>
        <TodayAppointment
          first={someData[0].first_name}
          last={someData[0].last_name}
          time={someData[0].appointment_time}
          phone={someData[0].phone}
          id={someData[1]}
        />
      </div>
    ));
    return (
      <div>
        <Paper className="title" elevation={2}>
          <Typography className="title" variant="h4">
            <strong>{this.state.title}</strong>
          </Typography>
        </Paper>
        <Paper className="tab" elevation={3}>
          <div>{content}</div>
        </Paper>
      </div>
    );
  }
}
export default TodayTab;
