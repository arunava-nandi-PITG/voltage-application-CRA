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
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { Modal } from "react-bootstrap";

const Dashboard = () => {

  const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

  //define useRef() as a const variable.
  const idProductRef = useRef();

  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [showOriginalSalary, setShowOriginalSalary] = useState({});
  const [employeeSalaries, setEmployeeSalaries] = useState({});
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [auth, setAuth] = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      `${baseURL}/employee/salarylist`,
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );
    setUsers(result.data);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShow(true);
    idProductRef.current = id;
  };

  const handleDeleteEmployee = async () => {
    setUsers(users.filter((u) => u.id !== idProductRef.current));
    await axios.delete(
      `${baseURL}/employee/deletesalary/${idProductRef.current}`
    );
    loadUsers();
    setShow(false);
  };

  const fetchActualSalary = async (id) => {
    try {
      const response = await axios.get(
        `${baseURL}/employee/getsalary/${id}`
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you want to delete this employee ? </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteEmployee}>
              OK
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
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
                        onClick={() => handleClickDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  
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
