import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Col, Row, Container, Nav, NavItem, NavLink } from "reactstrap";
import dynamic from "next/dynamic";
import { FEATURES } from "../utils/constant";
import { FEATURE_TO_TEXT } from "../utils/actions";

const TimelineChart = dynamic(() => import("../components/TimelineChart"), {
  ssr: false
});


const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [label, setLabel] = useState("pH");

  const simulate = async val => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        feature: val
      })
    };
    try {
      const response = await fetch(
        'http://localhost:3000/api/timeline',
        // `${window.location.protocol}//${document.location.hostname}/api/timeline`,
        options
      );
      const data = await response.json();
      await setLabel(val);
      setTimeline(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    simulate(label);
  }, []);

  return (
    <Layout>
      <Container className="p-5">
        <Row>
          <Col className="text-center pb-3">
            <h2>Timeline</h2>
          </Col>
        </Row>
        <Row>
          <Col className="pb-3">
            <Nav justified fill pills>
              {FEATURES.map((data, index) => (
                <NavItem key={index}>
                  <NavLink
                    href="#"
                    onClick={() => simulate(data)}
                    active={data === label}
                  >
                    {FEATURE_TO_TEXT(data)}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <TimelineChart data={timeline} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Timeline;
