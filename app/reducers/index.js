import { combineReducers } from 'redux';
import calendar from './calendar';
import sidebar from './sidebar';

const rootReducer = combineReducers({
	calendar,
	sidebar
});

export default rootReducer;