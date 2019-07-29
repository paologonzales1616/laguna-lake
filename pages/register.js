import React, { useState } from "react";
import Layout from "../components/Layout";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const _register = async () => {
    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    };
    try {
      await setIsLoading(true);
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${window.location.protocol}/${
              document.location.hostname
            }/api/login`
          : `http://localhost:3000/api/register`,
        options
      );
      const data = await response.json();

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
          <Col sm={{ size: 12 }} md={{ size: 6, offset: 3 }}>
            <div className="panel">
              <h1 className="text-center">Register</h1>
              <Form>
                <FormGroup>
                  <Label>Name</Label>
                  <Input type="email" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" placeholder="Enter Email Address" />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" placeholder="Enter Password" />
                </FormGroup>
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input type="password" placeholder="Enter Password Again" />
                </FormGroup>
              </Form>
              <Button block color="primary">
                Register
              </Button>
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
      `}</style>
    </Layout>
  );
};

export default Register;
