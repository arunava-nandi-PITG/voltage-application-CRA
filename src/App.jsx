import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/dashboard";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import ActualSalary from "./pages/user/ActualSalary";
import PrivateRoute from "./components/Routes/Private";
import Profile from "./pages/user/profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/addEmployee" element={<PrivateRoute />}>
          <Route path="/addEmployee" element={<AddUser />} />
        </Route>
        <Route path="/editEmployee/:id" element={<PrivateRoute />}>
          <Route path="" element={<EditUser />} />
        </Route>
        <Route path="/actualSalary/:id" element={<PrivateRoute />}>
          <Route path="" element={<ActualSalary />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="" element={<Profile />}></Route>
        </Route>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </>
  );
}

export default App;
