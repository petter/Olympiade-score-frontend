import React, { useState } from 'react'
import { connect } from 'react-redux';
import FlipMove from 'react-flip-move';
import { SyncLoader } from 'react-spinners';
import styles from './Leaderboard.module.css';
import LeaderboardRow from './Row/LeaderboardRow';
import { State } from '../../store/reducers';
import { GroupState } from '../../store/reducers/groups';
import DefaultLoader from '../UI/DefaultLoader/DefaultLoader';
import Container from '../UI/Container/Container';
import { IThemeStateItem } from '../../store/reducers/themes';

const Leaderboard = (props: LeaderboardProps) => {

    const leadingRowStyle = {
        backgroundColor: props.theme.primary,
        color: props.theme.primaryText,
        fontSize: '1.4em',
        width: '100%',
    }

    const leadingColors = [
        {
            background: 'linear-gradient(5deg,  rgba(242,215,12,1) 0%,rgba(250,240,255,1) 56%,rgba(252,235,0,1) 96%)',
            color: 'black',
        }, {
            background: 'linear-gradient(5deg,  rgba(180,180,180,1) 0%,rgba(232,232,232,1) 56%)',
            color: 'black',
        }, {
            background: 'linear-gradient(5deg, rgba(223,182,103,1) 0%, rgba(235,220,140,1) 50%,rgba(231,192,116,1) 96%)',
            color: 'white',
        }];

    const numLeadingStyled = 3;

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
                {sorted.map((el, pos) => <LeaderboardRow
                    key={el.id} theme={props.theme}
                    data={{ ...el, position: pos + 1 }}
                    style={pos < numLeadingStyled ? leadingRowStyle : null} />)}
            </FlipMove>
        );
    }

    return (
        <Container>
            <h1 className={styles.LeaderboardTitle}>Olympiade 2019</h1>
            <div className={styles.Rows}>
                {rows}
            </div>
        </Container>
    )
}

interface LeaderboardProps {
    groups: GroupState[];
    theme: IThemeStateItem;
}

const mapStateToProps = (state: State) => {
    return {
        groups: state.groups,
        theme: state.themes.themes[state.themes.active],
    };
}

export default connect(mapStateToProps)(Leaderboard);
