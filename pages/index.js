import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import moment from "moment";
import {
  Row,
  Button,
  Spinner,
  Popover,
  PopoverBody,
  Input,
  Col,
  Table,
  Collapse
} from "reactstrap";
import { FEATURES } from "../utils/constant";
import { FEATURE_TO_TEXT } from "../utils/actions";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false
});

const Legend = dynamic(() => import("../components/Legend"), {
  ssr: false
});

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const Index = () => {
  const [legend, setLegend] = useState(false);
  const [feature, setFeature] = useState("wqi");
  const [stationCondition, setstationCondition] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTableCollapse, setIsTableCollapse] = useState(false);
  const date = moment().format("MMMM D, YYYY (dddd)");

  const forecast = async f => {
    const d = new Date();
    const n = d.getMonth();

    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        payload: [f, parseInt(n) + 1]
      })
    };
    try {
      await setIsLoading(false);
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${process.env.BASE_URL}/api/forecast`
          : `http://localhost:3000/api/forecast`,
        options
      );
      const data = await response.json();
      console.log(data)
      await setstationCondition(
        data.sort((a, b) => {
          return a.station - b.station;
        })
      );
      await setIsLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const _onChangeForecast = async e => {
    await setFeature(e);
    await setLegend(false);
    await setIsTableCollapse(false);
    await forecast(e);
  };

  useEffect(() => {
    forecast("wqi");
  }, []);

  return (
    <Layout>
      <div className="map-grid">
        <Map stationCondition={stationCondition} />
        <div className="control-panel">
          <h3>FORECASTING</h3>
          <h6>{FEATURE_TO_TEXT(feature)}</h6>
          <p>{date}</p>
          <hr />
          <Row className="pb-2">
            <Col hidden={isLoading} sm={3} md={2}>
              <Spinner
                style={{ width: "2rem", height: "2rem" }}
                color="primary"
              />
            </Col>
            <Col sm={!isLoading ? 9 : 12} md={!isLoading ? 10 : 12}>
              <Input
                type="select"
                onChange={e => _onChangeForecast(e.target.value)}
                bsSize="sm"
                defaultValue={feature}
              >
                {FEATURES.map((data, index) => (
                  <option value={data} key={index}>
                    {FEATURE_TO_TEXT(data)}
                  </option>
                ))}
              </Input>
            </Col>
          </Row>
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
              <Legend legend={feature} />
            </PopoverBody>
          </Popover>
        </div>
        <div className="home-overview">
          <div>
            Using <b>Deep Learning Algorithm</b>, the system has the capability to
            learn the water quality from the dataset using the training set and
            simulate a particular scenario based on the water quality
            parameters.
          </div>
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
        p {
          letter-spacing: 5px;
          text-align: center;
        }
        .home-overview {
          position: absolute;
          bottom: 0;
          left: 0;
          max-width: 320px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          padding: 12px 24px;
          margin: 20px;
          font-size: 13px;
          line-height: ;
          color: #6b6b76;
          outline: none;
          text-align: justify;
          text-transform: uppercase;
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

export default Index;
