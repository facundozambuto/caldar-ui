import {
    BOILERS_PENDING,
    BOILERS_ERROR,
    BOILERS_GETALL_SUCCESS,
    BOILERS_BOILER_PENDING,
    BOILERS_BOILER_ERROR,
    BOILERS_BOILER_CLEAR,
    BOILERS_BOILER_GET_SUCCESS,
    BOILERS_BOILER_DELETE_SUCCESS,
    BOILERS_BOILER_ADD_SUCCESS,
    BOILERS_BOILER_EDIT_SUCCESS
} from './types';
import store from '../store'
import axios from 'axios';
import { API_URL, DEFAULT_ERROR_FETCH_MESSAGE } from '../../config';

let defaultErrorMessage = DEFAULT_ERROR_FETCH_MESSAGE;


export function getAllBoilers() {
    return (dispatch) => {
        dispatch({ type: BOILERS_PENDING, payload: {} });
        axios({
            url: `${API_URL}/boilers/`,
            method: "get",
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.success || response.error || !response.boilers) {
                    return dispatch({ type: BOILERS_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: BOILERS_GETALL_SUCCESS, payload: { message: response.message, boilers: response.boilers } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: BOILERS_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function getBoilerById(boilerId) {
    return (dispatch) => {
        dispatch({ type: BOILERS_BOILER_PENDING, payload: {} });
        axios({
            url: `${API_URL}/boilers/${boilerId}`,
            method: "get",
            data: {},
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.data || response.error) {
                return dispatch({ type: BOILERS_BOILER_ERROR, payload: { message: response.message } });
            }
            dispatch({ type: BOILERS_BOILER_GET_SUCCESS, payload: { message: response.message, data: response.data } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            dispatch({ type: BOILERS_BOILER_ERROR, payload: { message: error.response.data.message } });
        });
    }
}

export function addBoiler({ boilerId, brand, temperature, capacity, madeDate }) {
    return (dispatch) => {
        dispatch({ type: BOILERS_BOILER_PENDING, payload: {} });
        const boiler = { boilerId, brand, temperature, capacity, madeDate };
        axios({
            url: `${API_URL}/boilers`,
            method: "post",
            data: boiler,
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.success || response.error) {
                    return dispatch({ type: BOILERS_BOILER_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: BOILERS_BOILER_ADD_SUCCESS, payload: { message: response.message, data: response.boiler } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: BOILERS_BOILER_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function editBoiler(_id, { boilerId, brand, temperature, capacity, madeDate  }) {
    return (dispatch) => {
        dispatch({ type: BOILERS_BOILER_PENDING, payload: {} });
        const boiler = { boilerId, brand, temperature, capacity, madeDate  };
        axios({
            url: `${API_URL}/boilers/${_id}`,
            method: "put",
            data: boiler,
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.success || response.error) {
                return dispatch({ type: BOILERS_BOILER_ERROR, payload: { message: response.message } });
            }
            console.log(response);
            dispatch({ type: BOILERS_BOILER_EDIT_SUCCESS, payload: { message: response.message, boiler: response.boiler } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            console.log(error);
            dispatch({ type: BOILERS_BOILER_ERROR, payload: { message: defaultErrorMessage } });
        });
    }
}

export function deleteBoiler(boilerId) {
    return (dispatch) => {
        dispatch({ type: BOILERS_BOILER_PENDING, payload: {} });
        axios({
            url: `${API_URL}/boilers/${boilerId}`,
            method: "delete",
            data: {},
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.success || response.error) {
                    return dispatch({ type: BOILERS_BOILER_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: BOILERS_BOILER_DELETE_SUCCESS, payload: { message: response.message, data: boilerId } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: BOILERS_BOILER_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function clearBoiler() {
    return {
        type: BOILERS_BOILER_CLEAR
    }
}