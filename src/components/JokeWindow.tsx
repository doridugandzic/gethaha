import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IJoke } from '../models/models';
import { SetFavorites } from '../store/actions';
import { AppState } from '../store/saga';

interface IJokeWindowProps {
    joke: IJoke;
    storeData?: any;
    setFavoritesState?: ([]: IJoke[]) => void;
    saveThisJoke?: (id: any) => void;
}

function JokeWindow(props: IJokeWindowProps) {

    function addtoFavorites(jokeId: any) {
        const newFavs = props.storeData?.actions.favorites;
        if (!props.storeData?.actions.favorites?.includes(jokeId)) {
            newFavs.push(jokeId.toString())
            props.setFavoritesState?.(newFavs);
            props.saveThisJoke?.(jokeId.toString());
        }
    }

    function removeFromFavorites(jokeId: any) {
        const newFavs = props.storeData?.actions.favorites.filter(function (element: any) {
            return element != jokeId;
        });
        props.setFavoritesState?.(newFavs);
        props.saveThisJoke?.(jokeId.toString());
    }

    let jokeDeclr = (props.storeData?.actions?.favorites?.filter((e: any) => e == props.joke.id).length > 0)
    const isJokeFavorite = jokeDeclr ? <button onClick={() => removeFromFavorites(props.joke.id)}>Remove {props.joke.id} from favorites?</button > : <button onClick={(e) => addtoFavorites(props.joke.id)}>Add {props.joke.id} to favorites?</button>


    return (
        <div style={{ "display": "inline-flex" }}>
            {(props.joke.id) ?
                <div style={{ "margin": "20px" }}>
                    <div style={{ "width": "200px", "height": "fit-content", "border": "1px solid black", "maxHeight": "400px", "padding": "20px", "borderRadius": "15px", "minHeight": "150px", "display": "flex" }}>
                        {props.joke.joke ?
                            <div>
                                <div>{props.joke.joke}</div>
                            </div>
                            :
                            <div>
                                <div>{props.joke.setup}</div>
                                <div style={{ "paddingTop": "20px" }}>{props.joke.delivery}</div>
                            </div>
                        }
                    </div>
                    {isJokeFavorite}
                </div> : ""}
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
)(JokeWindow);
