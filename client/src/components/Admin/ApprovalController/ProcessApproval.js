import AccountTree from '@material-ui/icons/AccountTree';
import { Button, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, getApprovalDetails, updateApproval } from '../../../actions/confirmApprovalAction';
import Loader from '../../../component/layout/loader/Loader';
import Metadata from '../../../component/layout/Metadata';
import { UPDATE_APPROVAL_RESET } from '../../../constant/approvalConstants';
import Sidebar from '../Dashboard/Sidebar';
import './ProcessApproval.css'
const ProcessApproval = ({match,history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { approval, error, loading } = useSelector((state) => state.approvalDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.controlApproval);
  
    const updateOrderSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("approvalStatus", status);
  
      dispatch(updateApproval(match.params.id, myForm));
    };
  
    
  
    const [status, setStatus] = useState("");
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
      if (isUpdated) {
        alert.success("Approval Updated Successfully");
        dispatch({ type: UPDATE_APPROVAL_RESET });
      }
  
      dispatch(getApprovalDetails({match}));
    }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);
  return (
    <Fragment>
    <Metadata title="Process Order" />
    <div className="dashboard">
      <Sidebar />
      <div className="newProductContainer">
        {loading ? (
          <Loader />
        ) : (
          <div
            className="confirmApprovalStampPage"
            style={{
              display: approval.approvalStatus === "Approved" ? "block" : "grid",
            }}
          >
            <div>
              <div className="confirmtesterArea">
                <Typography>tester Info</Typography>
                <div className="approvalDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{approval.user && approval.user.name}</span>
                  </div>
                  <div>
                    <p>Out Sourcing Company:</p>
                    <span>{approval.outSourcer}</span>
                  </div>
                  
                </div>

                

                <Typography>Approval Status</Typography>
                <div className="approvalDetailsContainerBox">
                  <div>
                    <p
                      className={
                        approval.approvalStatus && approval.approvalStatus === "Approved"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {approval.approvalStatus  && approval.approvalStatus }
                    </p>
                  </div>
                </div>
              </div>
              <div className="confirmApprovalItems">
                <Typography>Approval Items:</Typography>
                <div className="confirmApprovalItemsContainer">
                  {approval.approvalItems &&
                    approval.approvalItems.map((item) => (
                      <div key={item.product}>
                        
                        <img src={item.product.images[0].url} alt="Product" />
                        <Link to={`/product/${item.product._id}`}>
                          {item.product.name}
                        </Link>{" "}
                        <span>
                          {item.quantity} X ₹{item.product.price} ={" "}
                          <b>₹{item.product.price* item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/*  */}
            <div
              style={{
                display: approval.approvalStatus  === "Approved" ? "none" : "block",
              }}
            >
              <form
                className="updateApprovalForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Approval</h1>

                <div>
                  <AccountTree />
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {approval.approvalStatus  === "Processing !" && (
                      <option value="Approved">Approved</option>
                    )}

                    {approval.approvalStatus  === "Approved" && (
                      <option value="Processing !">Processing !</option>
                    )}
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                >
                  Process
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  </Fragment>
  )
}

export default ProcessApproval