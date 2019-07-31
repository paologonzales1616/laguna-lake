import Layout from "../components/Layout";
import { Container, Row, Col } from "reactstrap";
const About = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={{ size: 12 }} md={{ size: 8, offset: 2 }}>
            <div className="panel">
              <h1 className="text-center">About</h1>
            </div>
            <div className="table-panel">
              <h5>
                <b>Overview of the Laguna Lake</b> <br />
                <br />
                The biggest inland body of water in the Philippines and the 3rd
                largest in South East Asia is the Laguna De Bay. It has a
                surface area of 900 km2, with 3.2 billion cubic meters volume of
                waters and an average deep of 2.5 meters. It is strategically in
                place at the urban development area with national and regional
                development in fisheries, agriculture, water supply and the
                different business industry sectors. However, the latest
                analyses of water sample from the Laguna Lake and rivers
                indicated low dissolved oxygen, high dissolved nitrogen, high
                level of fecal coliforms, elevated levels ￼of phosphates and
                some concentrations of lead and cadmium according to the Laguna
                Lake Development Authority’s (LLDA’s). The degradation of lake
                are mainly because of overcrowded fish pens, industrial water
                waste discharge, domestic waste coming from households areas
                among others that are thrown at the lake. Because of these water
                pollutants Laguna Lake and its elements are heavily polluted and
                dying (LLDA, 2017). <br /> <br />
                Conservation and protection of Laguna Lake becomes the utmost
                priority of the government and its stakeholders to sustain its
                life and biodiversity. Several government agencies was
                established to facilitate, monitor, and protect the habitat and
                biodiversity of the lake though different programs. The Laguna
                Lake Development Authority’s (LLDA’s) is the leading agency
                organized to carry out national policy, social and economical
                development, preservation of the quality of human life and
                ecological systems and most especially in the preservation of
                undue ecological disturbances, deterioration and pollution.
                There are several programs being implemented by the institution
                such as environmental management, watershed management,
                fisheries development, community management, research
                development, and national greening programs. The research
                development program focus on the technology development in
                decision support system and water quality monitoring program in
                support to LLDA’s mandate, lake monitoring and relevant policy
                decision making (LLDA, 2018). The development of Waste Load
                Model (WLM) was utilized to estimate the load of the pollution
                in Lake Watershed coming from substances produced by human
                activities which are the key source of pollution while the water
                quality modelling provides a platform for the estimation and
                computing of pollution loads in different time slices.
                (PEMSEA,DENR and the LLDA's, 2013). <br /> <br />
                <b>Project Description</b> <br /> <br /> Intelligent
                Environmental Modelling of Water Reservoir Implementing Deep
                Learning Algorithm is a system design to monitor and predict the
                ecological condition of the Laguna Lake. It is a web based
                system that includes the Map of the Laguna Lake containing
                Overview of the Lake, Water Quality Maps, Data Visualization,
                Simulation of Water Quality and Water Quality Prediction. <br />{" "}
                <br />
                The study deals with the development of an intelligent system
                applying geographical information system for environmental
                modelling, environmental data analysis and environmental
                informatics. The data sets will be based from the lead agencies
                collected as base line data on the physical attributes or
                elements in the Laguna Lake. These data will be used for
                calibrating and validating model prediction as well as the
                forecasting of the lake status. The study will also include
                spatiotemporal mapping, simulation for situational analysis and
                model predictions of the Laguna Lake status. <br /> <br />
                The model prediction of the Laguna Lake conditions will utilize
                an algorithm with a new paradigm of machine learning technique
                that allows computational models that are composed of multiple
                processing layers to learn representations of data with multiple
                level of abstraction. It will demonstrate the propagation
                prediction of water pollutants and speed up the parameter
                optimization. To minimise the deviation between the predicted
                scenario and the real phenomenon behaviour a computational
                approach for efficient parameter estimation and optimisation
                strategies was used.
              </h5>
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .panel {
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          padding: 20px 24px;
          margin: 20px;
          margin-top: 3rem;
          font-size: 13px;
          line-height: 2;
          color: #6b6b76;
          outline: none;
          text-transform: uppercase;
        }
        .table-panel {
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          padding: 20px 24px;
          margin: 20px;
          font-size: 13px;
          line-height: 2;
          color: #6b6b76;
          outline: none;
        }
      `}</style>
    </Layout>
  );
};

export default About;
