import { PayloadedAction, createPayloadedAction } from '.';

export interface GroupPayload<T> {
    id: string;
    value: T;
}
export interface SetName extends PayloadedAction<'group/setName', GroupPayload<string>> { }
export const setName = createPayloadedAction<SetName>('group/setName');

export type GroupActions =
    | SetName;
