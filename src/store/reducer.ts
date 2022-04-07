
import { IJoke } from '../models/models';
import {
    ActionTypes,
    SET_FAVORITES,
    SET_MULTIPLES
} from './actions';

interface IDefaultStateData {
    favorites: IJoke[];
    multiples: IJoke[];
}

export const actionsReducerDefaultState: IDefaultStateData = {
    favorites: [],
    multiples: []
}

const actionsReducer = (state = actionsReducerDefaultState, action: ActionTypes): IDefaultStateData => {
    switch (action.type) {
        case SET_FAVORITES:
            return { ...state, favorites: action.payload };
        case SET_MULTIPLES:
            return { ...state, favorites: action.payload };
        default:
            return state;
    }
}

export { actionsReducer };