import React, { Fragment, useEffect, useState } from 'react'
import './UpdateProfile.css'
import Loader from "../../component/layout/loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile, loadUser } from "../../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constant/userConstants";
import MetaData from "../../component/layout/Metadata";

const UpdateProfile = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { currentUser } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(currentUser.avatar.url);
  
    const updateProfileSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("avatar", avatar);
      dispatch(updateProfile(myForm));
    };
  
    const updateProfileDataChange = (e) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
  
      reader.readAsDataURL(e.target.files[0]);
    };
  
    useEffect(() => {
     
  
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());
  
        history.push("/account");
  
        dispatch({
          type: UPDATE_PROFILE_RESET,
        });
      }
    }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdateProfile