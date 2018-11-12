import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Styles from '../styles/topbar.css';



function TopBar(props) {
  const { classes } = props;
  return (
    <div className='root'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" color="inherit" >
            Clinica Esperanza
          </Typography>
          <div className='spacer1'></div>
          <NavLink exact to='/' style={{ textDecoration: 'none', color:'white' }} activeStyle={{color:'limegreen'}}>
            <h3>Schedule</h3>
          </NavLink>
          <div className='spacer'></div>
          <NavLink to = '/appointments' style={{ textDecoration: 'none', color:'white' }} activeStyle={{color:'limegreen'}}>
            <h3>Appointments</h3>
          </NavLink>          
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default (TopBar);
