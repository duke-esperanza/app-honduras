import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import NewAppointments from './newappointment';
import Update from './updateappointment';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  largetext:{
    textSize: 20,
  },
});

class AppointmentTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
          <Tabs value={value} onChange={this.handleChange} centered={true} indicatorColor='primary'>
            <Tab label={<h5>New Appointment</h5>}/>
            <Tab label={<h5>Update Appointment</h5>}/>
          </Tabs>
        {value === 0 && <TabContainer><NewAppointments/></TabContainer>}
        {value === 1 && <TabContainer><Update/></TabContainer>}
      </div>
    );
  }
}

AppointmentTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppointmentTabs);
