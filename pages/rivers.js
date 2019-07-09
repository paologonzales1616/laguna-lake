import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import RiversChart from "../components/RiversChart";
import { Container, Row, Co } from "reactstrap";
const Rivers = props => {
  return (
    <Layout>
      <Container fluid>
        <Row className="p-5">
          {props.names.map((name, index) => (
            <Col key={index}  md="6" sm="12">
              <RiversChart {...{ label: name, data: props.data[name] }} />
            </Col>
          ))}
        </Row>
      </Container>
      <style global jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: auto auto;
        }
      `}</style>
    </Layout>
  );
};

Rivers.getInitialProps = async () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const options = {
    headers: headers,
    method: "POST"
  };

  const response = await fetch(
    `${window.location.protocol}//${document.location.hostname}/api/rivers`,
    options
  );
  const data = await response.json();
  return { data: data.data, names: data.names };
};

export default Rivers;
