import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../component/layout/loader/Loader';
import Metadata from '../../component/layout/Metadata';
import './Profile.css'
const Profile = ({history}) => {

    const { currentUser, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
      if (isAuthenticated === false) {
        history.push("/login");
      }
    }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${currentUser.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={currentUser.avatar.url} alt={currentUser.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{currentUser.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{currentUser.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(currentUser.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/approvals/made">My Approvals</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Profile