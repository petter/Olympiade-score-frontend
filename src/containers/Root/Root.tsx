import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, RouteComponentProps } from 'react-router-dom';
import io from 'socket.io-client';

import { State } from '../../store/reducers';
import * as groupActions from '../../store/actions/groups';
import DevTools from '../DevTools/DevTools';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import './Root.css';
import { GroupState } from '../../store/reducers/groups';
import RouteWithSubRoutes from '../../hoc/RouteWithSubRoutes/RouteWithSubRoutes';

const GroupView = React.lazy(() => import('../../components/GroupView/GroupView'));

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

        // Simulate scores
        // setInterval(() => this.props.addScore(Math.floor(Math.random() * 60).toString(), 100), 1000);

    }



    render() {

        const routes = [
            {
                path: '/group/:id',
                component: GroupView,
                async: true,
                exact: true,
            },
            {
                path: '/',
                component: Leaderboard,
                exact: true,
            },
        ]

        return (
            <>
                <Link to="/">Home</Link>
                <Link to="/group/P1">P1</Link>
                <Switch>
                    {routes.map((el, i) => {
                        return (
                            <RouteWithSubRoutes key={i} {...el} />
                        );
                    })}>
                </Switch>
                <DevTools />
            </>
        );
    }
}

interface RootProps {
    setGroups(groups: GroupState[]): void;
    setScore(id: string, value: number): void;
    addScore(id: string, value: number): void;
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
        setScore: (id: string, value: number) => dispatch(groupActions.setScore({ id: id, value: value })),
        addScore: (id: string, value: number) => dispatch(groupActions.addScore({ id: id, value: value })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
