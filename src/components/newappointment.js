import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const Airtable = require('airtable');

const styles = {
    resize:{
        fontSize:22
    },
    resize2:{
        width:"20em"
    }
}

class NewAppointments extends Component{
  constructor(props){
    super(props);
    this.state = {
        firstname: '',
        lastname:'',
        date:'',
        appointment_time:'',
        phone:'',
        nameerror:false,
        dateerror:false,
        timeerror:false,
        phoneerror:false,
        snackbar: false,
        message: '',
        disable: false,
    }
  }

    snackbarOpen = (message, clear) => {
      this.setState({
        message: message,
        snackbar: true,
        disable: true,
      });
    }

    snackbarClose = () => {
      this.setState({
        snackbar: false,
      });
      document.location.reload();
    }

    onClick = () => {
        //The submit button was clicked. This function pushes the newly created appointment into the airtable
    var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);
    base('appointments').create({
        "date": this.state.date,
        "status": 1,
        "first_name": this.state.firstname,
        "last_name": this.state.lastname,
        "appointment_time": this.state.appointment_time,
        "phone": this.state.phone
    }, function(err, record) {
        if (err) {
            this.snackbarOpen('You must fill out the entire form', false);
         }
         else{
           this.snackbarOpen('You have submitted an appointment', true);
         }
    }.bind(this));
  };

    handleChange = name => event => {
        //A change was made in the form. We need to keep the state of the form.
        this.setState({
          [name]: event.target.value,
        });
        console.log(event.target.value)
      };




    render(){
        const {classes} = this.props;
        return(
            <div style={{width:"20em"}}>
                <Typography variant='h6' style={{padding:10}}>Create an Appointment</Typography>

                <TextField
                    id="firstname"
                    type="text"
                    label="First Name:"
                    placeholder="Jane"
                    error = {this.state.nameerror}
                    fullWidth="true"
                    InputLabelProps={{
                        classes: {
                            root: classes.resize,
                        },
                        shrink:true,
                    }}
                    onChange={this.handleChange('firstname')}
                />

                <TextField
                    id="lastname"
                    type="text"
                    label="Last Name:"
                    placeholder="Doe"
                    error = {this.state.nameerror}
                    fullWidth="true"
                    InputLabelProps={{
                        classes: {
                            root: classes.resize,
                        },
                        shrink:true,
                    }}
                    onChange={this.handleChange('lastname')}
                />

                <TextField
                    id="date"
                    type="date"
                    label="Date:"
                    defaultValue="2018-05-24"
                    fullWidth="true"
                    InputLabelProps={{
                        classes: {
                            root: classes.resize,
                        },
                        shrink:true,
                    }}
                    onChange={this.handleChange('date')}
                />

                <TextField
                    id="time"
                    type="time"
                    defaultValue="07:30"
                    label="Appointment Time: "
                    fullWidth="true"
                    inputProps={{
                        step: 1800, // 30 min
                        shrink:true,
                    }}

                    InputLabelProps={{
                        classes: {
                            root: classes.resize,
                        },
                    }}

                    onChange={this.handleChange('appointment_time')}
                />



                <TextField
                    id="date"
                    type="text"
                    label="Phone:"
                    placeholder="123-456-7890"
                    fullWidth="true"
                    InputLabelProps={{
                        classes: {
                            root: classes.resize,
                        },
                        shrink:true,
                    }}
                    onChange={this.handleChange('phone')}
                />



            <Button onClick={this.onClick.bind(this)} style={{margin:5,float:'right'}} disable={this.state.disable}>
                <Typography variant='h8'>
                    Create
                </Typography>
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              open={this.state.snackbar}
              autoHideDuration={2000}
              onClose={this.snackbarClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={this.state.message}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.snackbarClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
            </div>
        );
    }
}

export default withStyles(styles)(NewAppointments);
