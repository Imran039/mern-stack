import axios from "axios";
import {
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  READ_PRODUCTS_REQUEST,
  READ_PRODUCTS_SUCCESS,
  READ_PRODUCTS_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from "./productsReducer";

const API_URL = "/api/products";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: READ_PRODUCTS_REQUEST });
  try {
    const { data } = await axios.get(API_URL);
    dispatch({ type: READ_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: READ_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const { data } = await axios.post(API_URL, product);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, product);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};
