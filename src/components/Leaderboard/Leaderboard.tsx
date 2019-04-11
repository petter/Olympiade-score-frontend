import React, { useState } from 'react'
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import { SyncLoader } from 'react-spinners';
import styles from './Leaderboard.module.css';
import LeaderboardRow from './Row/LeaderboardRow';
import { State } from '../../store/reducers';
import { GroupState } from '../../store/reducers/groups';
import DefaultLoader from '../UI/DefaultLoader/DefaultLoader';

const Leaderboard = (props: LeaderboardProps) => {

    let rows = <DefaultLoader />;
    if (props.groups.length !== 0) {
        const sorted = props.groups.slice().sort((a, b) => b.score - a.score);
        rows = (
            <FlipMove
                typeName={null}
                maintainContainerHeight={true}
                staggerDurationBy={0}
                duration={500}
                enterAnimation="accordionVertical"
                leaveAnimation="accordionVertical">
                {sorted.map((el, pos) => <LeaderboardRow key={el.id} data={{ ...el, position: pos + 1 }} />)}
            </FlipMove>
        );
    }

    return (
        <div className={styles.Container}>
            <h1 className={styles.LeaderboardTitle}>Olympiade 2019</h1>
            <div className={styles.Rows}>
                {rows}
            </div>
        </div>
    )
}

interface LeaderboardProps {
    groups: GroupState[];
}

const mapStateToProps = (state: State) => {
    return {
        groups: state.groups,
    };
}

export default connect(mapStateToProps)(Leaderboard);
