import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
import '../styles/topbar.css';



function TopBar() {
  return (
    <div className='root'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" color="inherit" >
            Clinica Esperanza
          </Typography>
          <div className='spacer1'></div>
          <NavLink exact to='/' style={{ textDecoration: 'none', color:'white', fontSize:'2em', borderRight:'2px solid gray',paddingRight:'.5em'}} activeStyle={{color:'limegreen'}}>
            Schedule
          </NavLink> 
          <div style={{width:'1em'}}></div>
          <NavLink to = '/update' style={{ textDecoration: 'none', color:'white', fontSize:'2em', borderRight:'2px solid gray',paddingRight:'.5em' }} activeStyle={{color:'limegreen'}}>
            Update
          </NavLink>  
          <div style={{width:'1em'}}></div>
          <NavLink to = '/about' style={{ textDecoration: 'none', color:'white', fontSize:'2em' }} activeStyle={{color:'limegreen'}}>
            About
          </NavLink>     
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default (TopBar);
