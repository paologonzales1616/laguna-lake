import { Line } from "react-chartjs-2";

const RiversChart = props => {
  const data = {
    labels: props.data.map(x => x.date),
    datasets: [
      {
        label: props.label,
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(153, 255, 153, 1)",
        borderColor: "rgba(0, 128, 0, 1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(153, 255, 153, 1)",
        pointHoverBorderColor: "rgba(0, 128, 0, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        data: props.data.map(y => y.value)
      }
    ]
  };

  return <Line data={data} />;
};

export default RiversChart;
