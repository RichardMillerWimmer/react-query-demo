import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage, CryptoCurrencies, CryptoDetails, News } from './components/index';

export default (
    <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/cryptocurrencies' component={CryptoCurrencies}/>
        <Route path='/crypto/:coinId' component={CryptoDetails}/>
        <Route path='/news' component={News}/>
    </Switch>
)