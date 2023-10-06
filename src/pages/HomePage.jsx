import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <h1 style={{justifyContent:"center" , textAlign : "center" , margin:"10vh 10vh 0.5vh 5vh "}} className="home-content">Employee Salary Management Application</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;
