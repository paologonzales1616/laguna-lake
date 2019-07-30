import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Container, Row, Col, Table, Button } from "reactstrap";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const data_management = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={{ size: 12 }} md={{ size: 12 }}>
            <div className="panel">
              <h1 className="text-center">data management</h1>
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .table-panel {
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          padding: 20px 24px;
          margin: 20px;
          font-size: 13px;
          line-height: 2;
          color: #6b6b76;
          outline: none;
        }

        .panel {
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          padding: 20px 24px;
          margin: 20px;
          margin-top: 3rem;
          font-size: 13px;
          line-height: 2;
          color: #6b6b76;
          outline: none;
          text-transform: uppercase;
        }
      `}</style>
    </Layout>
  );
};

export default data_management;
