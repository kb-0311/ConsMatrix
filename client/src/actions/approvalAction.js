import {
    ADD_TO_BE_APPROVED,
    HANDLE_SUBMIT_APPROVAL,
    REMOVE_TO_BE_APPROVED,
    SAVE_APPROVED,
  } from "../constant/approvalConstants";
  import axios from "axios";
  
  export const addItemsToApprove = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
  
    dispatch({
      type: ADD_TO_BE_APPROVED,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });
  
    localStorage.setItem("approvalItems", JSON.stringify(getState().approval.approvalItems));
  };
  
  export const removeItemsToApprove = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_TO_BE_APPROVED,
      payload: id,
    });
  
    localStorage.setItem("approvalItems", JSON.stringify(getState().approval.approvalItems));
  };
  
  export const saveApprovalInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_APPROVED,
      payload: data,
    });
  
    localStorage.setItem("approvalInfo", JSON.stringify(data));
  };

  export const handleSubmitApproval = () => async (dispatch) => {
    dispatch({
      type : HANDLE_SUBMIT_APPROVAL,
      payload: [],
    });
  
    localStorage.setItem("approvalItems", []);
  };