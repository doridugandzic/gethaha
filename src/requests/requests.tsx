import { AxiosResponse } from 'axios';
import { IJoke } from '../models/models';

const axios = require('axios')

var api = 'https://v2.jokeapi.dev'

export function getRandomJoke() {
    return axios.get(`${api}/joke/Any`)
        .then(function (response: AxiosResponse<IJoke>) {
            console.log(response.data);
            return response.data;
        }).catch(function (error: any) {
            console.error("err: ", error)
        })
}

export function getJokeById(id: number) {
    return axios.get(`${api}/joke/Any?idRange=${id}`)
        .then(function (response: AxiosResponse<IJoke>) {
            console.log(response.data);
            return response.data;
        }).catch(function (error: any) {
            console.error("err: ", error)
        })
}

export function getJokeWithFilters() {
    return axios.get(`${api}/joke/Any?safe-mode`)
        .then(function (response: AxiosResponse<IJoke>) {
            console.log(response.data);
            return response.data;
        }).catch(function (error: any) {
            console.error("err: ", error)
        })
}

export function getMoreJokes(number: number, filtered?: boolean) {
    return axios.get(`${api}/joke/Any?amount=${number}${filtered ? "&safe-mode" : ""}`)
        .then(function (response: AxiosResponse<IJoke>) {
            console.log(response.data);
            return response.data;
        }).catch(function (error: any) {
            console.error("err: ", error)
        })
}