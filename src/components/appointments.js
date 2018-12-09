import React, {Component} from 'react';
import AppointmentTabs from './appointmenttabs';

class Appointments extends Component{
    //Container for the appointmentTabs
    render(){
        return(
            <div>
                <AppointmentTabs/>              
            </div>
        );
    }
}

export default Appointments;