import React from 'react';
import {Switch,Route} from 'react-router-dom';
import container from './container';
import NewAppointments from './newappointment';
import Update from './updateappointment';
import appointments from './appointments';


const Body = () => (
    <main>
      <Switch>
        <Route exact path='/' component={container}/>
        <Route path='/update' component={Update}/>
      </Switch>
    </main>
  )

export default Body;
