import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  Col,
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  Spinner
} from "reactstrap";
import dynamic from "next/dynamic";
import { FEATURES } from "../utils/constant";
import { FEATURE_TO_TEXT } from "../utils/actions";
import fetch from "isomorphic-unfetch";

const TimelineChart = dynamic(() => import("../components/TimelineChart"), {
  ssr: false
});

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [label, setLabel] = useState("pH");
  const [isLoading, setIsLoading] = useState(false);

  const simulate = async val => {
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
      await setLabel(val);
      await setTimeline([]);
      await setIsLoading(true);
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${window.location.protocol}//${
              document.location.hostname
            }/api/timeline`
          : "http://localhost:3000/api/timeline",
        options
      );
      const data = await response.json();
      await setTimeline(data);
      await setIsLoading(false);
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
            <TimelineChart label={FEATURE_TO_TEXT(label)} data={timeline} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Timeline;
