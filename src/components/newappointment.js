import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
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
    state = {
        firstname: '',
        lastname:'',
        date:'',
        appointment_time:'',
        phone:'',
        nameerror:false,
        dateerror:false,
        timeerror:false,
        phoneerror:false,
    }
    

    onClick = () => {
    var base = new Airtable({apiKey: 'keyYFWbcwIfgdSCb4'}).base('appuPqYIxCcvESuzm');
    base('appointments').create({
        "date": this.state.date,
        "status": 1,
        "first_name": this.state.firstname,
        "last_name": this.state.lastname,
        "appointment_time": this.state.appointment_time,
        "phone": this.state.phone
    }, function(err, record) {
        if (err) { console.error(err);alert('You must fill out the entire form'); return; }
        else{alert('You have submitted an appointment!')}
        document.location.reload();
        console.log(record);
    });
    
    }

    handleChange = name => event => {
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
                
                
            
            <Button onClick={this.onClick.bind(this)} style={{margin:5,float:'right'}}>
                <Typography variant='h8'>
                    Create
                </Typography>
            </Button>
            </div>
        );
    }
}

export default withStyles(styles)(NewAppointments);