import { GroupActions } from '../actions/groups';

export interface GroupState {
    id: string;
    name: string;
    score: number;
}

const groupPrefixes = ['P', 'Des', 'R', 'Dig', 'S'];
const groupNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


const dummyGroupNames = groupPrefixes.map((prefix, i) => groupNums.map((num) => prefix + num)).flat();

const dummyData = dummyGroupNames.map((el, i) => {
    return { id: i.toString(), name: el, score: Math.round(Math.random() * 1000) }
});

const initialState: GroupState[] = [];

const changeField = (object: GroupState, field: string, value: any): GroupState => {
    return {
        ...object,
        [field]: value,
    };
}

const changeFieldInArrayEntry = (array: GroupState[], id: string, field: string, value: any) => {
    return array.map((el) => el.id === id ? changeField(el, field, value) : el);
}

const reducer = (state = initialState, action: GroupActions) => {
    switch (action.type) {
        case 'group/setName':
            return changeFieldInArrayEntry(state, action.payload.id, 'name', action.payload.value);
        case 'group/setGroups':
            return action.payload;
        default:
            return state;
    }
}

export default reducer;