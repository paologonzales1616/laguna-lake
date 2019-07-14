import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";
import dynamic from "next/dynamic";
import { Container, Row, Col } from "reactstrap";

const RiversChart = dynamic(() => import("../components/RiversChart"), {
  ssr: false
});

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
    'http://localhost:3000/api/rivers',
    // `${document.location.protocol}//${document.location.hostname}/api/rivers`,
    options
  );
  const data = await response.json();
  return { data: data.data, names: data.names };
};

export default Rivers;
