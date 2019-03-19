import React, { ReactNode } from 'react'

import styles from './LeaderboardRow.module.css';
import { GroupState } from '../../../store/reducers/groups';

const LeaderboardRow = (props: LeaderboardRowProps) => {
    return (
        <div className={styles.Row}>
            <div className={styles.Position}>{props.data.position}</div>
            <div className={styles.Name}>{props.data.name}</div>
            <div className={styles.Score}>{props.data.score}</div>
        </div>
    )
}

interface LeaderboardRowPropsData extends GroupState {
    position: number
}

interface LeaderboardRowProps {
    data: LeaderboardRowPropsData;
}

export default LeaderboardRow
