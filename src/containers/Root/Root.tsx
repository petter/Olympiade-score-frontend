import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import io from 'socket.io-client';

import { State } from '../../store/reducers';
import * as groupActions from '../../store/actions/groups';
import DevTools from '../DevTools/DevTools';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import './Root.css';
import { GroupState } from '../../store/reducers/groups';

class Root extends Component<RootProps> {

    state = {
        socket: null,
    }

    componentDidMount = () => {
        const socket = io('http://localhost:8080');
        socket.on('connect', () => console.log('connected'));
        socket.on('disconnect', () => console.log('disconnected'));
        // socket.emit('groups', this.props.groups); // Used to provide backend with dummydata
        socket.emit('group_request', (groups: GroupState[]) => this.props.setGroups(groups));
        this.setState({ socket: socket });

    }


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

interface RootProps {
    setGroups(groups: GroupState[]): void;
    groups: GroupState[];
}

const mapStateToProps = (state: State) => {
    return {
        groups: state.groups
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        setGroups: (groups: GroupState[]) => dispatch(groupActions.setGroups(groups)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
