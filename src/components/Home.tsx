import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { IJoke } from '../models/models';
import { getRandomJoke, getJokeWithFilters, getMoreJokes } from '../requests/requests';
import { AppState } from '../store/saga';
import JokeWindow from './JokeWindow';
import { connect } from "react-redux";
import {
    SetFavorites,
    SetMultiples
} from '../store/actions'


interface IHomeProps {
    storeData?: any;
    setFavoritesState?: ([]: IJoke[]) => void;
    saveThisJoke: (newFavs: any) => void;
    setMultiplesState: ([]: IJoke[]) => void;
}

function Home(props: IHomeProps) {
    useEffect(() => {
        var favs = localStorage.getItem('favorites');
        var temp = favs?.split(',') || [];
        props.setFavoritesState?.(temp as any);
    }, []);

    const [moreJokes, setMoreJokes] = useState(false);
    const [joke, setJoke] = useState({} as IJoke);
    const [offensive, setOffensive] = useState(false);
    const [numJokes, setNumJokes] = useState("" as any);
    const [multiple, setMultiple] = useState([] as any);

    async function getJoke() {
        var joke;
        if (offensive) {
            joke = await getJokeWithFilters();
        } else {
            joke = await getRandomJoke();
        }
        await setJoke(joke);
    }

    async function getMultiJokes() {
        setJoke({} as any);
        setMultiple([] as any);
        let multiJokes = await getMoreJokes(numJokes, offensive)
        setMultiple(multiJokes);
    }


    function saveJook(id: any) {
        props.saveThisJoke(id)
    }

    const renderJokeList = (multiple.jokes?.length > 0) ? multiple.jokes.map((joke: any) => {
        return <JokeWindow saveThisJoke={saveJook} joke={joke}></JokeWindow>
    }) : ""

    return (
        <div>
            <div>do you not like offensive jokes? <input checked={!offensive} type={"checkbox"} onChange={() => setOffensive(!offensive)}></input></div>
            <div>do you want more jokes? <input checked={moreJokes} type={"checkbox"} onChange={() => setMoreJokes(!moreJokes)}></input></div>

            {!moreJokes ? (<button onClick={() => getJoke()}>Get 1 joke</button>) :
                (<button onClick={() => getMultiJokes()}>Get more jokes</button>)}
            {moreJokes ? <input type={"number"} placeholder="How many jokes?" min={1} max={10} onChange={(e) => setNumJokes(e.target.value)}></input> : ""}
            <JokeWindow joke={joke} saveThisJoke={saveJook}></JokeWindow>
            {moreJokes ? (renderJokeList !== undefined) ? renderJokeList : "" : ""}
        </div >
    );
}


const MapStateToProps = (store: AppState) => {
    return {
        storeData: store
    };
};


const MapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setFavoritesState: ((favorites: IJoke[]) => dispatch(SetFavorites(favorites))),
        setMultiplesState: ((multiples: IJoke[]) => dispatch(SetMultiples(multiples)))
    }
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(Home);
