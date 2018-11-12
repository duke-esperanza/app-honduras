import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/AccountCircle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PhoneIcon from '@material-ui/icons/Phone';
import CheckIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import styles from '../styles/todayappt.css';

class TodayAppointment extends Component{
  constructor(props){
    super(props);

    this.state = {
      open: false,
      first: this.props.first,
      last: this.props.last,
      time: this.props.time,
      phone: this.props.phone,
    }
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open}));
  };

  render() {
    const { classes } = this.props;
    return (
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              <Avatar>
                <PersonIcon />
              </Avatar>
              <ListItemText className='listitem' primary={this.state.first + ' ' + this.state.last} secondary={this.state.time}/>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className='information'>
              <ScheduleIcon />
              <Typography variant='h6'> {this.state.time} </Typography>
            </div>
            <div className='information'>
              <PhoneIcon />
              <Typography variant='h6'> {this.state.phone} </Typography>
            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button variant='contained' color='primary' >
              Came
              <CheckIcon className='leftIcon' />
            </Button>
            <Button variant='contained' color='secondary' >
              Missed
              <CancelIcon className='leftIcon' />
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
    );
  };
};


export default TodayAppointment;