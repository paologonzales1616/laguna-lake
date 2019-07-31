import Layout from "../components/Layout";
import { Container, Row, Col } from "reactstrap";
const Contact = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={{ size: 12 }} md={{ size: 8, offset: 2 }}>
            <div className="panel">
              <h1 className="text-center">Contact Us</h1>
            </div>
            <div className="table-panel">
              <h5>
                <b> Project Leader :</b> MR. JEFFERSON L. LERIOS 0998 887 6730
                <br />
                <b> Project Development Team :</b> Alec John O. Gonzales ,Paolo
                D. Gonzales
              </h5>
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
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
      `}</style>
    </Layout>
  );
};

export default Contact;
