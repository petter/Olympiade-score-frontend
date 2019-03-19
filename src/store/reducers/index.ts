import { combineReducers } from 'redux';
import groupReducer, { GroupState } from './groups';

const rootReducer = combineReducers({
    groups: groupReducer,
});

export interface State {
    groups: GroupState[];
}

export default rootReducer;