import React, { useEffect } from 'react'
import Sidebar from "./Sidebar.js";
import "./Dashboard.css"
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Metadata from '../../../component/layout/Metadata.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getAllApprovals } from '../../../actions/confirmApprovalAction.js';
import { getAllUsers } from '../../../actions/userActions.js';
import { getAdminProducts } from '../../../actions/productAction.js';


const Dashboard = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { products }= useSelector(state => state.products);
    const { approvals }= useSelector(state => state.allApprovals);
    const { users }= useSelector(state => state.allUsers);

    let outOfStock = 0;

    products &&
      products.forEach((item) => {
        if (item.Stock === 0) {
          outOfStock += 1;
        }
      });
  
    useEffect(() => {
      dispatch(getAdminProducts());
      dispatch(getAllApprovals());
      dispatch(getAllUsers());
    }, [dispatch]);
  
    let totalAmount = 0;
    products && products.map((product)=>{
      totalAmount+=product.price*product.Stock;
    })
  
    const lineState = {
      labels: ["Initial Amount", "Amount Potential"],
      datasets: [
        {
          label: "TOTAL AMOUNT",
          backgroundColor: ["orange"],
          hoverBackgroundColor: ["rgb(197, 72, 49)"],
          data: [0, totalAmount],
        },
      ],
    };
  
    const doughnutState = {
      labels: ["Utilities Tested", "Utilities Awaiting Tests"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, products.length - outOfStock],
        },
      ],
    };
  



  return (
    <div className="dashboard">
    <Metadata title="Dashboard - Admin Panel" />
    <Sidebar />

    <div className="dashboardContainer">
      <Typography component="h1">Dashboard</Typography>

      <div className="dashboardSummary">
        <div>
          <p>
            Total Amount <br /> ₹{totalAmount}
          </p>
        </div>
        <div className="dashboardSummaryBox2">
          <Link to="/admin/products/utilities">
            <p>Utilities</p>
            <p>{products && products.length}</p>
          </Link>
          <Link to="/admin/approvals">
            <p>Approvals</p>
            <p>{approvals && approvals.length}</p>
          </Link>
          <Link to="/admin/users">
            <p>Users</p>
            <p>{users && users.length}</p>
          </Link>
        </div>
      </div>

      <div className="lineChart">
        <Line data={lineState} />
      </div>

      <div className="doughnutChart">
        <Doughnut data={doughnutState} />
      </div>
    </div>
  </div>
  )
}

export default Dashboard