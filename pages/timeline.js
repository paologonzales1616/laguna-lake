import React, { useState } from "react";
import Layout from "../components/Layout";
import { Col, Row, Container, Nav, NavItem, NavLink } from "reactstrap";
import { Line } from "react-chartjs-2";
import { FEATURES } from "../utils/constant";
import { FEATURE_TO_TEXT } from "../utils/actions";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [label, setLabel] = useState("pH");

  const data = {
    labels: timeline.map(x => x.date),
    datasets: [
      {
        label: FEATURE_TO_TEXT(label),
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(153, 255, 153, 1)",
        borderColor: "rgba(0, 128, 0, 1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(153, 255, 153, 1)",
        pointHoverBorderColor: "rgba(0, 128, 0, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: timeline.map(y => y.value)
      }
    ]
  };

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
                    onClick={() => setLabel(data)}
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
            <Line data={data} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

// Timeline.getInitialProps = ({ query: { feature } }) => {
//   console.log(feature);
//   return { feature: feature };
// };

export default Timeline;
