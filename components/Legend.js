import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Table } from "reactstrap";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

const Legend = props => {
  const [colors, setColors] = useState([]);

  const fetchColors = async () => {
    const optionsLegend = {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        feature: props.legend
      })
    };

    try {
      const response = await fetch(
        process.env.NODE_ENV === "production"
          ? `${window.location.protocol}//${
              document.location.hostname
            }/api/legend`
          : `http://localhost:3000/api/legend`,
        optionsLegend
      );
      const data = await response.json();
      setColors(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <Table bordered className="p-0 m-0" style={{ fontSize: "12px" }}>
      <thead>
        <tr>
          <th>
            <center>INDICATOR</center>
          </th>
          <th>
            <center>RANGE</center>
          </th>
        </tr>
      </thead>
      <tbody>
        {colors.map((data, index) => (
          <tr key={index}>
            <td style={{ backgroundColor: data.color, padding: 8 }}>
              <></>
            </td>
            <td>
              <center>
                <b>{`${data.min} - ${data.max}`}</b>
              </center>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Legend;
