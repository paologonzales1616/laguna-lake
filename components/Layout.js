import Head from "./Head";
import Navigation from "./Navigation";

const Layout = props => {
  return (
    <div className="box">
      <Head />
      <div className="header">
        <Navigation />
      </div>
      <div className="main">{props.children}</div>
      <style global jsx>{`
        body,
        html {
          margin: 0;
        }
        .box {
          height: 100vh;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: auto 1fr;
        }

        .header {
          grid-column: 1 / span 5;
        }

        .main {
          grid-column: 1 / span 5;
        }
      `}</style>
    </div>
  );
};

export default Layout;
