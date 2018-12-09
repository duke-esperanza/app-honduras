import React from 'react';
import {Switch,Route} from 'react-router-dom';
import container from './container';
import Update from './updateappointment';
import About from './about';


const Body = () => (
  //used to contain the body portion of the application. Utilizes react router to change the page content
    <main>
      <Switch>
        <Route exact path='/' component={container}/>
        <Route path='/update' component={Update}/>
        <Route path='/about' component={About}/>
      </Switch>
    </main>
  )

export default Body;
