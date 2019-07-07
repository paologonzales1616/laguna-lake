import Layout from "../components/Layout";

const Forecast = props => {
  return <Layout>{props.feature}</Layout>;
};

Forecast.getInitialProps = ({ query: { feature } }) => {
  return { feature: feature };
};

export default Forecast;
