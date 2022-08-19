import { Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, getApprovalDetails } from '../../../actions/confirmApprovalAction';
import Loader from '../../../component/layout/loader/Loader';
import Metadata from '../../../component/layout/Metadata';

import './ApprovalDetails.css'


const ApprovalDetails = ({match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { approval, error, loading } = useSelector((state) => state.approvalDetails);

    const [renderer, setrenderer] = useState(true);
    //const [approval, setapproval] = useState(null);
   
  useEffect(() => {
    console.log(match.params.id);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    } if (approval) {
      setrenderer(false);

    } else {
      setrenderer(true);
    }
    dispatch(getApprovalDetails({match}));


  }, [dispatch,match.params.id,error,alert ]);



  return (
     
      <Fragment>
        {
          loading? (
          <Loader />
          ) :(
          <Fragment>
              <Metadata title="Approval Details" />
              <div className="approvalDetailsPage">
                <div className="approvalDetailsContainer">
                  <Typography component="h1">
                    Approval # {approval && approval._id}
                  </Typography>
                  <Typography>Tester Info</Typography>
                  <div className="approvalDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{approval && approval.user? approval.user.name :"first name"}</span>
                    </div>
                    <div>
                      <p>Email:</p>
                      <span>
                        {approval && approval.user && approval.user.email}
                      </span>
                    </div>
                    <div>
                      <p>Department:</p>
                      <span>
                        {approval && approval.department}
                      </span>
                    </div>
                  </div>
                  
                  <Typography>Approval Status</Typography>
                  <div className="approvalDetailsContainerBox">
                    <div>
                      <p
                        className={
                          approval && approval.approvalStatus === "Approved"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {approval && approval.approvalStatus }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="approvalDetailsCartItems">
                  <Typography>Approval Items:</Typography>
                  <div className="approvalDetailsCartItemsContainer">
                    {approval && approval.approvalItems &&
                      approval.approvalItems.map((item) => (
                        <div key={item.product._id}>
                          <img src={item.product.images[0].url} alt="Product" />
                          <Link to={`/product/${item.product._id}`}>
                            {item.product.name}
                          </Link>{" "}
                          <span>
                            { item.quantity }X ₹{item.product.price} ={" "}
                            <b>₹{item.product.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
        </Fragment>
          )
        }
        
      </Fragment>
  )

  
  
}

export default ApprovalDetails