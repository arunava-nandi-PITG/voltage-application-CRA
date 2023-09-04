import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "../../components/Dialog";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  //define useRef() as a const variable.
  const idProductRef = useRef();

  const [users, setUsers] = useState([]);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const [showOriginalSalary, setShowOriginalSalary] = useState({});
  const [employeeSalaries, setEmployeeSalaries] = useState({});
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [auth, setAuth] = useAuth();

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "http://172.16.163.41:8080/api/v1/employee/salarylist",
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    handleDialog("Are you sure you want yo delete?", true);
    idProductRef.current = id;
    // await axios.delete(`http://172.16.163.41:8080/api/v1/employee/deletesalary/${id}`)
    // loadUsers()
  };
  const areYouSureDelete = async (choose) => {
    if (choose) {
      setUsers(users.filter((u) => u.id !== idProductRef.current));
      await axios.delete(
        `http://172.16.163.41:8080/api/v1/employee/deletesalary/${idProductRef.current}`
      );
      loadUsers();
      handleDialog("", false);
      // not recommended
      alert("User deleted successfully");
    } else {
      handleDialog("", false);
    }
  };

  const toggleSalary = (id) => {
    setShowOriginalSalary((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const fetchActualSalary = async (id) => {
    try {
      const response = await axios.get(
        `http://172.16.163.41:8080/api/v1/employee/getsalary/${id}`
      );
      console.log(response.data.salary);
      return response.data.salary;
    } catch (err) {
      console.log("Error fetching actual salary.", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchSalaries = async () => {
      const salaryData = {};
      for (const user of users) {
        salaryData[user.id] = await fetchActualSalary(user.id);
      }
      setEmployeeSalaries(salaryData);
    };
    fetchSalaries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.primary.black,
      fontWeight: "600",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontWeight: "300",
    },
  }));

  //Pagination

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={pages}
      count={users.length}
      page={page}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onPageChange={handleChangePage}
    />
  );
  const recordsAfterPagingAndSorting = () => {
    return users.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  const handleSortRequest = () => {
    const isAsc = orderBy === "asc";
    setOrder(isAsc ? "desc" : "asc");
  };

  return (
    <>
      <Layout>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            variant="outlined"
            aria-label="salary-table"
            stickyHeader
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <TableSortLabel
                    onClick={() => {
                      handleSortRequest();
                    }}
                  >
                    UserName
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel>Designation</TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel>Salary</TableSortLabel>
                </StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recordsAfterPagingAndSorting().map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.designation}</TableCell>
                  <TableCell>
                    {showOriginalSalary[user.id] ? (
                      <span>
                        fetchActualSalary(user.id) !== null ?`
                        {fetchActualSalary(user.id)}` :'Loading....'
                      </span>
                    ) : (
                      user.salary
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        variant="outlined"
                        startIcon={<VisibilityOffIcon />}
                        // onClick={()=> toggleSalary(user.id)}
                        component={Link}
                        to={`/actualSalary/${user.id}`}
                      >
                        Show
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        component={Link}
                        to={`/editEmployee/${user.id}`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                    {dialog.isLoading && (
                      <Dialog
                        onDialog={areYouSureDelete}
                        message={dialog.message}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TblPagination />
        </TableContainer>
      </Layout>
    </>
  );
};

export default Dashboard;
