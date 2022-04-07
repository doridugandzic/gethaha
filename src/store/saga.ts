import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { actionsReducer } from './reducer';

export const rootReducer = combineReducers({
    actions: actionsReducer
});

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));
