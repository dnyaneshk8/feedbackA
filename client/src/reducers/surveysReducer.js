import { FETCH_SURVEYS } from "../actions/types";

export default function(state = null, action) {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload || false;
			break;
		default:
			return state;
			break;
	}
	return state;
}
