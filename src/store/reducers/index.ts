import { combineReducers } from 'redux';
import groupReducer, { GroupState } from './groups';
import themeReducer, { IThemeState } from './themes';

const rootReducer = combineReducers({
    groups: groupReducer,
    themes: themeReducer,
});

export interface State {
    groups: GroupState[];
    themes: IThemeState;
}

export default rootReducer;