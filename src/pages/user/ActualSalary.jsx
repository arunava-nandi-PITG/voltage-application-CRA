import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import axios from "axios";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const ActualSalary = () => {
  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

  const [auth, setAuth] = useAuth();
  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    salary: "",
  });

  const { id } = useParams();
  const { name, designation, salary } = employee;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUser = async () => {
    const result = await axios.get(
      `${baseURL}/employee/getsalary/${id}`,
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );
    setEmployee(result.data);
  };

  return (
    <Layout>
      <Stack alignItems="center" style={{ marginTop: "20px" }}>
        <Card sx={{ minWidth: 20, maxWidth: 500 }}>
          <CardHeader
            title="Employee Actual Salary"
            style={{ marginLeft: "5vh" }}
          />
          <Divider />
          <CardContent>
            <Stack spacing={2}>
              <Stack>
                <Typography variant="h4">UseName : {name}</Typography>
              </Stack>
              <Stack>
                <Typography variant="h4">
                  Designation : {designation}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="h4">Salary : {salary}</Typography>
              </Stack>
            </Stack>
          </CardContent>
          <Stack alignItems="center">
            <Button
              component={Link}
              to="/dashboard/user"
              variant="outlined"
              color="primary"
              style={{ marginBottom: "2px" }}
            >
              Back
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Layout>
  );
};

export default ActualSalary;
