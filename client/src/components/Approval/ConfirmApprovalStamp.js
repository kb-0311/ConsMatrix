import React, { Fragment, useEffect } from 'react'
import './ConfirmApprovalStamp.css'
import ConfirmApprovalSteps from "./ConfirmApprovalSteps";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../component/layout/Metadata";
import {useAlert} from "react-alert";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { clearErrors, createApproval } from '../../actions/confirmApprovalAction';
import { handleSubmitApproval} from '../../actions/approvalAction'

const ConfirmApprovalStamp = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { approvalInfo, approvalItems } = useSelector((state) => state.approval);
    const { currentUser :user } = useSelector((state) => state.user);
    const {loading , error ,approval  } =useSelector(state => state.newApproval);


    const proceedToStamp = () => {
        const data = {
          user,
          approvalInfo
        };
    
        sessionStorage.setItem("approvalInfo", JSON.stringify(data));
        let approvalData = {
          approvalItems:approvalItems,
          outSourcer:approvalInfo.outSourcer,
          department :approvalInfo.outSourcer,
          country :approvalInfo.country,
          state:approvalInfo.state

        }
        dispatch(createApproval(approvalData));
        
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        dispatch(handleSubmitApproval());
        alert.success("Approval Successfuly submitted");
        history.push("/account");
        

        
      };

      
  return (
    <Fragment>
      <MetaData title="Confirm Approval" />
      <ConfirmApprovalSteps activeStep={1} />
      <div className="confirmApprovalStampPage">
        <div>
          <div className="confirmtesterArea">
            <Typography>Tester Info</Typography>
            <div className="confirmtesterAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Out Sourcing Company:</p>
                <span>{approvalInfo.outSourcer}</span>
              </div>
            </div>
          </div>
          <div className="confirmApprovalItems">
            <Typography>Items You Are Approving:</Typography>
            <div className="confirmApprovalItemsContainer">
              {approvalItems &&
                approvalItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="ApprovalStampSummary">
            

            <button onClick={proceedToStamp}>Proceed To Give Your Stamp</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ConfirmApprovalStamp