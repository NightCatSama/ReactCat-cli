import { handleActions } from 'redux-actions';
import * as ActionTypes from '../constants/DateActionType';

const initialState = [{
    year: null,
    month: null,
    day: null,
    limit: [new Date(2004,3,3), new Date(2016,8,15)],  //月份 0~11
    callback: null,
    switch: false,
    sign: 0
}];

const calendar = handleActions({
    [ActionTypes.DISPLAY_DATE](state, action){
        const sign = action.payload;
        let arr = Object.assign([], state);
        arr[sign].switch = !state[sign].switch;
        return Object.assign([], state, arr);
    },
    [ActionTypes.OPEN_DATE](state, action){
        const sign = action.payload;
        let arr = Object.assign([], state);
        arr[sign].switch = true;
        return Object.assign([], state, arr);
    },
    [ActionTypes.CLOSE_DATE](state, action){
        const sign = action.payload;
        let arr = Object.assign([], state);
        arr[sign].switch = false;
        return Object.assign([], state, arr);
    },
    [ActionTypes.SET_DATE](state, action){
        const Actions = action.payload;
        let arr = Object.assign([], state);
        Object.assign(arr[Actions.sign], Actions.date);
        return Object.assign([], state, arr);
    },
    [ActionTypes.INIT_DATE](){
        return initialState;
    },
    [ActionTypes.SET_LIMIT_DATE](state, action){
        const Actions = action.payload;
        let arr = Object.assign([], state);
        arr[Actions.sign].limit = Actions.limit;
        return Object.assign([], state, arr);
    }
}, initialState);

export default calendar;