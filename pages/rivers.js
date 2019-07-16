import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import dynamic from "next/dynamic";
import {Container, Row, Col, Nav, NavItem, NavLink, Spinner} from "reactstrap";
import {RIVER_FEATURES} from "../utils/constant";
import {FEATURE_TO_TEXT} from "../utils/actions";

const RiversChart = dynamic(() => import("../components/RiversChart"), {
  ssr: false
});

const Rivers = () => {
  const [value, setValue] = useState([]);
  const [names, setNames] = useState([]);
  const [label, setLabel] = useState("pH");
  const [isLoading, setIsLoading] = useState(true);
  const rivers = async val => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        payload: [val]
      })
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    rivers(label);
  }, []);

  return (
      <Layout>
      <Container className="p-5">
        <Row>
          <Col className="text-center pb-3">
            <h2>Rivers</h2>
          </Col>
        </Row>
        <Row>
          <Col className="pb-3">
            <Nav justified fill pills>
              {RIVER_FEATURES.map((data, index) => (
                <NavItem key={index}>
                  <NavLink
                    href="#"
                    onClick={() => {
                      setLabel(data);
                      rivers(data);
                    }}
                    active={data === label}
                  >
                    {isLoading && data === label ? (
                      <Spinner size="sm" color="light" />
                    ) : (
                      FEATURE_TO_TEXT(data)
                    )}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
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
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Rivers;
