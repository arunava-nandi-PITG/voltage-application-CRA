import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

import  { Toaster } from 'react-hot-toast';

const Layout = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "86vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
};
// SEO
Layout.defaultProps = {
  title: "Voltage Application",
};

export default Layout;
