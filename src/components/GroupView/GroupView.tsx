import React from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styles from './GroupView.module.css';
import LeaderboardRow from '../Leaderboard/Row/LeaderboardRow';
import { State } from '../../store/reducers';
import { GroupState } from '../../store/reducers/groups';

const GroupView = (props: GroupViewProps) => {

    return (
        <div>
            <LeaderboardRow data={{ ...props.groupData, position: 0 }} />
        </div>
    )
}

interface GroupViewMatch {
    id: string
}

export interface GroupViewProps extends RouteComponentProps<GroupViewMatch> {
    groupData: GroupState;
}

const mapStateToProps = (state: State, ownProps: GroupViewProps) => {
    const groupData: GroupState = state.groups.filter((el) => el.id === ownProps.match.params.id)[0];
    return {
        groupData: groupData,
    }
}

export default connect(mapStateToProps)(GroupView);
