import React from "react";
import { Button } from "reactstrap";
export default props => {
  const bodyRef = React.createRef();
  const createPdf = () => props.createPdf(bodyRef.current);
  return (
    <section className="pdf-container">
      <section className="pdf-toolbar">
        <Button color="link" onClick={createPdf}>
          Create PDF
        </Button>
      </section>
      <section className="pdf-body" ref={bodyRef}>
        {props.children}
      </section>
    </section>
  );
};
