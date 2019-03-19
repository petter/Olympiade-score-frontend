import React from 'react'
import { connect } from 'react-redux';
import styles from './Leaderboard.module.css';
import LeaderboardRow from './Row/LeaderboardRow';
import { State } from '../../store/reducers';
import { GroupState } from '../../store/reducers/groups';

const Leaderboard = (props: LeaderboardProps) => {

    const sorted = props.groups.slice().sort((a, b) => b.score - a.score);
    const rows = sorted.map((el, pos) => <LeaderboardRow key={el.id} data={{ ...el, position: pos + 1 }} />);

    return (
        <div className={styles.Container}>
            <h1 className={styles.LeaderboardTitle}>Olympiaden 2019</h1>
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
