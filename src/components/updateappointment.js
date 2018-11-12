import React, { Component } from "react";
import factory from '../backend/appointmentFactory';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const appfact = factory.getInstance();
const Airtable = require('airtable');
var APPOINTMENTS = [];



class Update extends Component{
    state= {
        uapps:[],
        open:false,
        appointment:[],
        status:'',
    };

    findStatus(){
        var status = this.state.appointment.status;
        console.log(status);
        switch(status){
            case '1':
                return 'New Appointment'
            case '2':
                return 'Sent 2 week notification!'
            case '3':
                return 'Sent 2 day notification!'
            case '4':
                return 'Made appointment!'
            case '5': 
                return 'Missed appointment!'
            default:
                console.log(status);
                break
        }
    }

    componentWillMount(){
        var ls = appfact.records;
        console.log(ls)
        var d = new Date();
        var upcomingapps = ls.filter((el) => {
            let date = el.fields.date.split('-');
            let comp = date.map(x => parseInt(x));
            if (comp[0] >= d.getFullYear() ){
                if (comp[0] == d.getFullYear() & comp[1] < d.getMonth()){
                    return false;
                }
                if (comp[1] == d.getMonth() & comp[2] < d.getDate()){
                    return false;
                }
                return true;
            }
        });
        APPOINTMENTS = upcomingapps;
        this.setState({uapps:APPOINTMENTS,appointment:APPOINTMENTS[0]}, () => {
            console.log(this.state.uapps[1])
        });
        console.log(APPOINTMENTS[1])
        
    };

    searchHandler (event) {
        let searcjQery = event.target.value.toLowerCase().replace( /\s/g, '')
        var newapps = APPOINTMENTS.filter((el) => {
            let searchValue = el.fields.first_name.toLowerCase() + el.fields.last_name.toLowerCase();
            return searchValue.indexOf(searcjQery) !== -1;
        });
        console.log(newapps)
        this.setState({
          uapps: newapps
        });
      };
    
   

    appointmentClick(el){
        this.setState({appointment:el})
        var status = this.state.appointment.fields.status;
        switch(status){
            case 1:
                this.setState({status:'New Appointment'}); 
                break;
            case 2:
                this.setState({status:'Sent 2 week notification!'}); 
                break; 
            case 3:
                this.setState({status:'Sent 2 day notification!'}); 
                break; 
            case 4:
                this.setState({status:'Made Appointment!'}); 
                break; 
            case 5: 
                this.setState({status:'Missed Appointment!'}); 
                break; 
            default:
                break
        }
        this.setState({open:true});
        
    };

    deleteAppointment(){
        console.log('delete clicked')
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: 'keyYFWbcwIfgdSCb4'}).base('appuPqYIxCcvESuzm');
        var name = this.state.appointment.fields.first_name + ' ' + this.state.appointment.fields.last_name

        base('appointments').destroy(this.state.appointment.id, function(err, deletedRecord) {
            if (err) { console.error(err); return; }
            alert('Deleted record for ' + name);
            document.location.reload();
        });  
    };
    updateAppointment(){
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: 'keyYFWbcwIfgdSCb4'}).base('appuPqYIxCcvESuzm');
        var name = this.state.appointment.fields.first_name + ' ' + this.state.appointment.fields.last_name
        base('appointments').replace(this.state.appointment.id, {
        "date": document.getElementById('date').value.toString(),
        "status": 1,
        "first_name": this.state.appointment.fields.first_name.toString(),
        "last_name": this.state.appointment.fields.last_name.toString(),
        "appointment_time": document.getElementById('appointment_time').value.toString(),
        "phone": document.getElementById('phone').value.toString()
        }, function(err, record) {
            if (err) { console.error(err); return; }
            alert('Updated record for ' + name);
            document.location.reload();
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render(){
        const content = this.state.uapps.slice(0,20).map((el) => 
            <div key={el.fields.ID} style={{margin:'2em', display:'inline-block'}}>
            <Card style={{width:250, display:'inline-block'}}>
                <CardContent>
                    <Typography variant='h4' style={{textAlign:'center'}}>
                        {el.fields.first_name +  ' ' + el.fields.last_name}
                    </Typography>
                    <Typography variant='h5' style={{textAlign:'center'}}>
                        {'Date: ' + el.fields.date}
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
            <input 
            type='text' 
            style={{width:'100%',height:30,borderRadius:3,paddingLeft:20,borderWidth:1,borderStyle:"solid",fontSize:"1.5em",outline:'none'}} 
            onChange={this.searchHandler.bind(this)}
            placeholder="Search for an appointment">
            </input>
            {content}
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={'md'}
            >
                <DialogContent>
                        <Typography variant='h3' style={{textAlign:'center'}}>
                        {this.state.appointment.fields.first_name} {this.state.appointment.fields.last_name}
                        </Typography>
                        <Typography variant='h5'>
                            Date : <input type='text' id='date' defaultValue={this.state.appointment.fields.date} style={{borderBottom:'1px solid black', borderTop:'none', borderLeft:'none', borderRight:'none', outline:'none'}}></input>
                        </Typography>
                        <Typography variant='h5'>
                            Appointment Time : <input type='text' id='appointment_time' defaultValue={this.state.appointment.fields.appointment_time} style={{borderBottom:'1px solid black', borderTop:'none', borderLeft:'none', borderRight:'none', outline:'none'}}></input>
                        </Typography> 
                        <Typography variant='h5'>
                            Phone Number : <input type='text' id='phone' defaultValue={this.state.appointment.fields.phone} style={{borderBottom:'1px solid black', borderTop:'none', borderLeft:'none', borderRight:'none', outline:'none'}}></input>
                        </Typography>  
                        <Typography variant='h5'>
                            Status : <input type='text' id='status' defaultValue={this.state.status} style={{borderBottom:'1px solid black', borderTop:'none', borderLeft:'none', borderRight:'none', outline:'none'}}></input>
                        </Typography>
                </DialogContent>
                <DialogActions style={{float:'left'}}>
                    <Button onClick={this.updateAppointment.bind(this)}>Update</Button>
                    <Button onClick={this.deleteAppointment.bind(this)}>Delete</Button>
                </DialogActions>
            </Dialog>
            </>
        );
    }
}

export default Update;