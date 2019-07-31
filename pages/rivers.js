import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import dynamic from "next/dynamic";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Spinner
} from "reactstrap";
import { RIVER_FEATURES } from "../utils/constant";
import { FEATURE_TO_TEXT } from "../utils/actions";
import Doc from "../utils/docService";
import PdfContainer from "../utils/pdfContainer";
const RiversChart = dynamic(() => import("../components/RiversChart"), {
  ssr: false
});

const Print = dynamic(() => import("../components/Print"), {
  ssr: false
});

const Rivers = () => {
  const createPdf = html => Doc.createPdf(html);
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
      const response = await fetch("/api/rivers", options);
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
      <PdfContainer createPdf={createPdf}>
        <div className="map-grid">
          <Container fluid className="p-5">
            <Row>
              <Col className="text-center pb-3">
                <h2>Rivers</h2>
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 8, offset: 2 }} className="pb-3">
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
                          <Col key={index} md={{ size: 10, offset: 1 }} sm="12">
                            <RiversChart
                              {...{ label: name, data: value[name] }}
                            />
                          </Col>
                        ))}
                      </>
                    )}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>

        <style jsx>{`
          .map-grid {
            display: grid;
          }
        `}</style>
      </PdfContainer>
    </Layout>
  );
};

export default Rivers;
