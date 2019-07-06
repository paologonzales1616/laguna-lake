import React from "react";

const Index = props => {
  return (
    <div>
      <h2>{props.python}</h2>
    </div>
  );
};

Index.getInitialProps = ({ query: { id } }) => {
  return { python: id };
};

export default Index;
