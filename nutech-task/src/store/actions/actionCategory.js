import {
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
} from "../actions/actionTypes";
import { productUrl } from "../baseUrl/url";

export function fetchCategoryRequest() {
  return {
    type: FETCH_CATEGORY_REQUEST,
  };
}

export function fetchCategorySuccess(payload) {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload: payload,
  };
}

export function fetchCategoryFailure(error) {
  return {
    type: FETCH_CATEGORY_FAILURE,
    payload: error,
  };
}

export function fetchCategory() {
  return async (dispatch) => {
    dispatch(fetchCategoryRequest());

    try {
      const response = await fetch(productUrl + "/categories");
      if (!response.ok) throw new Error("Failed fetch category");

      const data = await response.json();
      dispatch(fetchCategorySuccess(data));
    } catch (error) {
      dispatch(fetchCategoryFailure(error));
    }
  };
}
