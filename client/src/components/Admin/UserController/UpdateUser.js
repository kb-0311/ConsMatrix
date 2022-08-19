import MailOutline from '@material-ui/icons/MailOutline';
import Person from '@material-ui/icons/Person';
import { Button } from '@mui/material';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getUserDetails, loadUser, updateUser } from '../../../actions/userActions';
import Loader from '../../../component/layout/loader/Loader';
import Metadata from '../../../component/layout/Metadata';
import { UPDATE_USER_RESET } from '../../../constant/userConstants';
import Sidebar from '../Dashboard/Sidebar';

const UpdateUser = ({match , history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading :updateLoading , error:updateError , isUpdated} =useSelector((state)=>state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
  
    const userId = match.params.id;

    useEffect(() => {
        if (user && user._id != userId) {
          dispatch(getUserDetails(userId));
        } else {
          setName(user.name);
          setEmail(user.email);
          setRole(user.role);
        }
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (updateError) {
          alert.error(updateError);
          dispatch(clearErrors());
        }
    
        if (isUpdated) {
          alert.success("User Updated Successfully");
          history.push("/admin/users");
          dispatch({ type: UPDATE_USER_RESET });
        }
      }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

      const updateUserSubmitHandler = async (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
    
        await dispatch(updateUser(userId, myForm));
        dispatch(loadUser());

      };

      
  return (
    <Fragment>
    <Metadata title="Update User" />
    <div className="dashboard">
      <Sidebar />
      <div className="newProductContainer">
        {loading ? (
          <Loader />
        ) : (
          <form
            className="createProductForm"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

            <div>
              <Person />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutline />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <VerifiedUserIcon/>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                updateLoading ? true : false || role === "" ? true : false
              }
            >
              Update
            </Button>
          </form>
        )}
      </div>
    </div>
  </Fragment>
  )
}

export default UpdateUser