import { GroupActions } from '../actions/groups';

export interface GroupState {
    id: string;
    name: string;
    score: number;
}


const initialState: GroupState[] = [];

const changeField = (object: GroupState, field: string, value: any): GroupState => {
    return {
        ...object,
        [field]: value,
    };
}

const findObjectWithId = (array: GroupState[], id: string) => {
    array.forEach((el) => { if (el.id === id) return el });
    return null;
}

const changeObjInArray = (array: GroupState[], id: string, fn: (el: GroupState) => GroupState) => {
    return array.map((el) => el.id === id ? fn(el) : el);
}

const reducer = (state = initialState, action: GroupActions) => {
    switch (action.type) {
        case 'group/setName':
            return changeObjInArray(state, action.payload.id, (el) => changeField(el, 'name', action.payload.value));
        case 'group/setGroups':
            return action.payload;
        case 'group/addGroup':
            const newState = state.slice();
            newState.push(action.payload);
            return newState;
        case 'group/removeGroup':
            return state.filter((el) => el.id !== action.payload);
        case 'groups/setScore':
            return changeObjInArray(state, action.payload.id, (el) => changeField(el, 'score', action.payload.value));
        case 'groups/addScore':
            return changeObjInArray(state, action.payload.id, (el) => changeField(el, 'score', el.score + action.payload.value));
        case 'groups/subScore':
            return changeObjInArray(state, action.payload.id, (el) => changeField(el, 'score', el.score - action.payload.value));
        default:
            return state;
    }
}

export default reducer;