import React, { Component } from "react";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import factory from '../backend/appointmentFactory';
import { Button, Typography } from "@material-ui/core";
const appfact = factory.getInstance();
const Airtable = require('airtable');



class NewAppointments extends Component{
    state = {
        name: '',
        date:'',
        appointment_time:'',
        phone:'',
    }

    onClick = () => {
    var base = new Airtable({apiKey: 'keyYFWbcwIfgdSCb4'}).base('appuPqYIxCcvESuzm');
    var sepname = this.state.name.split(' ');
    base('appointments').create({
        "date": this.state.date,
        "status": 1,
        "first_name": sepname[0],
        "last_name": sepname[1],
        "appointment_time": this.state.appointment_time,
        "phone": this.state.phone
    }, function(err, record) {
        if (err) { console.error(err);alert('You must fill out the entire form'); return; }
        else{alert('You have submitted an appointment!')}
        document.location.reload();
        console.log(record);
        appfact.addAppointment(record.fields);
    });
    
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };


    render(){
        return(
            <>
            <FormControl
                fullWidth={true}
                variant='filled'
                margin = 'dense'
                required = {true}
            >
                <FormLabel>
                    Name:
                </FormLabel>
                <Input placeholder='Jane Doe' onChange={this.handleChange('name')}>
                </Input>
                
            </FormControl>
            <FormControl
                fullWidth={true}
                variant='filled'
                margin = 'dense'
                required = {true}
            >
                <FormLabel>
                   Date:
                </FormLabel>
                <Input placeholder='yyyy-dd-mm' onChange={this.handleChange('date')}>
                </Input>
                
            </FormControl>
            <FormControl
                fullWidth={true}
                variant='filled'
                margin = 'dense'
                required = {true}
            >
                <FormLabel>
                    Appointment Time:
                </FormLabel>
                <Input placeholder='06:00' onChange={this.handleChange('appointment_time')} >
                </Input>
                
            </FormControl>
            <FormControl
                fullWidth={true}
                variant='filled'
                margin = 'dense'
                required = {true}
            >
                <FormLabel>
                    Phone Number:
                </FormLabel>
                <Input placeholder='123-456-7890' onChange={this.handleChange('phone') }>
                </Input>
                
            </FormControl>
            <Button onClick={this.onClick.bind(this)}>
                <Typography variant="h5">
                    Submit
                </Typography>
            </Button>
            </>
        );
    }
}

export default NewAppointments;