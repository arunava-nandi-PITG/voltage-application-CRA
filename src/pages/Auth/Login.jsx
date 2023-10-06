import Layout from "../../components/Layout/Layout";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://172.16.163.41:8080/api/v1/auth/login",
        { userName, password }
      );
      if (res.status === 200) {
        toast.success("login successful");

        setAuth({
          ...auth,
          user: res.data.user,
          token: `Bearer ${res.data.token}`,

        });
        localStorage.setItem("token", JSON.stringify(`Bearer ${res.data.token}`));
        localStorage.setItem("user", JSON.stringify(res.data.user))
        navigate(location.state || "/");
      }
      else {
        console.log(res.data);
        toast.error("Internal server error");
      }
    } catch (error) {
      toast.error("Invalid Username and Password");
    }
  };
  return (
    <Layout title="Login">
      <Stack alignItems="center" style={{ marginTop: "20px" }}>
        <Card sx={{ minWidth: 20, maxWidth: 500 }}>
          <CardHeader title="LOGIN" style={{ marginLeft: "25vh" }} />
          <Divider />
          <CardContent>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mb: 3 }}
                name="userName"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <TextField
                label="Password"
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                fullWidth
                name="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Stack spacing={2} direction="row" justifyContent="center">
                <Button variant="outlined" color="secondary" type="submit">
                  Login
                </Button>
              </Stack>
            </form>
            <Stack>
              <Stack direction="row">
                <p>if you don't have account ? </p>
                <Button
                  variant="text"
                  color="primary"
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Layout>
  );
};

export default Login;
