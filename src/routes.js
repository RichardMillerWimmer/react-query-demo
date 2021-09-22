import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Currencies from './components/Currencies';
import CurrencyDetails from './components/CurrencyDetails'
import Portfolio from './components/Portfolio';

export default (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/currencies' component={Currencies}/>
        <Route path='/crypto/:id' component={CurrencyDetails}/>
        <Route path='/portfolio' component={Portfolio}/>
    </Switch>
)