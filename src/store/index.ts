import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import DevTools from '../containers/DevTools/DevTools';

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk, createLogger()),
            DevTools.instrument(),
        )
    );

    return store;
}

const store = configureStore();

export default store;