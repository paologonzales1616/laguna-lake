import React, { useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Button,
  Spinner
} from "reactstrap";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const _register = async e => {
    e.preventDefault();
    const options = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name
      })
    };
    try {
      await setIsLoading(true);
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${process.env.BASE_URL}/api/login`
          : `http://localhost:3000/api/register`,
        options
      );
      const data = await response.json();
      await setIsLoading(false);
      router.push({ pathname: "/login" });
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
              <Form onSubmit={_register}>
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Enter Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter Email Address"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter Password"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <Input
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                    type="password"
                    placeholder="Enter Password Again"
                  />
                </FormGroup>
                <Button type="submit" block color="primary">
                  {isLoading ? <Spinner size="sm" color="light" /> : "Register"}
                </Button>
              </Form>
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
