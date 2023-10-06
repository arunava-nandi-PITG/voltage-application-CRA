<<<<<<< HEAD
import React from 'react'
import { useAuth } from '../../context/auth'



const Profile = () => {
  const [auth, setAuth] = useAuth()

  console.log(auth);
  return (
    <div>
      <div>
        <div>
          <h1>Profile</h1>
          <h6> Name  : {JSON.stringify(auth.user.username)}</h6>
          <h6>PhoneNumber  : {JSON.stringify(auth.user.phoneNumber)}</h6>
        </div>
      </div>
    </div>
  )
}

export default Profile
=======
import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const Profile = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div>
        <div className='card'>
          <div className='card-body'>
            <p>UserName : {auth?.user?.username}</p>
            <br />
            <p>Email : {auth?.user?.email}</p>
            <br />
            <p>Phone : {auth?.user?.phoneNumber}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
>>>>>>> 85b6d7429e8e9d31501df1cf77f52597ea7ed163
