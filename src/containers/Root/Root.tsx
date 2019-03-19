import React, { Component } from 'react';
import './Root.css';
import DevTools from '../DevTools/DevTools';
import { Switch, Route } from 'react-router';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

class Root extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route path="/" component={Leaderboard} />
                </Switch>
                <DevTools />
            </>
        );
    }
}

export default Root;
