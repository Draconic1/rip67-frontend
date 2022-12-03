import { Container } from "react-bootstrap";

import Navbar from "./navbar";
import Footer from "./footer";

const Component = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content">
        <Container>{children}</Container>
      </div>
      <Footer />
    </>
  );
};

export default Component;
