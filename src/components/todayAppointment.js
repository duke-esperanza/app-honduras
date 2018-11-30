import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/AccountCircle";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PhoneIcon from "@material-ui/icons/Phone";
import CheckIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import styles from "../styles/todayappt.css";

class TodayAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      first: this.props.first,
      last: this.props.last,
      time: this.props.time,
      phone: this.props.phone,
      id: this.props.id,
      valid: 0
    };

    this.appointmentUpdate = this.appointmentUpdate.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  appointmentUpdate = (value, first, last) => {
    this.updateAirtable(value);
    this.setState({
      valid: 1
    });
    //This value is 3 because that is the designated value for a patient MAKING their appointment
    if(value === 3) this.props.onDel(first + " " + last + " has been marked as having came to their appointment!");
    //This value is 4 because that is the designated value for a patient MISSING their appointment
    if(value === 4) this.props.onDel(first + " " + last + " has been marked as missing their appointment!");
  };

  updateAirtable = value => {
    var Airtable = require("airtable");
    var base = new Airtable({ apiKey: "keybQixDhiGoMKCTi" }).base(
      "appuPqYIxCcvESuzm"
    );
    console.log(value);
    console.log("update call made it here");
    base("appointments").update(
      this.state.id,
      {
        /* eslint-disable */
        "status": value
      },
      function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  };

  render() {
    if (this.state.valid !== 0) {
      return null;
    }

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <ListItemText
            className="listitem"
            primary={
              <Typography variant="h5">
                {this.state.first} {this.state.last}
              </Typography>
            }
            secondary={
              <Typography variant="h6" gutterBottom>
                {this.state.time}
              </Typography>
            }
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="information">
            <ScheduleIcon />
            <Typography variant="h6" className="iconText">
              {" "}
              {this.state.time}{" "}
            </Typography>
          </div>
          <div className="information">
            <PhoneIcon />
            <Typography variant="h6" className="iconText">
              {" "}
              {this.state.phone}{" "}
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              this.appointmentUpdate(3, this.state.first, this.state.last)
            }
          >
            Came
            <CheckIcon className="leftIcon" />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              this.appointmentUpdate(4, this.state.first, this.state.last)
            }
          >
            Missed
            <CancelIcon className="leftIcon" />
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}

export default TodayAppointment;
