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
import { FEATURES, STATIONS } from "../utils/constant";
import { FEATURE_TO_TEXT } from "../utils/actions";
import fetch from "isomorphic-unfetch";
import Doc from "../utils/docService";
import PdfContainer from "../utils/pdfContainer";

const TimelineChart = dynamic(() => import("../components/TimelineChart"), {
  ssr: false
});
const stations = ["All", ...STATIONS];
const Timeline = () => {
  const [station, setStation] = useState("All");
  const [feature, setFeature] = useState("pH");
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const createPdf = html => Doc.createPdf(html);

  const simulate = async val => {
    await setFeature(val.feature);
    await setStation(val.station);

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        payload: [val.feature, val.station]
      })
    };
    try {
      await setTimeline([]);
      await setIsLoading(true);
      const response = await fetch("/api/timeline", options);
      const data = await response.json();
      await setTimeline(data);
      await setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    simulate({ feature: "pH", station: "All" });
  }, []);

  return (
    <Layout>
      <PdfContainer createPdf={createPdf}>
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
                      onClick={() => simulate({ feature: data, station })}
                      active={data === feature}
                    >
                      {isLoading && data === feature ? (
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
            <Col className="pb-3">
              <Nav justified={true} pills>
                {stations.map((data, index) => (
                  <NavItem key={index}>
                    <NavLink
                      onClick={() => simulate({ station: data, feature })}
                      href="#"
                      active={data === station}
                    >
                      {isLoading && data === station ? (
                        <Spinner size="sm" color="light" />
                      ) : (
                        <>{data[0] ? "All" : `Station ${data}`}</>
                      )}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col>
              <TimelineChart label={FEATURE_TO_TEXT(feature)} data={timeline} />
            </Col>
          </Row>
        </Container>
      </PdfContainer>
    </Layout>
  );
};

export default Timeline;
