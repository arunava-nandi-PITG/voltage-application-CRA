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