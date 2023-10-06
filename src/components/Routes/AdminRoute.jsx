import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const AuthCheck = async () => {
      // console.log(auth.token);
      // const res = await axios.get(
      //   "http://172.16.163.41:8080/api/v1/authentication/adminAuth",
      // );
      // if (res.status === 200) {
      //   setOk(true);
      // } else {
      //   setOk(false);
      // }
      if (auth.user.roles[0] === "ROLE_ADMIN") {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) AuthCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path='' />;
}
