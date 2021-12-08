import {
    TECHNICIANS_PENDING,
    TECHNICIANS_ERROR,
    TECHNICIANS_GETALL_SUCCESS,
    TECHNICIANS_CLEAR,
    TECHNICIANS_TECHNICIAN_PENDING,
    TECHNICIANS_TECHNICIAN_ERROR,
    TECHNICIANS_TECHNICIAN_CLEAR,
    TECHNICIANS_TECHNICIAN_GET_SUCCESS,
    TECHNICIANS_TECHNICIAN_ADD_SUCCESS,
    TECHNICIANS_TECHNICIAN_EDIT_SUCCESS,
    TECHNICIANS_TECHNICIAN_DELETE_SUCCESS
} from '../actions/types'

const initState = {
    isLoading: false,
    error: false,
    message: null,
    list: [],
    technician: {
        isLoading: false,
        error: false,
        message: null,
        data: {
            notes:[]
        }
    }
}

function techniciansReducer(state = initState, action) {
    switch (action.type) {
        case TECHNICIANS_PENDING:
            return {
                ...state,
                isLoading: true,
                error: null,
                message: action.payload.message
            }
        case TECHNICIANS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: action.payload.message
            }
        case TECHNICIANS_GETALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: action.payload.message,
                list: [...action.payload.technicians]
            }
        case TECHNICIANS_CLEAR:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: null,
            }
        case TECHNICIANS_TECHNICIAN_PENDING:
            return {
                ...state,
                technician: {
                    isLoading: true,
                    error: null,
                    message: action.payload.message
                }
            }
        case TECHNICIANS_TECHNICIAN_ERROR:
            return {
                ...state,
                technician: {
                    isLoading: false,
                    error: true,
                    message: action.payload.message,
                    data: {}
                }
            }
        case TECHNICIANS_TECHNICIAN_GET_SUCCESS:
            return {
                ...state,
                technician: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data.technician
                }
            }
        case TECHNICIANS_TECHNICIAN_ADD_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload.data],
                technician: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data
                }
            }
        case TECHNICIANS_TECHNICIAN_EDIT_SUCCESS:
            let updatedTechniciansEdit = [...state.list].map(technician => {
                if (technician._id === action.payload.technician._id){
                    technician = action.payload.technician;
                }
                return technician;
            });
            return {
                ...state,
                list: updatedTechniciansEdit,
                technician: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.technician
                }
            }
        case TECHNICIANS_TECHNICIAN_DELETE_SUCCESS:
            let updatedTechnicians = [...state.list].filter(technician => technician._id !== action.payload.data);
            return {
                ...state,
                list: updatedTechnicians,
                technician: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: {}
                }
            }
        case TECHNICIANS_TECHNICIAN_CLEAR:
            return {
                ...state,
                technician: {
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

export default techniciansReducer;