import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boilersReducer from './boilersReducer';

export default combineReducers({
  auth: authReducer,
  boilers:boilersReducer
});