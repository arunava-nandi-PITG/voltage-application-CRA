import axios from "axios";
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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState(['user']);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://172.16.163.41:8080/api/v1/auth/register",
        { userName, email, phoneNumber, password, role }
      );
      if (res.status === 201) {
        toast.success("User Created");
        navigate("/login");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="register">
      <Stack alignItems="center" style={{ marginTop: "20px" }}>
        <Card sx={{ minWidth: 20, maxWidth: 500 }}>
          <CardHeader title="REGISTER" style={{ marginLeft: "25vh" }} />
          <Divider />
          <CardContent>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <input type="hidden" name="role" value={role}/>
              <TextField
                label="Username"
                variant="outlined"
                color="secondary"
                fullWidth
                name="userName"
                required
                sx={{ mb: 3 }}
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />

              <TextField
                label="Email"
                type="email"
                variant="outlined"
                color="secondary"
                fullWidth
                name="email"
                required
                sx={{ mb: 3 }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                label="Phone"
                variant="outlined"
                color="secondary"
                fullWidth
                name="phoneNumber"
                required
                sx={{ mb: 3 }}
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
              />
              <TextField
                label="Password"
                variant="outlined"
                color="secondary"
                fullWidth
                type="password"
                name="password"
                required
                sx={{ mb: 3 }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <TextField
                label="ConfirmPassword"
                variant="outlined"
                color="secondary"
                type="password"
                fullWidth
                name="confirmPassword"
                required
                sx={{ mb: 3 }}
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
              <Stack spacing={2} direction="row" justifyContent="center">
                <Button variant="outlined" color="secondary" type="submit">
                  Register
                </Button>
              </Stack>
            </form>

            <Stack direction="row" justifyContent="center">
              <p>If you have already account ? </p>
              <Button
                size="small"
                variant="text"
                color="primary"
                type="button"
                component={Link}
                to="/login"
              >
                login
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Layout>
  );
};

export default Register;
