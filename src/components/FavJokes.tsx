import { useEffect, useState } from "react";
import { IJoke } from "../models/models";
import JokeWindow from "./JokeWindow";
import { getJokeById } from "../requests/requests";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from "../store/saga";
import {
    SetFavorites
} from '../store/actions'

interface IFavJokesProps {
    storeData?: any;
    setFavoritesState?: ([]: IJoke[]) => void
    saveThisJoke?: (id: any) => void;
}

function FavJokes(props: IFavJokesProps) {
    const [allJokes, setAllJokes] = useState([] as any);

    useEffect(() => {
        renderJokes();
    }, [])

    function saveJook(id: any) {
        props.saveThisJoke?.(id)
    }

    async function renderJokes() {
        for await (const id of props.storeData.actions.favorites) {
            let joke = await getJokeById(id);
            await allJokes.push(joke)
        }
    }

    const renderJokeList = allJokes.map((joke: any) => {
        return <JokeWindow saveThisJoke={saveJook} joke={joke}></JokeWindow>
    })

    return (
        <div>
            {(renderJokeList !== undefined) ? renderJokeList : ""}
        </div>
    );
}

const MapStateToProps = (store: AppState) => {
    return {
        storeData: store
    }
}

const MapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setFavoritesState: ((favorites: IJoke[]) => dispatch(SetFavorites(favorites)))
    }
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(FavJokes);
