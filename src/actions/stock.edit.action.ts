import {
  server,
  STOCK_EDIT_FAILED,
  STOCK_EDIT_FETCHING,
  STOCK_EDIT_SUCCESS,
} from "../Constants";
import { Product } from "../types/product.type";
import { httpClient } from "../utils/httpclient";

export const setStockFetchingToState = () => ({
  type: STOCK_EDIT_FETCHING,
});

export const setStockSuccessToState = (payload: Product) => ({
  type: STOCK_EDIT_SUCCESS,
  payload,
});

export const setStockFailedToState = () => ({
  type: STOCK_EDIT_FAILED,
});

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
      const result = await httpClient.get<Product>(
        `${server.PRODUCT_URL}/${id}`
      );
      dispatch(setStockSuccessToState(result.data));
    } catch (error) {
      dispatch(setStockFailedToState());
    }
  };
};
