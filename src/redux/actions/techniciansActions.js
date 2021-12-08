import {
    TECHNICIANS_PENDING,
    TECHNICIANS_ERROR,
    TECHNICIANS_GETALL_SUCCESS,
    TECHNICIANS_TECHNICIAN_PENDING,
    TECHNICIANS_TECHNICIAN_ERROR,
    TECHNICIANS_TECHNICIAN_CLEAR,
    TECHNICIANS_TECHNICIAN_GET_SUCCESS,
    TECHNICIANS_TECHNICIAN_DELETE_SUCCESS,
    TECHNICIANS_TECHNICIAN_ADD_SUCCESS,
    TECHNICIANS_TECHNICIAN_EDIT_SUCCESS
} from './types';
import store from '../store'
import axios from 'axios';
import { API_URL, DEFAULT_ERROR_FETCH_MESSAGE } from '../../config';

let defaultErrorMessage = DEFAULT_ERROR_FETCH_MESSAGE;

export function getAllTechnicians() {

    return (dispatch) => {
        dispatch({ type: TECHNICIANS_PENDING, payload: {} });
        axios({
            url: `${API_URL}/technicians/`,
            method: "get",
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.success || response.error || !response.technicians) {
                    return dispatch({ type: TECHNICIANS_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: TECHNICIANS_GETALL_SUCCESS, payload: { message: response.message, technicians: response.technicians } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: TECHNICIANS_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function getTechnicianById(technicianId) {
    return (dispatch) => {
        dispatch({ type: TECHNICIANS_TECHNICIAN_PENDING, payload: {} });
        axios({
            url: `${API_URL}/technicians/${technicianId}`,
            method: "get",
            data: {},
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.data || response.error) {
                return dispatch({ type: TECHNICIANS_TECHNICIAN_ERROR, payload: { message: response.message } });
            }
            dispatch({ type: TECHNICIANS_TECHNICIAN_GET_SUCCESS, payload: { message: response.message, data: response.data } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            dispatch({ type: TECHNICIANS_TECHNICIAN_ERROR, payload: { message: error.response.data.message } });
        });
    }
}

export function addTechnician({ firstName, lastName, startWorkingDate, employeeRecord, dateOfBirth }) {
    return (dispatch) => {
        dispatch({ type: TECHNICIANS_TECHNICIAN_PENDING, payload: {} });
        const technician = { firstName, lastName, startWorkingDate, employeeRecord, dateOfBirth };
        axios({
            url: `${API_URL}/technicians`,
            method: "post",
            data: technician,
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.success || response.error) {
                    return dispatch({ type: TECHNICIANS_TECHNICIAN_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: TECHNICIANS_TECHNICIAN_ADD_SUCCESS, payload: { message: response.message, data: response.technician } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: TECHNICIANS_TECHNICIAN_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function editTechnician(_id, { firstName, lastName, startWorkingDate, employeeRecord, dateOfBirth }) {
    return (dispatch) => {
        dispatch({ type: TECHNICIANS_TECHNICIAN_PENDING, payload: {} });
        const technician = { firstName, lastName, startWorkingDate, employeeRecord, dateOfBirth };
        axios({
            url: `${API_URL}/technicians/${_id}`,
            method: "put",
            data: technician,
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data).then(response => {
            if (!response.success || response.error) {
                return dispatch({ type: TECHNICIANS_TECHNICIAN_ERROR, payload: { message: response.message } });
            }
            console.log(response);
            dispatch({ type: TECHNICIANS_TECHNICIAN_EDIT_SUCCESS, payload: { message: response.message, technician: response.technician } });

        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                defaultErrorMessage = error.response.data.message;
            }
            console.log(error);
            dispatch({ type: TECHNICIANS_TECHNICIAN_ERROR, payload: { message: defaultErrorMessage } });
        });
    }
}

export function deleteTechnician(technicianId) {
    return (dispatch) => {
        dispatch({ type: TECHNICIANS_TECHNICIAN_PENDING, payload: {} });
        axios({
            url: `${API_URL}/technicians/${technicianId}`,
            method: "delete",
            data: {},
            headers: { Authorization: `Bearer ${store.getState().auth.token}` }
        }).then(response => response.data)
            .then(response => {
                if (!response.success || response.error) {
                    return dispatch({ type: TECHNICIANS_TECHNICIAN_ERROR, payload: { message: response.message } });
                }
                dispatch({ type: TECHNICIANS_TECHNICIAN_DELETE_SUCCESS, payload: { message: response.message, data: technicianId } });

            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    defaultErrorMessage = error.response.data.message;
                }
                dispatch({ type: TECHNICIANS_TECHNICIAN_ERROR, payload: { message: defaultErrorMessage } });
            });
    }
}

export function clearTechnician() {
    return {
        type: TECHNICIANS_TECHNICIAN_CLEAR
    }
}