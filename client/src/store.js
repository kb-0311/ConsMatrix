import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer , productDetailReducer,productReviewsReducer, productControllerReducer, newProductReducer, newReviewReducer, reviewControllerReducer } from './reducers/productReducer';
import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
  } from "./reducers/userReducers.js";
import { allApprovalsReducer, approvalControlReducer, approvalDetailsReducer, approvalReducer, myApprovalsReducer, newApprovalReducer } from './reducers/approvalReducer';
const reducer = combineReducers({
    // utility and product reducers
    products : productReducer,
    productDetails : productDetailReducer,
    productControl :productControllerReducer,
    newProduct: newProductReducer,
    //review reducers
    review: reviewControllerReducer,
    newReview:newReviewReducer,
    productReviews: productReviewsReducer,
    //user reducers
    user : userReducer,
    profile : profileReducer,
    forgotPassword : forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    //approval reducers
    approval : approvalReducer,
    newApproval : newApprovalReducer,
    myApprovals :myApprovalsReducer,
    allApprovals :allApprovalsReducer,
    controlApproval :approvalControlReducer,
    approvalDetails : approvalDetailsReducer,
    
})


let initialState = {
    approvals: {
      approvalItems: localStorage.getItem("approvalItems")
        ? JSON.parse(localStorage.getItem("approvalItems"))
        : [],
      approvalInfo: localStorage.getItem("approvalInfo")
        ? JSON.parse(localStorage.getItem("approvalInfo"))
        : {},
    },
  };
  

const middleware = [thunk];

const store = createStore(
    reducer ,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)));

export default store