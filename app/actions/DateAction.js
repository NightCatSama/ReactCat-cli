import { createAction } from 'redux-actions';
import * as ActionTypes from '../constants/DateActionType';

const DateActions = {
	displayDate: createAction(ActionTypes.DISPLAY_DATE, (sign) => sign),
	openDate: createAction(ActionTypes.OPEN_DATE, (sign) => sign || 0),
	closeDate: createAction(ActionTypes.CLOSE_DATE, (sign) => sign),
	initDate: createAction(ActionTypes.INIT_DATE, (sign) => sign),
	setDate: createAction(ActionTypes.SET_DATE, (date, sign) => ({date, sign})),
	setLimitDate: createAction(ActionTypes.SET_LIMIT_DATE, (limit, sign) => ({limit, sign})),
};

export default DateActions;