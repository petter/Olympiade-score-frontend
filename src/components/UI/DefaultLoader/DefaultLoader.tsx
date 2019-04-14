import React from 'react'
import { SyncLoader } from 'react-spinners';
import styles from './DefaultLoader.module.css';
import { State } from '../../../store/reducers';
import { connect } from 'react-redux';
import { IThemeStateItem } from '../../../store/reducers/themes';

const DefaultLoader = (props: DefaultLoaderProps) => {
    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                <SyncLoader color={props.theme.primary} />
            </div>
        </div>
    )
}

interface DefaultLoaderProps {
    theme: IThemeStateItem;
}

const mapStateToProps = (state: State) => {
    return {
        theme: state.themes.themes[state.themes.active],
    }
}

export default connect(mapStateToProps)(DefaultLoader);
