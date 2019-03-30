import React, { Component } from 'react'
import { connect } from 'react-redux';
import Select from 'react-select';

import { State } from '../../store/reducers';
import Button from '../UI/Button/Button';
import styles from './ScoreSubmission.module.css';
import { GroupState } from '../../store/reducers/groups';

class ScoreSubmission extends Component<ScoreSubmissionProps> {


    render = () => {

        const groupOptions = this.props.groups.map(el => {
            return {
                value: el.id,
                label: el.name + '(' + el.id + ')'
            }
        });

        const pointOptions = Array.from(Array(10).keys()).map((_, i) => {
            return {
                value: i,
                label: i + ' poeng'
            }
        });

        return (
            <div className={styles.Container}>
                <h1 className={styles.FormTitle}>Poeng på post</h1>

                <form className={styles.Form}>
                    <label className={styles.Label}>
                        Gruppe:
                </label>
                    <Select options={groupOptions} className={styles.Select} />


                    <label className={styles.Label}>
                        Poeng:
                </label>
                    <Select options={pointOptions} className={styles.Select} />

                    <Button type="submit">Submit</Button>
                </form>

            </div >
        )
    }
}

interface ScoreSubmissionProps {
    groups: GroupState[];
}

const mapStateToProps = (state: State) => {
    return {
        groups: state.groups,
    }
}

export default connect(mapStateToProps)(ScoreSubmission);
