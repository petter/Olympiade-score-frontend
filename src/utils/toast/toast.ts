import { toast, ToastContent, ToastOptions } from 'react-toastify';;
import { css } from 'glamor';
import store from '../../store';
import { State } from '../../store/reducers';
import { IThemeStateItem } from '../../store/reducers/themes';

const select = (state: State) => {
    return state.themes.themes[state.themes.active];
}

let theme: IThemeStateItem = select(store.getState());
const handleStoreChange = () => {
    theme = select(store.getState());

}

const unsubscribe = store.subscribe(handleStoreChange);

const defaultOptions: ToastOptions = {
    className: {
        borderRadius: '2px',
    },
}

const successOptions: ToastOptions = {
    ...defaultOptions,
    className: css({
        ...defaultOptions.className as object,
        backgroundColor: theme.primary,
        color: theme.primaryText,
    }),
}

const errorOptions: ToastOptions = {
    ...defaultOptions,
    className: css({
        ...defaultOptions.className as object,
        backgroundColor: theme.error,
        color: theme.errorText,
    }),

}

export default {
    success(msg: ToastContent, options = {}) {
        return toast.success(msg, {
            ...options,
            ...successOptions,
        })
    },

    error(msg: ToastContent, options = {}) {
        return toast.error(msg, {
            ...errorOptions,
            ...options,

        })
    }
}

