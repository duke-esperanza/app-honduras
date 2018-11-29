import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TopBar from './components/TopBar';
import Body from './components/body';
import {HashRouter} from 'react-router-dom';




class App extends Component{
  render(){
      return(
        <div>
          <TopBar/>
          <Body/>
        </div>
      );
  }
}





ReactDOM.render(
  <HashRouter><App/></HashRouter>,
  document.getElementById('root')
);
