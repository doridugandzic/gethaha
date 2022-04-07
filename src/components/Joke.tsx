import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJokeById } from "../requests/requests";
import JokeWindow from "./JokeWindow";

export default function Joke() {
    const [jokeId, setJokeId] = useState("" as any);
    const [jokeWithId, setJokeWithId] = useState("" as any);

    async function getJokeId() {
        let joke = await getJokeById(jokeId);
        await setJokeWithId(joke);
    }


    return (
        <div>
            <input onChange={(e) => setJokeId(e.target.value)}></input>
            <button disabled={jokeId === ""} onClick={() => getJokeId()}>Kleek mi tu get jook vit jur id</button>
            <JokeWindow joke={jokeWithId}></JokeWindow>
        </div>
    );
};