import React from 'react';
import {Switch,Route} from 'react-router-dom';
import container from './container';
import appointments from './appointments';


const Body = () => (
    <main>
      <Switch>
        <Route exact path='/' component={container}/>
        <Route path='/appointments' component={appointments}/>
        {/* <Route path='/schedule' component={Schedule}/> */}
      </Switch>
    </main>
  )

export default Body;
