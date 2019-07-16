import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Row,
  Button,
  Spinner,
  Popover,
  PopoverBody,
  Input,
  Col
} from "reactstrap";
import { FEATURES } from "../utils/constant";
import { FEATURE_TO_TEXT } from "../utils/actions";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false
});

const Legend = dynamic(() => import("../components/Legend"), {
  ssr: false
});

const Index = () => {
  const [legend, setLegend] = useState(false);
  const [feature, setFeature] = useState("wqi");
  const date = moment().format("MMMM D, YYYY (dddd)");

  return (
    <Layout>
      <div className="map-grid">
        <Map feature={feature} />
        <div className="control-panel">
          <h3>FORECASTING</h3>
          <h6>{FEATURE_TO_TEXT(feature)}</h6>
          <p>{date}</p>
          <hr />
          <Row className="pb-2">
            <Col md={2}>
              <Spinner
                style={{ width: "2rem", height: "2rem" }}
                color="primary"
              />
            </Col>
            <Col md={10}>
              <Input
                type="select"
                onChange={e => {
                  setFeature(e.target.value);
                  setLegend(false);
                }}
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
