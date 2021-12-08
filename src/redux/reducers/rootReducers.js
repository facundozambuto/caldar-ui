import { combineReducers } from 'redux';
import authReducer from './authReducer';
import boilersReducer from './boilersReducer';
import techniciansReducer from './techniciansReducer';

export default combineReducers({
  auth: authReducer,
  boilers: boilersReducer,
  technicians: techniciansReducer
});