import { Action, ActionType } from "../../model";
import { Hacker } from "../../model/hacker";
import createReducer from "./createReducer";

export const hacker = createReducer({}, {
	[ActionType.GET_HACKER_NEWS](state: Hacker, action: Action<any>) {
		return {
			...state,
			hacker: action.payload
		}
	},	
});
