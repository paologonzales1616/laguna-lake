import Head from "./Head";
import Navigation from "./Navigation";

const Layout = props => {
  return (
    <>
      <Head />
      <Navigation />
      {props.children}
      <style global jsx>{`
        body,
        html {
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Layout;
