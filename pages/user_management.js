import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Container, Row, Col, Table, Button } from "reactstrap";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
const user_management = () => {
  const [users, setUsers] = useState([]);
  const _getUsers = async () => {
    const options = {
      headers: headers
    };
    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${window.location.protocol}/${
              document.location.hostname
            }/api/users`
          : `http://localhost:3000/api/users`,
        options
      );
      const data = await response.json();
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const _deleteUser = async email => {
    const options = {
      headers: headers,
      method: "DELETE",
      body: JSON.stringify({
        email
      })
    };
    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${window.location.protocol}/${
              document.location.hostname
            }/api/users`
          : `http://localhost:3000/api/users`,
        options
      );
      const data = await response.json();
      if (data[0]) {
        setUsers(data);
      }else{
        setUsers([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    _getUsers();
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={{ size: 12 }} md={{ size: 12 }}>
            <div className="panel">
              <h1 className="text-center">user management</h1>
            </div>
            <div className="table-panel">
              <Table>
                <thead>
                  <tr>
                    <th width="5    %">#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th width="10%">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((e, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>
                        <Button
                          onClick={() => _deleteUser(e.email)}
                          color="danger"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
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

export default user_management;
