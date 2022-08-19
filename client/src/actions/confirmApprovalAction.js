import {
    CREATE_APPROVAL_REQUEST,
    CREATE_APPROVAL_SUCCESS,
    CREATE_APPROVAL_FAIL,
    MY_APPROVALS_REQUEST,
    MY_APPROVALS_SUCCESS,
    MY_APPROVALS_FAIL,
    ALL_APPROVALS_REQUEST,
    ALL_APPROVALS_SUCCESS,
    ALL_APPROVALS_FAIL,
    UPDATE_APPROVAL_REQUEST,
    UPDATE_APPROVAL_SUCCESS,
    UPDATE_APPROVAL_FAIL,
    DELETE_APPROVAL_REQUEST,
    DELETE_APPROVAL_SUCCESS,
    DELETE_APPROVAL_FAIL,
    APPROVAL_DETAILS_REQUEST,
    APPROVAL_DETAILS_SUCCESS,
    APPROVAL_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constant/approvalConstants";
  
  import axios from "axios";
  
  // Create APPROVAL
  export const createApproval = (approval) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_APPROVAL_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/approval/new", approval, config);
  
      dispatch({ type: CREATE_APPROVAL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_APPROVAL_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // My APPROVALs
  export const myApprovals = () => async (dispatch) => {
    try {
      dispatch({ type: MY_APPROVALS_REQUEST });
  
      const { data } = await axios.get("/api/v1/approvals/myapprovals");
  
      dispatch({ type: MY_APPROVALS_SUCCESS, payload: data.yourApprovals });
    } catch (error) {
      dispatch({
        type: MY_APPROVALS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get All APPROVALs (admin)
  export const getAllApprovals = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_APPROVALS_REQUEST });
  
      const { data } = await axios.get("/api/v1/allapprovals");
  
      dispatch({ type: ALL_APPROVALS_SUCCESS, payload: data.allApprovals });
    } catch (error) {
      dispatch({
        type: ALL_APPROVALS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Update APPROVAL
  export const updateApproval = (id, approval) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_APPROVAL_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(approval.approvalStatus);
      const { data } = await axios.put(
        `/api/v1/approval/${id}`,
        approval,
        config
      );
  
      dispatch({ type: UPDATE_APPROVAL_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_APPROVAL_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete APPROVAL
  export const deleteApproval = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_APPROVAL_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/approval/${id}`);
  
      dispatch({ type: DELETE_APPROVAL_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_APPROVAL_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get APPROVAL Details
  export const getApprovalDetails = ({match}) => async (dispatch) => {
    try {
      dispatch({ type: APPROVAL_DETAILS_REQUEST });
  
      const { data }  = await axios.get(`/api/v1/approval/${match.params.id}`);
      dispatch({ type: APPROVAL_DETAILS_SUCCESS, payload: data.approval});
    } catch (error) {
      dispatch({
        type: APPROVAL_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };