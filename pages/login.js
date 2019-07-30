import React, { useState, useContext } from "react";
import Layout from "../components/Layout";
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
import { UserContext } from "../configs/store";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const Login = () => {
  const userContext = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const _login = async e => {
    e.preventDefault();
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
          : `http://localhost:3000/api/login`,
        options
      );
      const data = await response.json();
      if (data.name && data.email && data.token) {
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);
        userContext.setUser({
          name: data.name,
          email: data.email,
          token: data.token
        });
      }
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
              <h1 className="text-center">Login</h1>
              <Form onSubmit={_login}>
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
                <Button type="submit" block color="primary">
                  {isLoading ? <Spinner size="sm" color="light" /> : "Login"}
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

export default Login;
