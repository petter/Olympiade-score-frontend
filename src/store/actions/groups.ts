import { PayloadedAction, createPayloadedAction } from '.';
import { GroupState } from '../reducers/groups';

export interface GroupSetPayload<T> {
    id: string;
    value: T;
}

export interface GroupPayload {

}

export interface SetName extends PayloadedAction<'group/setName', GroupSetPayload<string>> { }
export const setName = createPayloadedAction<SetName>('group/setName');

export interface SetGroups extends PayloadedAction<'group/setGroups', GroupState[]> { };
export const setGroups = createPayloadedAction<SetGroups>('group/setGroups');

export type GroupActions =
    | SetGroups
    | SetName;
