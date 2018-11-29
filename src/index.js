import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TopBar from './components/TopBar';
import Body from './components/body';
import {HashRouter} from 'react-router-dom';
import { TextField } from '@material-ui/core';




class App extends Component{
  state = {
    password: localStorage.getItem('password' )||'',
    correct:false,
  }

  componentWillMount(){
    if(process.env.REACT_APP_PASSWORD === this.state.password){
      this.setState({correct:true})
    }
  }

  handleChange = () =>{
    this.setState({password:document.getElementById('password').value})    
  }

  keyPress = (e) =>{
    if (e.keyCode === 13){
      if (process.env.REACT_APP_PASSWORD === this.state.password){
        localStorage.setItem( 'password', this.state.password);
        this.setState({correct:true})
      }
      else{
        alert('Password Incorrect')
      }
    }
  }

  render(){
      return(
        <>
          { this.state.correct ?  
            <div>
          <TopBar/>
          <Body/>
          </div>
          :
          <div>
            <TextField
            id="password"
            type="password"
            label="Enter the Password:"
            defaultValue="*****"
            fullWidth="true"
            InputLabelProps={{
                shrink:true,
            }}
            onKeyDown={this.keyPress.bind(this)}
            onChange={this.handleChange.bind(this)}>

            </TextField>
          </div>
          }
        </>
      );
  }
}





ReactDOM.render(
  <HashRouter><App/></HashRouter>,
  document.getElementById('root')
);
