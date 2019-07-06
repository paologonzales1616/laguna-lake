import React from "react";

const Index = props => {
  return (
    <div>
      <h1>{props.python}</h1>
    </div>
  );
};

Index.getInitialProps = ({ query: { id } }) => {
  return { python: id };
};

export default Index;
