import {
    BOILERS_PENDING,
    BOILERS_ERROR,
    BOILERS_GETALL_SUCCESS,
    BOILERS_CLEAR,
    BOILERS_BOILER_PENDING,
    BOILERS_BOILER_ERROR,
    BOILERS_BOILER_CLEAR,
    BOILERS_BOILER_GET_SUCCESS,
    BOILERS_BOILER_ADD_SUCCESS,
    BOILERS_BOILER_EDIT_SUCCESS,
    BOILERS_BOILER_DELETE_SUCCESS
} from '../actions/types'

const initState = {
    isLoading: false,
    error: false,
    message: null,
    list: [],
    boiler: {
        isLoading: false,
        error: false,
        message: null,
        data: {
            notes:[]
        }
    }
}

function boilersReducer(state = initState, action) {
    switch (action.type) {
        case BOILERS_PENDING:
            return {
                ...state,
                isLoading: true,
                error: null,
                message: action.payload.message
            }
        case BOILERS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: action.payload.message
            }
        case BOILERS_GETALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: action.payload.message,
                list: [...action.payload.boilers]
            }
        case BOILERS_CLEAR:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: null,
            }
        case BOILERS_BOILER_PENDING:
            return {
                ...state,
                boiler: {
                    isLoading: true,
                    error: null,
                    message: action.payload.message
                }
            }
        case BOILERS_BOILER_ERROR:
            return {
                ...state,
                boiler: {
                    isLoading: false,
                    error: true,
                    message: action.payload.message,
                    data: {}
                }
            }
        case BOILERS_BOILER_GET_SUCCESS:
            return {
                ...state,
                boiler: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data.boiler
                }
            }
        case BOILERS_BOILER_ADD_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload.data],
                boiler: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.data
                }
            }
        case BOILERS_BOILER_EDIT_SUCCESS:
            let updatedBoilersEdit = [...state.list].map(boiler => {
                if (boiler._id === action.payload.boiler._id){
                    boiler = action.payload.boiler;
                }
                return boiler;
            });
            return {
                ...state,
                list: updatedBoilersEdit,
                boiler: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: action.payload.boiler
                }
            }
        case BOILERS_BOILER_DELETE_SUCCESS:
            let updatedBoilers = [...state.list].filter(boiler => boiler._id !== action.payload.data);
            return {
                ...state,
                list: updatedBoilers,
                boiler: {
                    isLoading: false,
                    error: false,
                    message: action.payload.message,
                    data: {}
                }
            }
        case BOILERS_BOILER_CLEAR:
            return {
                ...state,
                boiler: {
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

export default boilersReducer;