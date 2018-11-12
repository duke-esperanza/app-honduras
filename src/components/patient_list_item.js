import React, {Component} from 'react';
import {Button, Collapse, Well, ButtonGroup, ButtonToolBar} from 'react-bootstrap';
import { List, ListItem, ListItemText } from '@material-ui/core';
import style from '../styles/patient.css';

class PatientListItem extends Component {
    constructor(props) {
        super(props);

		this.state = {
			open: false,
			status: this.props.appt.status
		};

        this.success = this.success.bind(this);
        this.fail = this.fail.bind(this);
    }

	render(){
		//currently this value is arbitrary, ideally shouldn't be
		if(this.state.status != 5){
			return null;
		}
		return (
			<div className = 'patient_list_item'>
				<Well onClick={() => this.setState({ open: !this.state.open })}>
					<div>
						{this.props.patientName}
					</div>
					<div>
						{this.props.appt.time}
					</div>
				</Well>
        <Collapse in={this.state.open}>
                    <div>
                        <ButtonGroup justified>
                            <Button href='#' bsStyle='success' onClick={this.success}>Yes</Button>
                            <Button href='#' bsStyle='danger' onClick={this.fail}>No</Button>
                        </ButtonGroup>
                    </div>
        </Collapse>
            </div>
        );
    };

    success(){
        this.setState({status : 1});
        console.log("patient came!");
    }

    fail(){
        this.setState({status : 0});
        console.log("patient missed appointment");
    }
};

export default PatientListItem;
