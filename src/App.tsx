import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Joke from './components/Joke';
import Home from './components/Home';
import FavJokes from './components/FavJokes';
import { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from "./store/saga";
import { IJoke } from './models/models';
import { SetFavorites } from './store/actions';

interface IAppProps {
  storeData?: any;
  setFavoritesState?: ([]: IJoke[]) => void;
}

function App(props: IAppProps) {
  function saveThisJoke(newFavs: any) {
    var favs = localStorage.getItem('favorites');
    var temp = favs?.split(',') || []
    if (temp.length === 0) {
      temp.push(newFavs);
      props.setFavoritesState?.(temp as any);
      localStorage.setItem("favorites", temp.toString());
    } else if (!temp.includes(newFavs.toString())) {
      for (let i = 0; i < temp?.length; i++) {
        temp.push(newFavs);
        props.setFavoritesState?.(temp as any);
        localStorage.setItem("favorites", temp.toString());
        break;
      }
    } else {
      var index = temp.indexOf(newFavs.toString());
      if (index !== -1) {
        temp.splice(index, 1);
        if (temp.length !== 0 && temp[0] !== "") {
          localStorage.setItem("favorites", temp.toString());
          props.setFavoritesState?.(temp as any);
        } else {
          props.setFavoritesState?.([]);
          localStorage.removeItem('favorites');
        }
      }
    }

  }

  return (
    <Router>
      <div><nav>
        <ul style={{ "maxHeight": "fit-content", "display": "flex", "paddingRight": "25px", "borderBottom": "1px solid black" }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/joke">Specific joke</Link></li>
          <li><Link to="/fav_jokes">Fav jokes</Link></li>
        </ul>
      </nav>
        <div style={{ "padding": "50px" }}>
          <Routes>
            <Route path="/joke" element={<Joke />} />
            <Route path="/fav_jokes" element={<FavJokes saveThisJoke={saveThisJoke} />} />
            <Route path="/" element={<Home saveThisJoke={saveThisJoke} />} />
          </Routes>
        </div>
      </div>
    </Router>
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
)(App);
