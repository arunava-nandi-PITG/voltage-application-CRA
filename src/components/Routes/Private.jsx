import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      // console.log(auth.token);
      // const res = await axios.get(
      //   "http://172.16.163.41:8080/api/v1/employee/salarylist"
      // );
      // if (res.status === 200) {
      //   setOk(true);
      // } else {
      //   setOk(false);
      // }

      const data = localStorage.getItem('auth')
      if(data){
        setOk(true)
      }else{
        setOk(false)
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path='' />;
}
