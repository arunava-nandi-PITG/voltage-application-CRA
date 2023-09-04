import axios from "axios";
import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AddUser = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    salary: "",
  });
  const { name, designation, salary } = employee;

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://172.16.163.41:8080/api/v1/employee/savesalary",
      employee,
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );
    navigate("/dashboard");
  };

  return (
    <Layout>
      <Stack alignItems="center" style={{ marginTop: "20px" }}>
        <Card sx={{ minWidth: 20, maxWidth: 500 }}>
          <CardHeader title="Add Employee" style={{ marginLeft: "15vh" }} />
          <Divider />
          <CardContent>
            <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
              <TextField
                label="Name"
                required
                variant="outlined"
                color="secondary"
                // type="text"
                sx={{ mb: 3 }}
                fullWidth
                value={name}
                onChange={(e) => onInputChange(e)}
                name="name"
              />
              <TextField
                label="Designation"
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={designation}
                fullWidth
                sx={{ mb: 3 }}
                onChange={(e) => onInputChange(e)}
                name="designation"
              />
              <TextField
                label="Salary"
                required
                variant="outlined"
                color="secondary"
                type="number"
                value={salary}
                fullWidth
                sx={{ mb: 3 }}
                onChange={(e) => onInputChange(e)}
                name="salary"
              />
              <Stack spacing={2} direction="row" justifyContent="center">
                <Button variant="outlined" color="secondary" type="submit">
                  Add
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  type="button"
                  component={Link}
                  to="/dashboard"
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Stack>
    </Layout>
  );
};

export default AddUser;
