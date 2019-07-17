import React from "react";
import { Button } from "reactstrap";
const Print = () => {
  return (
    <>
      <div className="print-page">
        <Button onClick={() => window.print()} color="primary">
          PRINT
        </Button>
      </div>
      <style jsx>{`
        .print-page {
          position: absolute;
          top: 10;
          right: 0;
          max-width: 320px;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          margin: 20px;
          font-size: 13px;
          line-height: 2;
          color: #6b6b76;
          outline: none;
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
};

export default Print;
