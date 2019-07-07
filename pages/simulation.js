import Layout from "../components/Layout";

const Simulation = props => {
  return <Layout>{props.feature}</Layout>;
};

Simulation.getInitialProps = ({ query: { feature } }) => {
  return { feature: feature };
};

export default Simulation;
