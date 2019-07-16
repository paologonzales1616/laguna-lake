import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import dynamic from "next/dynamic";
import { Container, Row, Col } from "reactstrap";

const RiversChart = dynamic(() => import("../components/RiversChart"), {
  ssr: false
});

const Rivers = () => {
  const [value, setValue] = useState([]);
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const timeline = async () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const options = {
      headers: headers,
      method: "POST"
    };

    try {
      await setIsLoading(true);
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${window.location.protocol}//${
              document.location.hostname
            }/api/rivers`
          : "http://localhost:3000/api/rivers",
        options
      );
      const data = await response.json();
      await setNames(data.names);
      await setValue(data.data);
      await setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    timeline();
  }, []);

  return (
    <Layout>
      <Container fluid>
        <Row className="p-5">
          {!isLoading && (
            <>
              {names.map((name, index) => (
                <Col key={index} md="6" sm="12">
                  <RiversChart {...{ label: name, data: value[name] }} />
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>
    </Layout>
  );
};

export default Rivers;
