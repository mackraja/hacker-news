import { Action, ActionType, Alert } from "../../model";
import createReducer from "./createReducer";

export const alert = createReducer<Alert>({ message: '', statusCode: 200 }, {
	[ActionType.ALERT](state: Alert, action: Action<Alert>) {
		return action.payload;
	},
});
