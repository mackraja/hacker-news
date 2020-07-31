import { createBrowserHistory, createHashHistory } from "history";
import localforage from "localforage";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { config } from 'dotenv';
import rootReducer from "./reducers";
import { ActionType } from '../model'
import { Api } from "../redux/api";

config();
const API_URL = process.env.REACT_APP_API_URL + '/api/v1';
const dev = process.env.NODE_ENV === "development";

// Redux Logger
const actionTypeEnumToString = (action: any): any => typeof action.type === 'number' && ActionType[action.type] ? ({
	type: ActionType[action.type],
	payload: action.payload,
  }) : action;
const logger = createLogger({ actionTransformer: actionTypeEnumToString });

// Redux thunk
const api = new Api(API_URL);
let middleware = dev
	 ?  applyMiddleware(logger, thunk.withExtraArgument(api))
	 :  applyMiddleware(thunk.withExtraArgument(api));

// Redux devtool
const composeEnhancers = composeWithDevTools({ actionSanitizer: actionTypeEnumToString });
if (dev) {
	middleware = composeEnhancers(middleware);
}

// Redux persist
const persistConfig = {
	key: "root",
	storage: localforage,
	version: 1,
	whitelist: ["hacker"],
	debug: (dev) ? true : false,
};

// History
const history = window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
	: createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, rootReducer());

export default () => {
	const store = createStore(persistedReducer, {}, middleware);
	const persistor = persistStore(store);	
	return { store, persistor };
};

export { history };