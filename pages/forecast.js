import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import Slider from "react-input-slider";
import React, { useState } from "react";
import {
  Container,
  Row,
  Button,
  Spinner,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { MONTH_NAMES } from "../utils/constant";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false
});

const Forecast = props => {
  const [month, setMonth] = useState({ x: 1 });
  const [legend, setLegend] = useState(false);
  return (
    <Layout>
      <Container fluid>
        <Row style={{ height: "100%" }}>
          <Map />

          <div className="control-panel">
            <h3>FORECASTING</h3>
            <h5>{props.feature}</h5>
            <hr />
            <label className="pr-2">{MONTH_NAMES[month.x - 1]}</label>
            <Spinner size="sm" color="primary" />
            <br />
            <Slider
              axis="x"
              xstep={1}
              xmin={1}
              xmax={12}
              x={month.x}
              onChange={({ x }) => setMonth({ x })}
            />
          </div>
          <div className="legend-panel">
            <Button id="legend-popover" color="info">
              Legend
            </Button>
            <Popover
              placement="bottom"
              isOpen={legend}
              target="legend-popover"
              toggle={() => setLegend(!legend)}
            >
              <PopoverHeader>Popover Title</PopoverHeader>
              <PopoverBody>
                Sed posuere consectetur est at lobortis. Aenean eu leo quam.
                Pellentesque ornare sem lacinia quam venenatis vestibulum.
              </PopoverBody>
            </Popover>
          </div>
        </Row>
      </Container>
      <style jsx>{`
        h3 {
          letter-spacing: 5px;
          text-align: center;
        }
        h5 {
          letter-spacing: 5px;
          text-align: center;
        }
        .control-panel {
          position: absolute;
          top: 10;
          right: 0;
          max-width: 320px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          padding: 12px 24px;
          margin: 20px;
          font-size: 13px;
          line-height: 2;
          color: #6b6b76;
          outline: none;
          text-transform: uppercase;
        }
        .legend-panel {
          position: absolute;
          top: 10;
          left: 0;
          max-width: 320px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          margin: 20px;
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

Forecast.getInitialProps = ({ query: { feature } }) => {
  return { feature: feature };
};

export default Forecast;
