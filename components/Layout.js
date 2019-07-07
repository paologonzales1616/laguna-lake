import Head from "./Head";
import Navigation from "./Navigation";

const Layout = props => {
  return (
    <>
      <Head />
      <Navigation />
      {props.children}
    </>
  );
};

export default Layout;
