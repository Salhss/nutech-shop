import {
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_BYID,
  FETCH_PRODUCT_BYCATEGORY,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case FETCH_PRODUCT_BYID:
      return {
        ...state,
        product: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_PRODUCT_BYCATEGORY:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
