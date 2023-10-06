import { Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import ActualSalary from "./pages/user/ActualSalary";
import PrivateRoute from "./components/Routes/Private";
<<<<<<< HEAD
import Profile from "./pages/user/profile";
=======
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
>>>>>>> 85b6d7429e8e9d31501df1cf77f52597ea7ed163

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/dashboard'
          element={<PrivateRoute />}
        >
          <Route
            path='user'
            element={<Dashboard />}
          />
        </Route>
        <Route
          path='/dashboard'
          element={<AdminRoute />}
        >
          <Route
            path='admin'
            element={<AdminDashboard />}
          />
        </Route>
        <Route
          path='/addEmployee'
          element={<PrivateRoute />}
        >
          <Route
            path='/addEmployee'
            element={<AddUser />}
          />
        </Route>
        <Route
          path='/editEmployee/:id'
          element={<PrivateRoute />}
        >
          <Route
            path=''
            element={<EditUser />}
          />
        </Route>
<<<<<<< HEAD
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="" element={<Profile />}></Route>
        </Route>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

=======
        <Route
          path='/actualSalary/:id'
          element={<PrivateRoute />}
        >
          <Route
            path=''
            element={<ActualSalary />}
          />
        </Route>
        <Route
          path='/*'
          element={<PageNotFound />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />

        <Route
          path='profile'
          element={<Profile />}
        />
>>>>>>> 85b6d7429e8e9d31501df1cf77f52597ea7ed163
      </Routes>
    </>
  );
}

export default App;
