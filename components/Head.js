import NextHead from "next/head";

const Head = () => {
  return (
    <NextHead>
      <title>Laguna Lake</title>
      <link
        rel="stylesheet"
        href="https://bootswatch.com/4/yeti/bootstrap.min.css"
      />
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
        rel="stylesheet"
      />
    </NextHead>
  );
};

export default Head;
