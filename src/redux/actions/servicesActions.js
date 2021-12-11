import {
    SERVICES_PENDING,
    SERVICES_ERROR,
    SERVICES_GETALL_SUCCESS,
    SERVICES_SERVICE_PENDING,
    SERVICES_SERVICE_ERROR,
    SERVICES_SERVICE_CLEAR,
    SERVICES_SERVICE_GET_SUCCESS,
    SERVICES_SERVICE_DELETE_SUCCESS,
    SERVICES_SERVICE_ADD_SUCCESS,
    SERVICES_SERVICE_EDIT_SUCCESS
} from './types';
import store from '../store'
import axios from 'axios';
import { API_URL, DEFAULT_ERROR_FETCH_MESSAGE } from '../../config';

let defaultErrorMessage = DEFAULT_ERROR_FETCH_MESSAGE;

export function getAllServices() {

    return (dispatch) => {
        dispatch({ type: SERVICES_PENDING, payload: {} });
        axios({
            url: `${API_URL}/services/`,
            method: "get",
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.success || response.error || !response.services) {
                    return dispatch({ type: SERVICES_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: SERVICES_GETALL_SUCCESS, payload: { message: response.message, services: response.services } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: SERVICES_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function getServiceById(serviceId) {
    return (dispatch) => {
        dispatch({ type: SERVICES_SERVICE_PENDING, payload: {} });
        axios({
            url: `${API_URL}/services/${serviceId}`,
            method: "get",
            data: {},
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.data || response.error) {
                return dispatch({ type: SERVICES_SERVICE_ERROR, payload: { message: response.message } });
            }
            dispatch({ type: SERVICES_SERVICE_GET_SUCCESS, payload: { message: response.message, data: response.data } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            dispatch({ type: SERVICES_SERVICE_ERROR, payload: { message: error.response.data.message } });
        });
    }
}

export function addService({ customer, title, start, end, boilerId, technicianId }) {
    return (dispatch) => {
        dispatch({ type: SERVICES_SERVICE_PENDING, payload: {} });
        const service = { customer, title, start, end, boilerId, technicianId };
        axios({
            url: `${API_URL}/services`,
            method: "post",
            data: service,
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.success || response.error) {
                    return dispatch({ type: SERVICES_SERVICE_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: SERVICES_SERVICE_ADD_SUCCESS, payload: { message: response.message, data: response.service } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: SERVICES_SERVICE_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function editService(_id, { customer, title, start, end, boilerId, technicianId  }) {
    return (dispatch) => {
        dispatch({ type: SERVICES_SERVICE_PENDING, payload: {} });
        const service = { customer, title, start, end, boilerId, technicianId };
        axios({
            url: `${API_URL}/services/${_id}`,
            method: "put",
            data: service,
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.success || response.error) {
                return dispatch({ type: SERVICES_SERVICE_ERROR, payload: { message: response.message } });
            }
            console.log(response);
            dispatch({ type: SERVICES_SERVICE_EDIT_SUCCESS, payload: { message: response.message, service: response.service } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            console.log(error);
            dispatch({ type: SERVICES_SERVICE_ERROR, payload: { message: defaultErrorMessage } });
        });
    }
}

export function deleteService(serviceId) {
    return (dispatch) => {
        dispatch({ type: SERVICES_SERVICE_PENDING, payload: {} });
        axios({
            url: `${API_URL}/services/${serviceId}`,
            method: "delete",
            data: {},
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.success || response.error) {
                    return dispatch({ type: SERVICES_SERVICE_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: SERVICES_SERVICE_DELETE_SUCCESS, payload: { message: response.message, data: serviceId } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: SERVICES_SERVICE_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function clearService() {
    return {
        type: SERVICES_SERVICE_CLEAR
    }
}