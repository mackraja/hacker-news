import { combineReducers } from "redux";
import { Hacker } from "../../model/hacker";
import { Alert } from "../../model";

import * as hackerReducer from "./hacker";
import * as alertReducer from "./alert";

export interface RootState {
	hacker: Hacker;
	alert: Alert;
}

export default () =>
	combineReducers({
		...hackerReducer,
		...alertReducer,
	});
