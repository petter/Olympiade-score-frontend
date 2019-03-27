import React, { Component } from 'react'

import styles from './LeaderboardRow.module.css';
import { GroupState } from '../../../store/reducers/groups';

class LeaderboardRow extends Component<LeaderboardRowProps> {

    render = () => {
        return (
            <div className={styles.Row}>
                <div className={styles.Position}>{this.props.data.position}</div>
                <div className={styles.Name}>{this.props.data.name}</div>
                <div className={styles.Score}>{this.props.data.score}</div>
            </div>
        );
    }
}

interface LeaderboardRowPropsData extends GroupState {
    position: number
}

interface LeaderboardRowProps {
    data: LeaderboardRowPropsData;
}

export default LeaderboardRow
