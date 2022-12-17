import {
  server,
  STOCK_EDIT_FAILED,
  STOCK_EDIT_FETCHING,
  STOCK_EDIT_SUCCESS,
} from "../Constants";
import { httpClient } from "../utils/httpclient";

export const setStockFetchingToState = () => ({
  type: STOCK_EDIT_FETCHING,
});

export const setStockSuccessToState = (payload: any) => ({
  type: STOCK_EDIT_SUCCESS,
  payload,
});

export const setStockFailedToState = () => ({
  type: STOCK_EDIT_FAILED,
});

const doGetProducts = async (dispatch: any) => {
  try {
    const result = await httpClient.get(server.PRODUCT_URL);
    dispatch(setStockSuccessToState(result.data));
  } catch (error) {
    dispatch(setStockFailedToState());
  }
};

export const updateProduct = (formData: FormData, history: any) => {
  return async (dispatch: any) => {
    await httpClient.post(server.PRODUCT_URL, formData);
    history.back();
  };
};

export const getProductById = async (id: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setStockFetchingToState());
      const result = await httpClient.get(`${server.PRODUCT_URL}/${id}`);
      dispatch(setStockSuccessToState(result.data));
    } catch (error) {
      dispatch(setStockFailedToState());
    }
  };
};
