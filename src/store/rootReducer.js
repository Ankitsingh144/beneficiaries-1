// store/reducer.js
import { combineReducers } from 'redux';
import UserBenefiary from './reducer'; // Assuming your reducer is named 'userBeneficiaryReducer'

// Combine your reducers

const rootReducer = combineReducers({
    UserBenefiary
});

export default rootReducer;
