import { ThemeActions } from "../actions/themes";

const createThemeItem = (
    primary: string,
    primaryText: string,
    secondary: string,
    secondaryText: string,
    background: string = '#ffffff',
    backgroundText: string = '#000000',
    surface: string = '#ffffff',
    surfaceText: string = '#000000',
    error: string = '#c51111',
    errorText: string = '#ffffff'): IThemeStateItem => {
    return {
        primary,
        primaryText,
        secondary,
        secondaryText,
        background,
        backgroundText,
        surface,
        surfaceText,
        error,
        errorText,
    }
}

const initialState: IThemeState = {
    active: 'vivid',
    themes: {
        vivid: createThemeItem(
            '#D15663',
            '#FFFCF9',
            '#FCD581',
            '#352D39',
            '#FFFCF9',
            'black',
            '#352D39',
            '#FFFCF9'),
    }
};

const reducer = (state = initialState, action: ThemeActions) => {
    switch (action.type) {
        case 'theme/setTheme':
            return { ...state, active: action.payload };
        default:
            return state;

    }
}

export interface IThemeStateItem {
    primary: string;
    primaryText: string;
    secondary: string;
    secondaryText: string;
    background: string;
    backgroundText: string;
    surface: string;
    surfaceText: string;
    error: string;
    errorText: string;
}


export interface IThemeState {
    active: string,
    themes: {
        [key: string]: IThemeStateItem;
    }
}

export default reducer;