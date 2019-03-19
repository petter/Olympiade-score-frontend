import { GroupActions } from './groups';


export interface PayloadedAction<TType, TPayload> {
    type: TType;
    payload: TPayload;
}

export interface Action<TType> {
    type: TType;
}

// Don't worry about it
export const createPayloadedAction = <TAction extends
    PayloadedAction<TAction["type"], TAction["payload"]>>(type: TAction["type"])
    : (payload: TAction["payload"]) => PayloadedAction<TAction["type"], TAction["payload"]> => {
    return (payload: TAction["payload"]) => ({
        type: type,
        payload
    });
}

export const createAction = <TAction extends Action<TAction['type']>>(type: TAction['type']): () => Action<TAction['type']> => {
    return () => ({
        type: type
    });
}

export type Actions =
    | GroupActions;
