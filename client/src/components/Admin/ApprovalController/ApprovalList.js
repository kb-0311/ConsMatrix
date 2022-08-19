import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, deleteApproval, getAllApprovals } from '../../../actions/confirmApprovalAction';
import { DELETE_APPROVAL_RESET } from '../../../constant/approvalConstants';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import LaunchIcon from "@material-ui/icons/Launch";
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Sidebar from '../Dashboard/Sidebar';
import Metadata from '../../../component/layout/Metadata';


const ApprovalList = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, approvals } = useSelector((state) => state.allApprovals);
  
    const { error: deleteError, isDeleted } = useSelector((state) => state.controlApproval);
  
    const deleteOrderHandler = (id) => {
      dispatch(deleteApproval(id));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        alert.success("Approval Deleted Successfully");
        history.push("/admin/approvals");
        dispatch({ type: DELETE_APPROVAL_RESET});
      }
  
      dispatch(getAllApprovals());
    }, [dispatch, alert, error, deleteError, history, isDeleted]);
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
  
      {
        field: "status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "Delivered"
            ? "greenColor"
            : "redColor";
        },
      },
      {
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex: 0.4,
      },
  
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 270,
        flex: 0.5,
      },
  
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {

            const approvalId = params.getValue(params.id, "id");
          return (
            <Fragment>
              <Link to={`/admin/approval/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
  
              <Button
                    onClick={() =>
                    deleteOrderHandler(params.getValue(params.id, "id"))
                    }
                >
                    <DeleteIcon />
              </Button>
              <Link to={`/approval/${approvalId}`}>
                    <LaunchIcon />
                </Link>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = [];
  
    approvals &&
      approvals.forEach((item) => {
        rows.push({
          id: item._id,
          itemsQty: item.approvalItems.length,
          amount: item.totalPrice,
          status: item.approvalStatus,
        });
      });
  
  return (
    <Fragment>
    <Metadata title={`ALL Approvals - Admin`} />

    <div className="dashboard">
      <Sidebar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL Approvals</h1>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          className="productListTable"
          autoHeight
        />
      </div>
    </div>
  </Fragment>
  )
}

export default ApprovalList