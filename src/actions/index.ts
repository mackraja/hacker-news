import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as hackerAction from './hacker';

export function useActions(actions: any): any {
	const dispatch = useDispatch();
	return useMemo(
		() => {
			if (Array.isArray(actions)) {
				return actions.map(a => bindActionCreators(a, dispatch));
			}
			return bindActionCreators(actions, dispatch);
		},
		[dispatch, actions]
	);
}

export {
	hackerAction
 }