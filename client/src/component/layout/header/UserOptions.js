import React, { Fragment, useState } from 'react'
import './header.css'
import { SpeedDial , SpeedDialAction } from '@material-ui/lab';
import { useHistory, useNavigate } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { FcApproval } from 'react-icons/fc'
import CheckIcon from '@mui/icons-material/Check';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../../actions/userActions'

const UserOptions = ({user}) => {

  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const {approvalItems} =useSelector(state=>state.approval);

  const [open, setOpen] = useState(false);


  const options = [
    { icon: <FcApproval />, name: `Approvals Pending : ${approvalItems.length}`, func: approvals },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <CheckIcon/>
      ),
      name: `Approvals Made`//(${cartItems.length})` 
      ,
      func: confirmedApprovals,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    history.push("/admin/dashboard");  }

  function approvals() {
    history.push("/to/be/approved");
  }
  function account() {
    history.push("/account");
  }
  function confirmedApprovals() {
    history.push("/approvals/made");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    history.push("/");

  }

  return (
    <Fragment>
        <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ zIndex: "11" }}
            open={open}
            direction="down"
            className="speedDial"
            icon={
            <img
                className="speedDialIcon"
                src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                alt="Profile"
            />
          }>
          {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}

        </SpeedDial>

        
    </Fragment>
  )
}

export default UserOptions