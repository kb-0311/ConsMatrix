import React from 'react'
import { Link } from 'react-router-dom';
import "./ApprovalItems.css";
const ApprovalItemCard = ({item ,deleteApprovalItems}) => {
  return (
    <div className="ApprovalItemCard">
    <img src={item.image} alt="ssa" />
    <div>
      <Link className='nameOfUtility' to={`/product/${item.product}`}><p className='nameOfUtility'>{item.name}</p></Link>
      <span>{`Price: ₹${item.price}`}</span>
      <p onClick={() => deleteApprovalItems(item.product)}>Remove</p>
    </div>
  </div>
  )
}

export default ApprovalItemCard