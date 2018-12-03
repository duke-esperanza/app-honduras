import React, { Component } from "react";
import NewAppointments from './newappointment';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
var APPOINTMENTS = [];

const stati = [
    {
        value:1,
        label:'New Appointment'
    },
    {
        value:2,
        label:'Sent 2 Week Notification'
    },
    {
        vale:3,
        label:'Sent 2 Day Notification'
    },
    {
        value:4,
        label:'Made Appointment'
    },
    {value:5,
    label:'Missed Appointment'}
]

class Update extends Component{
    state= {
        uapps:[],
        open:false,
        appointment:[],
        status:'',
        ready: false,
    };

    

    componentWillMount(){
        var ls = [];
        

        var Airtable = require('airtable');
        var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);

        base('Appointments').select({
        //add conditions here
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            records.forEach(function(record) {
                ls.push(record);
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return; }
            console.log(ls)
            var d = new Date();
            var upcomingapps = ls.filter((el) => {
                let date = el.fields.date.split('-');
                let comp = date.map(x => parseInt(x));
                if (comp[0] >= d.getFullYear() ){
                    if (comp[0] === d.getFullYear() & comp[1] < d.getMonth()){
                        return false;
                    }
                    if (comp[1] === d.getMonth() & comp[2] < d.getDate()){
                        return false;
                    }
                    return true;
                }
                return false;
            });
            APPOINTMENTS = upcomingapps;
            this.setState({uapps:APPOINTMENTS,appointment:APPOINTMENTS[0]}, () => {
                console.log(this.state.uapps[1])
            });
            console.log(APPOINTMENTS[1])
        }.bind(this));        
    };

    searchHandler (event) {
        let searcjQery = event.target.value.toLowerCase().replace( /\s/g, '')
        var newapps = APPOINTMENTS.filter((el) => {
            let searchValue = el.fields.first_name.toLowerCase() + el.fields.last_name.toLowerCase();
            return searchValue.replace( /\s/g, '').indexOf(searcjQery) !== -1;
        });
        console.log(newapps)
        this.setState({
          uapps: newapps
        });
      };
    
   

    appointmentClick(el){
        this.setState({appointment:el})
        var stat = this.state.appointment.fields.status;
        this.setState({status:stat})
        this.setState({open:true});
        
    };

    deleteAppointment(){
        console.log('delete clicked')
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);
        var name = this.state.appointment.fields.first_name + ' ' + this.state.appointment.fields.last_name

        base('appointments').destroy(this.state.appointment.id, function(err, deletedRecord) {
            if (err) { console.error(err); return; }
            alert('Deleted record for ' + name);
            document.location.reload();
        });  
    };
    updateAppointment(){
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);
        var name = this.state.appointment.fields.first_name + ' ' + this.state.appointment.fields.last_name
        console.log(this.state.appointment.id);
        base('appointments').replace(this.state.appointment.id, {
        "date": document.getElementById('date').value.toString(),
        "status": parseInt(document.getElementById('status').value),
        "first_name": this.state.appointment.fields.first_name,
        "last_name": this.state.appointment.fields.last_name,
        "appointment_time": document.getElementById('appointment_time').value.toString(),
        "phone": document.getElementById('phone').value.toString()
        }, function(err, record) {
            if (err) { console.error(err); return; }
            alert('Updated record for ' + name);
            document.location.reload();
        });
    };

    handleClose = () => {
        this.setState({ open: false ,ready:false});
    };

    makeNewAppointment = () => {
        console.log('making appointment')
        this.setState({ready:true})
    }
    changeStatus = () => event =>{
        console.log(event.target.value)
        this.setState(
            {status:event.target.value}
        )
    }
    handleFilter = () =>{
        console.log(document.getElementById('filter_check').checked)
        if(document.getElementById('filter_check').checked && document.getElementById('filter_date').value !==''){
            var uapps = APPOINTMENTS.filter((el) => {
                return el.fields.date === document.getElementById('filter_date').value
            })
            console.log(uapps)
            console.log(document.getElementById('filter_date').value)
            this.setState({uapps})
        }
        else{
            this.setState({uapps:APPOINTMENTS});
        }
    }

    render(){
        const content = this.state.uapps.slice(0,20).map((el) => 
            <div key={el.fields.ID} style={{margin:'2em', display:'inline-block',float:'left'}}>
            <Card style={{width:250, display:'inline-block'}}>
                <CardContent>
                    <Typography variant='h4' style={{textAlign:'center'}}>
                        {el.fields.first_name +  ' ' + el.fields.last_name}
                    </Typography>
                    <Typography variant='h5' style={{textAlign:'center'}}>
                        {'Date: ' + el.fields.date}
                    </Typography>
                    <Typography variant='h5' style={{textAlign:'center'}}>
                        {'Time: ' + el.fields.appointment_time}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium" onClick={this.appointmentClick.bind(this,el)}>Update Appointment</Button>
                </CardActions>
            </Card>
            </div>
        )

        
        
        return(
            <>
            <div style={{display:'inline-block',width:'100%'}}>
                <input 
                type='text' 
                style={{width:'75%',height:30,borderRadius:3,paddingLeft:20,borderWidth:1,borderStyle:"solid",fontSize:"1.5em",outline:'none',margin:'2em',marginBottom:0}} 
                onChange={this.searchHandler.bind(this)}
                placeholder="Search for an appointment">
                </input>
                <Button onClick={this.makeNewAppointment.bind(this)} variant='contained' color='primary'>New Appointment</Button>
            </div>
            <div style={{paddingLeft:'2em',marginLeft:20,width:'100em',display:'inline-block'}}>
                <Typography style={{ marginRight:5,float:'left'}}>Filter By Date: </Typography>
                <input
                type='date'
                onChange={this.handleFilter.bind(this)}
                id='filter_date'
                style={{float:'left'}}
                ></input>
                <input
                type='checkbox'
                onChange={this.handleFilter.bind(this)}
                style={{width:20,height:20,float:'left'}}
                id='filter_check'>
                </input>
            </div>
            
            {content}
            
            

            {this.state.ready ? <Dialog
            open={this.state.ready}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'md'}>
            <DialogContent>
                <NewAppointments/>
            </DialogContent>
            </Dialog> :''

            }

            {this.state.open ? <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={'md'}
            >
                <DialogContent>
                        <Typography variant='h5'>
                            {this.state.appointment.fields.first_name} {this.state.appointment.fields.last_name}
                        </Typography>
                        
                        <Typography variant='h5'>
                            Date : <input type='date' id='date' defaultValue={this.state.appointment.fields.date} style={{borderBottom:'1px solid black', borderTop:'none', borderLeft:'none', borderRight:'none', outline:'none'}}></input>
                        </Typography>
                        <Typography variant='h5'>
                            Appointment Time : <input type='time' step={1800} id='appointment_time' defaultValue={this.state.appointment.fields.appointment_time} style={{borderBottom:'1px solid black', borderTop:'none', borderLeft:'none', borderRight:'none', outline:'none'}}></input>
                        </Typography> 
                        <Typography variant='h5'>
                            Phone Number : <input type='text' id='phone' defaultValue={this.state.appointment.fields.phone} style={{borderBottom:'1px solid black', borderTop:'none', borderLeft:'none', borderRight:'none', outline:'none'}}></input>
                        </Typography>  
                        <Typography variant='h5' style={{display:'inline-block'}}>
                            Status : 
                            <TextField
                                id="status"
                                select
                                value={this.state.status}
                                onChange={this.changeStatus()}
                                margin="none"
                                fullwidth={true}
                                >
                                {console.log(this.state.status)}
                                {stati.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Typography>
                </DialogContent>
                <DialogActions style={{float:'left'}}>
                    <Button onClick={this.updateAppointment.bind(this)}>Update</Button>
                    <Button onClick={this.deleteAppointment.bind(this)}>Delete</Button>
                </DialogActions>
            </Dialog> : ''}
            </>
        );
    }
}

export default Update;