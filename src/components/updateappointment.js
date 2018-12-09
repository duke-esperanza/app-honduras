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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
        value:3,
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
  constructor(props) {
    super(props);
    this.state= {
      uapps:[],
      open:false,
      appointment:[],
      status:'',
      ready: false,
      message: '',
      snackbar: false,
    };
    this.snackbarOpen = this.snackbarOpen.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  snackbarOpen(message) {
    this.setState({
      snackbar: true,
      message: message,
      open: false,
    })
  }

  snackbarClose = () => {
    this.setState({
      snackbar: false
    });
    document.location.reload();
  }

  componentWillMount(){
    //Before the component is mounted, we need to grab the appointment data from the airtable.
    //This data is assigned to the Global APPOINTMENTS variable for use in the search
    var ls = [];
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);

    base('Appointments').select({
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        ls.push(record);
      });
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
    //This searches for a match between the text in the input and the full name for each appointment in the database
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
      //an appointment was clicked. the modal must be opened
        this.setState({appointment:el,status:el.fields.status,open:true})
    };

  delete(){
    //deletes appointment and notifies user
    this.deleteAppointment();
    var name = this.state.appointment.fields.first_name + ' ' + this.state.appointment.fields.last_name;
    this.snackbarOpen('Deleted record for ' + name);
  }

  deleteAppointment(){
    //deletes appointment through airtable
    console.log('delete clicked')
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);
    base('appointments').destroy(this.state.appointment.id, function(err, deletedRecord) {
      if (err) { console.error(err); return; }
    });
  };

  update(){
    //updates appointment and notifies user
    this.updateAppointment();
    var name = this.state.appointment.fields.first_name + ' ' + this.state.appointment.fields.last_name
    this.snackbarOpen('Updated record for ' + name);
  }

  updateAppointment(){
    //updates appointment by grabbing the values in each of the update appoinment dialogue input fields
    var Airtable = require('airtable');
    var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE);
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
    });
  };

  handleClose = () => {
    //handles close for both dialogues
    this.setState({ open: false, ready: false });
  }

    makeNewAppointment = () => {
      //opens the dialogue to make a new appointment
        console.log('making appointment')
        this.setState({ready:true})
    }
    changeStatus = () => event =>{
      //changes the status of the appointment
        console.log(event.target.value)
        this.setState(
            {status:event.target.value}
        )
    }
    handleFilter = () =>{
      //filters appointments by date if there is a date and the filter is checked
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
            <Card style={{width:250, display:'inline-block', height:250}}>
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
          maxWidth={'md'}
        >
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
            <Button onClick={this.update}>Update</Button>
            <Button onClick={this.delete}>Delete</Button>
          </DialogActions>
        </Dialog> : ''}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.snackbar}
          onClose={this.snackbarClose}
          autoHideDuration={2000}
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
      </>
    );
  }
}

export default Update;
