import { createPayloadedAction, PayloadedAction } from '.';
import { Forening } from '../reducers/admin';

export interface SetForeninger
  extends PayloadedAction<'admin/setForeninger', Forening[]> {}
export const setForeninger = createPayloadedAction<SetForeninger>(
  'admin/setForeninger'
);

export interface UpdateForening
  extends PayloadedAction<'admin/updateForening', Forening> {}
export const updateForening = createPayloadedAction<UpdateForening>(
  'admin/updateForening'
);

export interface AddForening
  extends PayloadedAction<'admin/addForening', Forening> {}
export const addForening = createPayloadedAction<AddForening>(
  'admin/addForening'
);

export type AdminActions = SetForeninger | UpdateForening | AddForening;
