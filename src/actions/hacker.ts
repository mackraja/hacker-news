import { ActionType } from "../model";

export const getHackerNews = (query: { page: number }) => async (dispatch: Function, getState: Function, api: any)  => {
	try {
		let resp: any = await api.get('search', {}, query);
		dispatch({ type: ActionType.ALERT, payload: {
			message:  'Welcome to Hacker News Dashboard',
			statusCode: 200
		} });
		return dispatch({
			type: ActionType.GET_HACKER_NEWS,
			payload: {
				rowsPerPage: resp.hitsPerPage,
				pageNo: resp.page,
				news: resp.hits,
				totalPage: resp.nbPages
			}
		});
	} catch(err) {
		return dispatch({ type: ActionType.ALERT, payload: err });
	}
};

export const getFilteredNews = (query: { page: number }) => async (dispatch: Function, getState: Function, api: any)  => {
	try {
		let resp: any = await api.get('search', {}, query);				
		return dispatch({
			type: ActionType.GET_HACKER_NEWS,
			payload: {
				rowsPerPage: resp.hitsPerPage,
				pageNo: resp.page,
				news: resp.hits,
				totalPage: resp.nbPages
			}
		});
	} catch(err) {
		return dispatch({ type: ActionType.ALERT, payload: err });
	}
};

export const getActionNews = (objectID: string, action: string) => async (dispatch: Function, getState: Function, api: any)  => {
	try {

		const { hacker: { news, pageNo, rowsPerPage, totalPage } } = getState().hacker;
		
		let updatedNews = news;
		let newMsg = '';
		if (action === 'upVote') {
			newMsg = 'Hacker upVote updated';
			updatedNews = updatedNews.map((v: any) => {
				if (v.objectID === objectID) {
					v.points = v.points + 1;
				}
				return v;
			});
		} else if (action === 'delete') {
			newMsg = 'Hacker News deleted';
			updatedNews = updatedNews.filter((v: any) => v.objectID !== objectID);
		}

		dispatch({ type: ActionType.ALERT, payload: {
			message:  newMsg,
			statusCode: 200
		} });
		return dispatch({
			type: ActionType.GET_HACKER_NEWS,
			payload: {
				rowsPerPage,
				pageNo,
				news: updatedNews,
				totalPage
			}
		});
	} catch(err) {
		return dispatch({ type: ActionType.ALERT, payload: err });
	}
};

export const closeAlert = () => async (dispatch: Function, getState: Function, api: any) => {
	return dispatch({ type: ActionType.ALERT, payload: {} });
};
