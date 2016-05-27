import { handleActions } from 'redux-actions';
import * as ActionTypes from '../constants/SidebarActionType';

const initialState = {
    show: true
};

// const sidebar = (state = initialState, action) => {
//     switch(action.type) {
//         case ActionTypes.DISPLAY_SIDEBAR:
//             return Object.assign({}, state, {show: !state.show});
//         default:
//             return state;
//     }
// };


const sidebar = handleActions({
    [ActionTypes.DISPLAY_SIDEBAR](state, action){
        return Object.assign({}, state, {show: !state.show});
    }
}, initialState);

export default sidebar;