import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Line } from "react-chartjs-2";
import {
  Row,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Spinner
} from "reactstrap";
import { MONTH_NAMES, STATIONS } from "../utils/constant";
import { FEATURE_TO_TEXT } from "../utils/actions";
import fetch from "isomorphic-unfetch";
import Doc from "../utils/docService";
import PdfContainer from "../utils/pdfContainer";
const Simulation = props => {
  const [station, setStation] = useState(1);
  const [actual, setActual] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const createPdf = html => Doc.createPdf(html);
  const data = {
    labels: MONTH_NAMES,
    datasets: [
      {
        label: "Forecast",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(255, 102, 102, 1)",
        borderColor: "rgba(255, 0, 0, 1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(0, 0, 0, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(255, 102, 102, 1)",
        pointHoverBorderColor: "rgba(255, 0, 0, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: forecast.map(val => val.value)
      },
      {
        label: "Actual",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(153, 255, 153, 1)",
        borderColor: "rgba(0, 128, 0, 1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(0, 0, 0, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(153, 255, 153, 1)",
        pointHoverBorderColor: "rgba(0, 128, 0, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        data: actual.map(val => val.value)
      }
    ]
  };

  const simulate = async () => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        payload: [props.feature, parseInt(station)]
      })
    };
    try {
      await setIsLoading(true);
      const response = await fetch(
        "/api/actual",
        options
      );
      const data = await response.json();
      setActual(data.actual);
      setForecast(data.forecast);
      await setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    simulate();
  }, []);

  return (
    <Layout>
      <PdfContainer createPdf={createPdf}>
        <Container className="p-5">
          <Row>
            <Col className="text-center pb-3">
              <h2>{FEATURE_TO_TEXT(props.feature)}</h2>
            </Col>
          </Row>
          <Row>
            <Col className="pb-3">
              <Nav justified={true} pills>
                {STATIONS.map((data, index) => (
                  <NavItem key={index}>
                    <NavLink
                      onClick={() => {
                        setStation(data);
                        simulate();
                      }}
                      href="#"
                      active={data === station}
                    >
                      {isLoading && data === station ? (
                        <Spinner size="sm" color="light" />
                      ) : (
                        `Station ${data}`
                      )}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col>
              <Line data={data} />
            </Col>
          </Row>
        </Container>
      </PdfContainer>
    </Layout>
  );
};

Simulation.getInitialProps = ({ query: { feature } }) => {
  return { feature: feature };
};

export default Simulation;
