import React from "react";
import { Col } from "reactstrap";

const SectionTitle = ({ children }) => {
  return (
    <Col lg="12" className="text-center">
      <h2 className="section__title">{children}</h2>
    </Col>
  );
};

export default SectionTitle;
