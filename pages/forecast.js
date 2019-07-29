import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import Slider from "react-input-slider";
import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import {
  Collapse,
  Table,
  Button,
  Spinner,
  Popover,
  PopoverBody
} from "reactstrap";
import { MONTH_NAMES } from "../utils/constant";
import { FEATURE_TO_TEXT } from "../utils/actions";
import Legend from "../components/Legend";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false
});

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const Forecast = props => {
  const [month, setMonth] = useState({ x: 1 });
  const [stationCondition, setstationCondition] = useState([]);
  const [legend, setLegend] = useState(false);
  const [isTableCollapse, setIsTableCollapse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const forecasting = async () => {
    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        payload: [props.feature, parseInt(month.x)]
      })
    };
    try {
      await setIsLoading(false);
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${window.location.protocol}/${
              document.location.hostname
            }/api/forecast`
          : `http://localhost:3000/api/forecast`,
        options
      );
      const data = await response.json();
      await setstationCondition(
        data.sort((a, b) => {
          return a.station - b.station;
        })
      );
      await setIsLoading(true);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const _onChangeMonth = async x => {
    await setMonth({ x });
    await forecasting();
  };

  useEffect(() => {
    forecasting();
  }, []);

  return (
    <Layout>
      <div className="map-grid">
        <Map stationCondition={stationCondition} />
        <div className="control-panel">
          <h3>FORECASTING</h3>
          <h6>{FEATURE_TO_TEXT(props.feature)}</h6>
          <hr />
          <label className="pr-2">{MONTH_NAMES[month.x - 1]}</label>
          <Spinner hidden={isLoading} size="sm" color="primary" />
          <br />
          <Slider
            axis="x"
            xstep={1}
            xmin={1}
            xmax={12}
            x={month.x}
            onChange={({ x }) => _onChangeMonth(x)}
            styles={{
              track: {
                width: "100%"
              }
            }}
          />
          <hr />
          <Button
            className="mb-2"
            color="primary"
            size="sm"
            block
            outline
            active={isTableCollapse}
            onClick={() => setIsTableCollapse(!isTableCollapse)}
          >
            Value
          </Button>
          <Collapse isOpen={isTableCollapse}>
            <Table bordered className="p-0 m-0" style={{ fontSize: "12px" }}>
              <thead>
                <tr>
                  <th width="35%" style={{ margin: 0, padding: 1 }}>
                    <center>Station</center>
                  </th>
                  <th style={{ margin: 0, padding: 1 }}>
                    <center>Value</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {stationCondition.map((data, index) => (
                  <tr key={index}>
                    <td style={{ margin: 0, padding: 1 }}>
                      <center>
                        <b>{data.station}</b>
                      </center>
                    </td>
                    <td style={{ margin: 0, padding: 1 }}>
                      <center>
                        <b>{data.value}</b>
                      </center>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Collapse>
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
              <Legend legend={props.feature} />
            </PopoverBody>
          </Popover>
        </div>
      </div>

      <style jsx>{`
        .map-grid {
          height: 100%;
          display: grid;
        }
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
