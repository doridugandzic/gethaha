import { IJoke } from "../models/models"

export const SET_FAVORITES = "SET_FAVORITES"
export const SET_MULTIPLES = "SET_MULTIPLES"

export interface SetFavoritesAction {
    type: typeof SET_FAVORITES
    payload: IJoke[]
}

export function SetFavorites(jokes: IJoke[]): SetFavoritesAction {
    return {
        type: SET_FAVORITES,
        payload: jokes
    }
}

export interface SetMultiplesAction {
    type: typeof SET_MULTIPLES
    payload: IJoke[]
}

export function SetMultiples(jokes: IJoke[]): SetMultiplesAction {
    return {
        type: SET_MULTIPLES,
        payload: jokes
    }
}

export type ActionTypes = SetFavoritesAction | SetMultiplesAction;
export type AppActions = ActionTypes;