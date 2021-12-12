import {
    SERVICES_PENDING,
    SERVICES_ERROR,
    SERVICES_GETALL_SUCCESS,
    SERVICES_CLEAR,
    SERVICES_SERVICE_PENDING,
    SERVICES_SERVICE_ERROR,
    SERVICES_SERVICE_CLEAR,
    SERVICES_SERVICE_GET_SUCCESS,
    SERVICES_SERVICE_ADD_SUCCESS,
    SERVICES_SERVICE_EDIT_SUCCESS,
    SERVICES_SERVICE_DELETE_SUCCESS
} from '../actions/types'

const initState = {
    isLoading: false,
    error: false,
    message: null,
    list: [],
    service: {
        isLoading: false,
        error: false,
        message: null,
        data: {
        
        }
    }
}

function servicesReducer(state = initState, action) {
    switch (action.type) {
        case SERVICES_PENDING:
            return {
                ...state,
                isLoading: true,
                error: null,
                message: action.payload.message
            }
        case SERVICES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: action.payload.message
            }
        case SERVICES_GETALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: action.payload.message,
                list: [...action.payload.services]
            }
        case SERVICES_CLEAR:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: null,
            }
        case SERVICES_SERVICE_PENDING:
            return {
                ...state,
                service: {
                    isLoading: true,
                    error: null,
                    message: action.payload.message
                }
            }
        case SERVICES_SERVICE_ERROR:
            return {
                ...state,
                service: {
                    isLoading: false,
                    error: true,
                    message: action.payload.message,
                    data: {}
                }
            }
        case SERVICES_SERVICE_GET_SUCCESS:
            return {
                ...state,
                service: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data.service
                }
            }
        case SERVICES_SERVICE_ADD_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload.data],
                service: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data
                }
            }
        case SERVICES_SERVICE_EDIT_SUCCESS:
            let updatedServicesEdit = [...state.list].map(service => {
                if (service._id === action.payload.service._id){
                    service = action.payload.service;
                }
                return service;
            });
            return {
                ...state,
                list: updatedServicesEdit,
                service: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.service
                }
            }
        case SERVICES_SERVICE_DELETE_SUCCESS:
            let updatedServices = [...state.list].filter(service => service._id !== action.payload.data);
            return {
                ...state,
                list: updatedServices,
                service: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: {}
                }
            }
        case SERVICES_SERVICE_CLEAR:
            return {
                ...state,
                service: {
                    isLoading: false,
                    error: false,
                    message: null,
                    data: {}
                }
            }
        default:
            return state
    }
}

export default servicesReducer;