import React, { Component } from 'react'
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { State } from '../../store/reducers';
import styles from './ScoreSubmission.module.css';
import { GroupState } from '../../store/reducers/groups';
import DefaultLoader from '../UI/DefaultLoader/DefaultLoader';
import ScoreSubmissionsForm, { ScoreSubmissionsFormState } from './ScoreSubmissionsForm/ScoreSubmissionsForm';
import toast from '../../utils/toast/toast';
import withLogin from '../../hoc/withLogin/withLogin';

class ScoreSubmission extends Component<ScoreSubmissionProps> {

    state: ScoreSubmissionState = {
        loading: false,
        form: null,
    }


    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitted");
        if (this.state.form && this.state.form.group && this.state.form.points) {
            this.props.socket.emit('score_submit', {
                group: this.state.form.group.value,
                points: this.state.form.points.value,
            }, () => {
                toast.success('Score ble oppdatert!');
                this.setState({ loading: false })
            });
            this.setState({ loading: true });
        }

        this.setState({ group: null, points: null });
    }

    validateInput = () => {
        return this.state.form && this.state.form.group && this.state.form.points;
    }

    render = () => {

        const content = this.state.loading ?
            (<DefaultLoader />) : (
                <ScoreSubmissionsForm
                    onSubmit={this.onSubmit}
                    onChange={(value) => this.setState({ form: value })}
                    groups={this.props.groups} />
            );
        return (
            <>
                <div className={styles.Container}>
                    <h1 className={styles.FormTitle}>Poeng på post</h1>
                    {content}
                </div >
            </>
        )
    }
}

interface ScoreSubmissionProps {
    groups: GroupState[];
    socket: SocketIOClient.Socket;
}

interface ScoreSubmissionState {
    loading: boolean;
    form: ScoreSubmissionsFormState | null;
}

const mapStateToProps = (state: State) => {
    return {
        groups: state.groups,
    }
}

export default withLogin(connect(mapStateToProps)(ScoreSubmission));
