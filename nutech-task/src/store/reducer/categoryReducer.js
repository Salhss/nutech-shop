import {
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  categories: [],
  loading: false,
  error: false,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
