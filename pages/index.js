import React from "react";

const Index = props => {
  return <div>{props.python}</div>;
};

Index.getInitialProps = ({ query: { id } }) => {
  return { python: id };
};

export default Index;
