import { ADD_TO_BE_APPROVED ,ALL_APPROVALS_FAIL,ALL_APPROVALS_REQUEST,ALL_APPROVALS_SUCCESS,APPROVAL_DETAILS_FAIL,APPROVAL_DETAILS_REQUEST,APPROVAL_DETAILS_SUCCESS,CLEAR_ERRORS,CREATE_APPROVAL_FAIL,CREATE_APPROVAL_REQUEST,CREATE_APPROVAL_SUCCESS,DELETE_APPROVAL_FAIL,DELETE_APPROVAL_REQUEST,DELETE_APPROVAL_RESET,DELETE_APPROVAL_SUCCESS,HANDLE_SUBMIT_APPROVAL,MY_APPROVALS_FAIL,MY_APPROVALS_REQUEST,MY_APPROVALS_SUCCESS,REMOVE_TO_BE_APPROVED,SAVE_APPROVED, UPDATE_APPROVAL_FAIL, UPDATE_APPROVAL_REQUEST, UPDATE_APPROVAL_RESET, UPDATE_APPROVAL_SUCCESS } from "../constant/approvalConstants";

export const approvalReducer = (
    state = { approvalItems: 
      localStorage.getItem("approvalItems")
      ? JSON.parse(localStorage.getItem("approvalItems"))
      :[],
    approvalInfo: localStorage.getItem("approvalInfo")
      ? JSON.parse(localStorage.getItem("approvalInfo"))
      : {} },
    action
  ) => {
    switch (action.type) {
      case ADD_TO_BE_APPROVED:
        const item = action.payload;
  
        const isItemExist = state.approvalItems.find(
          (i) => i.product === item.product
        );
  
        if (isItemExist) {
          return {
            ...state,
            approvalItems: state.approvalItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
            approvalItems: [...state.approvalItems, item],
          };
        }
  
      case REMOVE_TO_BE_APPROVED:
        return {
          ...state,
          approvalItems: state.approvalItems.filter((i) => i.product !== action.payload),
        };
  
      case SAVE_APPROVED:
        return {
          ...state,
          approvalInfo: action.payload,
        };
      
      case HANDLE_SUBMIT_APPROVAL:
        return {
            ...state,
            approvalItems: action.payload,
        };
  
      default:
        return state;
    }
  };


export const newApprovalReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_APPROVAL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_APPROVAL_SUCCESS:
      return {
        loading: false,
        approval: action.payload,
      };

    case CREATE_APPROVAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myApprovalsReducer = (state = { approvals: [] }, action) => {
  switch (action.type) {
    case MY_APPROVALS_REQUEST:
      return {
        loading: true,
      };

    case MY_APPROVALS_SUCCESS:
      return {
        loading: false,
        approvals: action.payload,
      };

    case MY_APPROVALS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allApprovalsReducer = (state = { approvals: [] }, action) => {
  switch (action.type) {
    case ALL_APPROVALS_REQUEST:
      return {
        loading: true,
      };

    case ALL_APPROVALS_SUCCESS:
      return {
        loading: false,
        approvals: action.payload,
      };

    case ALL_APPROVALS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const approvalControlReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_APPROVAL_REQUEST:
    case DELETE_APPROVAL_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_APPROVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_APPROVAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_APPROVAL_FAIL:
    case DELETE_APPROVAL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_APPROVAL_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_APPROVAL_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const approvalDetailsReducer = (state = { approval: {} }, action) => {
  switch (action.type) {
    case APPROVAL_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case APPROVAL_DETAILS_SUCCESS:
      return {
        loading: false,
        approval: action.payload,
      };

    case APPROVAL_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};