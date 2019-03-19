import React, { Component } from 'react';
import './Root.css';
import DevTools from '../DevTools/DevTools';
import { Switch, Route } from 'react-router';

class Root extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route path="/" render={() => "dab"} />
                </Switch>
                <DevTools />
            </>
        );
    }
}

export default Root;
