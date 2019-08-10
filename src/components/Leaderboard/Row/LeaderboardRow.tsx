import React, { Component } from 'react';

import styles from './LeaderboardRow.module.css';
import { GroupState } from '../../../store/reducers/groups';
import { IThemeStateItem } from '../../../store/reducers/themes';

class LeaderboardRow extends Component<LeaderboardRowProps> {
  render = () => {
    const { theme, data } = this.props;
    return (
      <div
        className={styles.Row}
        style={{
          backgroundColor: theme.surface,
          color: theme.surfaceText,
          ...this.props.style,
        }}
      >
        <div
          className={styles.Position}
          style={{
            backgroundColor: theme.secondary,
            color: theme.secondaryText,
          }}
        >
          {data.position}
        </div>
        <div className={styles.Name}>{data.name}</div>
        <div className={styles.Score}>{data.score}</div>
      </div>
    );
  };
}

interface LeaderboardRowPropsData extends GroupState {
  position: number;
}

interface LeaderboardRowProps {
  data: LeaderboardRowPropsData;
  theme: IThemeStateItem;
  style?: object | null;
}

export default LeaderboardRow;
