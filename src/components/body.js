import React from 'react';
import {Switch,Route} from 'react-router-dom';
import container from './container';
import Update from './updateappointment';
import About from './about';


const Body = () => (
    <main>
      <Switch>
        <Route exact path='/' component={container}/>
        <Route path='/update' component={Update}/>
        <Route path='/about' component={About}/>
      </Switch>
    </main>
  )

export default Body;
