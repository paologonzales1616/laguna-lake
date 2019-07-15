import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import Slider from "react-input-slider";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Button,
  Spinner,
  Popover,
  PopoverBody,
  Table
} from "reactstrap";
import { MONTH_NAMES } from "../utils/constant";
import { FEATURE_TO_TEXT } from "../utils/actions";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false
});

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const Forecast = props => {
  const [month, setMonth] = useState({ x: 1 });
  const [colors, setColors] = useState([]);
  const [legend, setLegend] = useState(false);

  const fetchColors = async () => {
    const optionsLegend = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        feature: props.feature
      })
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/legend`,
        optionsLegend
      );
      const data = await response.json();
      setColors(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const forecasting = async () => {
    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        feature: props.feature,
        month: parseInt(month.x)
      })
    };
    try {
      const response = await fetch(
        `http://localhost:3000/api/forecast`,
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchColors();
    forecasting();
  }, []);

  const LegendTable = colors => (
    <Table borderless style={{ fontSize: "12px", backgroundColor: "white" }}>
      <tbody>
        {colors.map((data, index) => (
          <tr key={index}>
            <td style={{ backgroundColor: data.color, padding: 8 }}>
              <b>{`${data.min} - ${data.max}`}</b>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Layout>
      <Container fluid>
        <Row style={{ height: "100%" }}>
          <Map />
          <div className="control-panel">
            <h3>FORECASTING</h3>
            <h6>{FEATURE_TO_TEXT(props.feature)}</h6>
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
              styles={{
                track: {
                  width: "100%"
                }
              }}
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
              <PopoverBody>
                <LegendTable {...colors} />
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
        h6 {
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
