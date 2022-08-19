import React, { Fragment } from "react";
import "./Approval.css";
import ApprovalItemCard from './ApprovalItemCard.js'
import { useSelector, useDispatch } from "react-redux";
import { addItemsToApprove, removeItemsFromApproval, removeItemsToApprove } from "../../actions/approvalAction";
import { Typography } from "@material-ui/core";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';import { Link } from "react-router-dom";

const Approval = ({history}) => {

    const dispatch = useDispatch();

    const { approvalItems :ApprovalItems } = useSelector((state) => state.approval);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
          return;
        }
        dispatch(addItemsToApprove(id, newQty));
      };
    
      const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
          return;
        }
        dispatch(addItemsToApprove(id, newQty));
      };
    
      const deleteApprovalItems = (id) => {
        dispatch(removeItemsToApprove(id));
      };
    
      const checkoutHandler = () => {
        history.push("/login?redirect=tester/details");
      };


  return (
    <Fragment>
      {ApprovalItems.length === 0 ? (
        <div className="emptyApproval">
          <DoNotDisturbAltIcon />

          <Typography>YOU HAVE NOT SELECTED ANY UTILITIES FOR FURTHER REVIEW</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="ApprovalPage">
            <div className="ApprovalHeader">
              <p>Utility</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {ApprovalItems &&
              ApprovalItems.map((item) => (
                <div className="ApprovalContainer" key={item.product}>
                  <ApprovalItemCard item={item} deleteApprovalItems={deleteApprovalItems} />
                  <div className="ApprovalInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="ApprovalSubtotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="ApprovalGrossProfit">
              <div></div>
              <div className="ApprovalGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${ApprovalItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Confirm Approval</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Approval