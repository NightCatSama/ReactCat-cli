import { createAction } from 'redux-actions';
import * as ActionTypes from '../constants/SidebarActionType';

const SidebarActions = {
	displaySidebar: createAction(ActionTypes.DISPLAY_SIDEBAR),
};
export default SidebarActions;