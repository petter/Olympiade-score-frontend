import React, { Component } from 'react'
import { connect } from 'react-redux';
import Select from 'react-select';
import io from 'socket.io-client';

import { State } from '../../store/reducers';
import Button from '../UI/Button/Button';
import styles from './ScoreSubmission.module.css';
import { GroupState } from '../../store/reducers/groups';

class ScoreSubmission extends Component<ScoreSubmissionProps> {



    state: ScoreSubmissionState = {
        group: null,
        points: null,
    }


    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitted");
        if (this.state.group !== null && this.state.points !== null) {
            io('localhost:8080').emit('score_submit', {
                group: this.state.group.value,
                points: this.state.points.value,
            });
        }

        this.setState({ group: null, points: null });
    }

    validateInput = () => {
        return this.state.group && this.state.points;
    }

    render = () => {
        const groupOptions = this.props.groups.map(el => {
            return {
                value: el.id,
                label: el.name + '(' + el.id + ')'
            }
        });

        const pointOptions = Array.from(Array(11).keys()).map((_, i) => {
            return {
                value: i,
                label: i + ' poeng'
            }
        });

        return (
            <div className={styles.Container}>
                <h1 className={styles.FormTitle}>Poeng på post</h1>

                <form className={styles.Form} onSubmit={this.onSubmit}>
                    <label className={styles.Label}>
                        Gruppe:
                </label>
                    <Select
                        options={groupOptions}
                        className={styles.Select}
                        value={this.state.group}
                        onChange={(value) => this.setState({ group: value })}
                    />


                    <label className={styles.Label}>
                        Poeng:
                </label>
                    <Select
                        options={pointOptions}
                        className={styles.Select}
                        value={this.state.points}
                        onChange={(value) => this.setState({ points: value })}
                    />

                    <Button type="submit">Submit</Button>
                </form>

            </div >
        )
    }
}

interface ScoreSubmissionProps {
    groups: GroupState[];
}

type SelectValue<T> = { value: T, label: string }

interface ScoreSubmissionState {
    group: null | SelectValue<string>;
    points: null | SelectValue<number>;
}

const mapStateToProps = (state: State) => {
    return {
        groups: state.groups,
    }
}

export default connect(mapStateToProps)(ScoreSubmission);
