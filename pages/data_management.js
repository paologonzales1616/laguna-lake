import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner
} from "reactstrap";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
const data_management = () => {
  const [station, setStation] = useState(1);
  const [date, setDate] = useState(new Date());
  const [pH, setPH] = useState(null);
  const [ammonia, setAmmonia] = useState(null);
  const [nitrate, setNitrate] = useState(null);
  const [inorganicPhosphate, setInorganicPhosphate] = useState(null);
  const [dissolvedOxygen, setDissolvedOxygen] = useState(null);
  const [fecalColiforms, setfecalColiforms] = useState(null);
  const [wqi, setWqi] = useState(null);
  const [bod, setBod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const _onSubmit = async e => {
    e.preventDefault();
    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        payload: [
          date,
          station,
          parseFloat(pH),
          parseFloat(nitrate),
          parseFloat(inorganicPhosphate),
          parseFloat(bod),
          parseFloat(dissolvedOxygen),
          parseFloat(fecalColiforms),
          parseFloat(ammonia),
          parseFloat(wqi)
        ]
      })
    };
    try {
      await setIsLoading(true);
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${window.location.protocol}/${document.location.hostname}/api/lake`
          : `http://localhost:3000/api/lake`,
        options
      );
      const data = await response.json();
      alert("Updated successfully");
      await setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={{ size: 12 }} md={{ size: 8, offset: 2 }}>
            <div className="panel">
              <h1 className="text-center">data management</h1>
            </div>
            <div className="table-panel">
              <h4 className="text-center font-weight-bold">Lake</h4>
              <Form onSubmit={_onSubmit}>
                <FormGroup>
                  <Label>Station</Label>
                  <Input
                    value={station}
                    onChange={e => setStation(e.target.value)}
                    required
                    type="select"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>4</option>
                    <option>5</option>
                    <option>8</option>
                    <option>15</option>
                    <option>16</option>
                    <option>17</option>
                    <option>18</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleDate">Date</Label>
                  <Input
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    type="date"
                    required
                    placeholder="date placeholder"
                  />
                </FormGroup>

                <Row>
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label for="exampleNumber">pH</Label>
                      <Input
                        value={pH}
                        onChange={e => setPH(e.target.value)}
                        type="number"
                        required
                        step="any"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label for="exampleNumber">Ammonia</Label>
                      <Input
                        value={ammonia}
                        onChange={e => setAmmonia(e.target.value)}
                        type="number"
                        step="any"
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label for="exampleNumber">Nitrate</Label>
                      <Input
                        value={nitrate}
                        onChange={e => setNitrate(e.target.value)}
                        type="number"
                        required
                        step="any"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label for="exampleNumber">Inorganic Phosphate</Label>
                      <Input
                        value={inorganicPhosphate}
                        onChange={e => setInorganicPhosphate(e.target.value)}
                        type="number"
                        required
                        step="any"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label for="exampleNumber">Dissolved Oxygen</Label>
                      <Input
                        value={dissolvedOxygen}
                        onChange={e => setDissolvedOxygen(e.target.value)}
                        type="number"
                        required
                        step="any"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label for="exampleNumber">Fecal Coliforms</Label>
                      <Input
                        value={fecalColiforms}
                        onChange={e => setfecalColiforms(e.target.value)}
                        type="number"
                        required
                        step="any"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label for="exampleNumber">Water Quality Index</Label>
                      <Input
                        value={wqi}
                        onChange={e => setWqi(e.target.value)}
                        type="number"
                        required
                        step="any"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={12} md={6}>
                    <FormGroup>
                      <Label for="exampleNumber">BOD Level</Label>
                      <Input
                        value={bod}
                        onChange={e => setBod(e.target.value)}
                        type="number"
                        required
                        step="any"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Button type="submit" block color="primary">
                  {isLoading ? <Spinner size="sm" color="light" /> : "Submit"}
                </Button>
              </Form>
            </div>
            {/* <div className="table-panel">
              <h4 className="text-center font-weight-bold">Rivers</h4>
              <Form>
                <FormGroup>
                  <Label>Rivers</Label>
                  <Input type="select">
                    {RIVER_COORDINATES.map((data, index) => (
                      <option key={index}>{data.river}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
            </div> */}
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .table-panel {
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          padding: 20px 24px;
          margin: 20px;
          font-size: 13px;
          line-height: 2;
          color: #6b6b76;
          outline: none;
        }

        .panel {
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          padding: 20px 24px;
          margin: 20px;
          margin-top: 3rem;
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

export default data_management;
