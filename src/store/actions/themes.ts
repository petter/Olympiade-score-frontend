import { PayloadedAction, createPayloadedAction } from '.';

export interface SetTheme extends PayloadedAction<'theme/setTheme', string> {}
export const setTheme = createPayloadedAction<SetTheme>('theme/setTheme');

export type ThemeActions = SetTheme;
