import {
  FETCH_PRODUCT_BYID,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_BYCATEGORY,
} from "./actionTypes";
import { productUrl } from "../baseUrl/url";

export function fetchProductRequest() {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
}

export function fetchProductSuccess(payload) {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: payload,
  };
}

export function fetchProductFailure(error) {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
  };
}

export function fetchProductById(payload) {
  return {
    type: FETCH_PRODUCT_BYID,
    payload: payload,
  };
}

export function fetchProductByCategory(payload) {
  return {
    type: FETCH_PRODUCT_BYCATEGORY,
    payload: payload,
  };
}

export function fetchProducts(querySearch) {
  //tidak boleh ada return diatas dispatch, thunk tidak bisa terbaca
  console.log("dari action>>>", querySearch);
  return async (dispatch) => {
    dispatch(fetchProductRequest());

    try {
      const response = await fetch(productUrl + `?title=${querySearch}`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();

      dispatch(fetchProductSuccess(data));
    } catch (error) {
      dispatch(fetchProductFailure(error));
    }
  };
}

export function fetchProductsId(id) {
  return async (dispatch) => {
    dispatch(fetchProductRequest());

    try {
      const response = await fetch(productUrl + `/${id}`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      dispatch(fetchProductById(data));
    } catch (error) {
      dispatch(fetchProductFailure(error));
    }
  };
}

export function fetchProductCategory(id) {
  return async (dispatch) => {
    dispatch(fetchProductRequest());

    try {
      const response = await fetch(productUrl + `/product/categories/${id}`);
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json;

      dispatch(fetchProductByCategory(data));
    } catch (error) {
      dispatch(fetchProductFailure(error));
    }
  };
}

export function createProduct(dataProduct) {
  return async (dispatch) => {
    try {
      const response = await fetch(productUrl, {
        method: "POST",
        headers: {
          // access_token: localStorage.getItem("access_token"),
          "content-type": "application/json",
        },
        body: JSON.stringify(dataProduct),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const data = await response.json();
      dispatch(fetchProducts(""));
    } catch (error) {
      throw error;
    }
  };
}

export function updateProduct(dataProduct, id) {
  return async (dispatch) => {
    try {
      const response = await fetch(productUrl + `/${id}`, {
        method: "PUT",
        headers: {
          // access_token: localStorage.getItem("access_token"),
          "content-type": "application/json",
        },
        body: JSON.stringify(dataProduct),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const data = await response.json();
      dispatch(fetchProducts(""));
    } catch (error) {
      throw error;
    }
  };
}

export function deleteProduct(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(productUrl + `/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }

      dispatch(fetchProducts(""));
    } catch (error) {
      throw error;
    }
  };
}
