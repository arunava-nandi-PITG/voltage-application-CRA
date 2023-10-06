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
