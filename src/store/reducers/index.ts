import { combineReducers } from 'redux';
import groupReducer, { GroupState } from './groups';
import themeReducer, { IThemeState } from './themes';
import adminReducer, { AdminState } from './admin';

const rootReducer = combineReducers({
  groups: groupReducer,
  themes: themeReducer,
  admin: adminReducer,
});

export interface State {
  groups: GroupState[];
  themes: IThemeState;
  admin: AdminState;
}

export default rootReducer;
