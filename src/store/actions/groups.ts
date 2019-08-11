import { PayloadedAction, createPayloadedAction } from '.';
import { GroupState } from '../reducers/groups';

export interface GroupPayload<T> {
  id: string;
  value: T;
}

export interface SetName
  extends PayloadedAction<'group/setName', GroupPayload<string>> {}
export const setName = createPayloadedAction<SetName>('group/setName');

export interface SetScore
  extends PayloadedAction<'groups/setScore', GroupPayload<number>> {}
export const setScore = createPayloadedAction<SetScore>('groups/setScore');

export interface AddScore
  extends PayloadedAction<'groups/addScore', GroupPayload<number>> {}
export const addScore = createPayloadedAction<AddScore>('groups/addScore');

export interface SubScore
  extends PayloadedAction<'groups/subScore', GroupPayload<number>> {}
export const subScore = createPayloadedAction<SubScore>('groups/subScore');

export interface SetGroups
  extends PayloadedAction<'group/setGroups', GroupState[]> {}
export const setGroups = createPayloadedAction<SetGroups>('group/setGroups');

export interface AddGroup
  extends PayloadedAction<'group/addGroup', GroupState> {}
export const addGroup = createPayloadedAction<AddGroup>('group/addGroup');

export interface RemoveGroup
  extends PayloadedAction<'group/removeGroup', string> {}
export const removeGroup = createPayloadedAction<RemoveGroup>(
  'group/removeGroup'
);

export type GroupActions =
  | SetGroups
  | AddGroup
  | RemoveGroup
  | SetScore
  | AddScore
  | SubScore
  | SetName;
