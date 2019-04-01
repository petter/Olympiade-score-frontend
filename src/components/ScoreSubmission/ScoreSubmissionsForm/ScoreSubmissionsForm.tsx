import React, { useState, FunctionComponent } from 'react'
import Select from 'react-select';

import Button from '../../UI/Button/Button';
import styles from './ScoreSubmissionsForm.module.css';
import { GroupState } from '../../../store/reducers/groups';

const ScoreSubmissionsForm: FunctionComponent<ScoreSubmissionsFormProps> = (props) => {

    const [state, setState] = useState<ScoreSubmissionsFormState>({
        group: null,
        points: null,
    });


    // Cast maxPoints to number so we can compile
    const pointOptions = Array.from(Array(props.maxPoints as number + 1).keys()).map((_, i) => {
        return {
            value: i,
            label: i + ' poeng'
        }
    });

    const groupOptions = props.groups.map(el => {
        return {
            value: el.id,
            label: el.name + '(' + el.id + ')'
        }
    });

    type StateEntry = { group: SelectValue<string> } | { points: SelectValue<number> };
    const onChange = (value: StateEntry) => {
        const updatedState: ScoreSubmissionsFormState = {
            ...state,
            ...value,
        };

        setState(updatedState);

        if (props.onChange) props.onChange(updatedState);
    }

    return (
        <form className={styles.Form} onSubmit={props.onSubmit}>
            <label className={styles.Label}>
                Gruppe:
            </label>
            <Select
                options={groupOptions}
                className={styles.Select}
                value={state.group}
                onChange={(value) => {
                    onChange({ group: value as SelectValue<string> })
                }}
            />


            <label className={styles.Label}>
                Poeng:
            </label>
            <Select
                options={pointOptions}
                className={styles.Select}
                value={state.points}
                onChange={(value) => onChange({ points: value as SelectValue<number> })}
            />

            <Button type="submit">Submit</Button>
        </form>
    )
}

interface ScoreSubmissionsFormProps {
    groups: GroupState[];
    onSubmit?(event: React.FormEvent<HTMLFormElement>): void;
    onChange?(value: ScoreSubmissionsFormState): void;
    maxPoints?: number;
}

type SelectValue<T> = { value: T, label: string } | undefined | null;

export interface ScoreSubmissionsFormState {
    group: SelectValue<string>;
    points: SelectValue<number>;
}

ScoreSubmissionsForm.defaultProps = {
    maxPoints: 10,
}

export default ScoreSubmissionsForm
