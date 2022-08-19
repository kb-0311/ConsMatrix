import React, { Fragment, useEffect } from 'react'
import './ApprovalsMade.css'
import {useDispatch, useSelector } from 'react-redux'
import {useAlert} from "react-alert"
import { DataGrid } from "@mui/x-data-grid";
import { clearErrors, myApprovals} from '../../../actions/confirmApprovalAction';
import Metadata from '../../../component/layout/Metadata';
import Loader from '../../../component/layout/loader/Loader' 
import LaunchIcon from "@material-ui/icons/Launch";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const ApprovalsMade = ({match}) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading ,error ,approvals } =useSelector(state=>state.myApprovals);
  const { currentUser :user } =useSelector(state=>state.user);

  const columns = [
    { field: "id", headerName: "Approval ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "outSourcer",
      headerName: "Outsourcer Id",
      type:'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const approvalId =params.getValue(params.id, "id");
        //console.log(approvalId);
        return (
          <div>
          <Link to={`/approval/${approvalId}`}>
            <LaunchIcon />
          </Link>
          </div>
        );
      },
    },
  ];
  const rows = [];

  approvals &&
    approvals.forEach((item, index) => {
      rows.push({
        itemsQty: item.approvalItems.length,
        id: item._id,
        status: item.approvalStatus,
        outSourcer: item.outSourcer
      });
    });


    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      dispatch(myApprovals());
    }, [dispatch, alert, error]);



  
  return (
    <Fragment>
      <Metadata title={`${user.name} - Approvals`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myApprovalsPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myApprovalsTable"
            autoHeight
          />

          <Typography id="myApprovalsHeading">{user.name}'s Approvals</Typography>
        </div>
      )}
    </Fragment>
  )
}

export default ApprovalsMade
