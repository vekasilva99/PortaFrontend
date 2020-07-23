import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Doughnut, Line } from "react-chartjs-2";
import {
  GET_REPARTIDORES,
  GET_ALL_ORDERS,
} from "../../helpers/graphql/queries";
import { GET_USERS } from "../../helpers/graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import Spinner from "../Spinner";

export default function Graph1(props) {
  const [chartData, setChartData] = useState({
    labels: ["Accepted", "Rejected"],
    datasets: [
      {
        data: [10, 15],
        backgroundColor: ["#CCC", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 4,
      },
    ],
  });
  const lineOptions = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          // stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            // Return an empty string to draw the tick line but hide the tick label
            // Return `null` or `undefined` to hide the tick line entirely
            userCallback(value) {
              // Convert the number to a string and splite the string every 3 charaters from the end
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);

              // Convert the array to a string and format the output
              value = value.join(".");
              return `Rp.${value}`;
            },
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };
  const { data: dataU, error: errorU, loading: loadingU } = useQuery(
    GET_REPARTIDORES
  );
  const { data: dataUS, error: errorUS, loading: loadingUS } = useQuery(
    GET_USERS
  );
  const { data: dataO, error: errorO, loading: loadingO } = useQuery(
    GET_ALL_ORDERS
  );
  if (loadingU)
    return (
      <StyledSpinner>
        <div className="spinner">
          <Spinner color="#ff8600" />
        </div>
      </StyledSpinner>
    );
  if (errorU) return `Error! ${errorU.message}`;
  if (loadingUS)
    return (
      <StyledSpinner>
        <div className="spinner">
          <Spinner color="#ff8600" />
        </div>
      </StyledSpinner>
    );
  if (errorUS) return `Error! ${errorU.message}`;
  if (loadingO)
    return (
      <StyledSpinner>
        <div className="spinner">
          <Spinner color="#ff8600" />
        </div>
      </StyledSpinner>
    );
  if (errorO) return `Error! ${errorU.message}`;

  console.log(dataUS);
  const chart1 = (drivers) => {
    let dataD = [0, 0];
    dataU.drivers.map((user) =>
      user.workingStatus ? (dataD[0] = dataD[0] + 1) : (dataD[1] = dataD[1] + 1)
    );

    console.log(dataD);
    const dataF = {
      labels: ["Driver Accepted", "Driver Rejected"],
      datasets: [
        {
          data: dataD,
          backgroundColor: ["#202124", "#ff8600"],
          hoverBackgroundColor: ["#ef0023", "#202124"],
          borderWidth: 4,
        },
      ],
    };
    return dataF;
  };

  const chart2 = (users, drivers) => {
    let dataD = [0, 0];
    dataUS.costumers.map((user) => (dataD[0] = dataD[0] + 1));
    dataU.drivers.map((user) => (dataD[1] = dataD[1] + 1));

    const dataF = {
      labels: ["Users in App", "Drivers in App"],
      datasets: [
        {
          data: dataD,
          backgroundColor: ["#ff8600", "#202124"],
          hoverBackgroundColor: ["#00507a", "#ef0023"],
          borderWidth: 4,
        },
      ],
    };
    return dataF;
  };

  const chart3 = (users, drivers) => {
    let dataD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataUS.costumers.map(
      (user) =>
        (dataD[moment(user.createdAt).month()] =
          dataD[moment(user.createdAt).month()] + 1)
    );
    dataU.drivers.map(
      (user) =>
        (dataD[moment(user.createdAt).month()] =
          dataD[moment(user.createdAt).month()] + 1)
    );

    console.log(dataD);
    const dataF = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          data: dataD,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#ff8600",
          borderColor: "#ff8600",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#ff8600",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#ff8600",
          pointHoverBorderColor: "#ff8600",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ],
    };
    return dataF;
  };
  const chart4 = (orders) => {
    let dataD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    dataO.allOrders.map(
      (order) =>
        (dataD[moment(order.createdAt).month()] =
          dataD[moment(order.createdAt).month()] + 1)
    );

    console.log(dataD);
    const dataF = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          data: dataD,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "#ff8600",
          borderColor: "#ff8600",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#ff8600",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#ff8600",
          pointHoverBorderColor: "#ff8600",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ],
    };
    return dataF;
  };
  return (
    <>
      <StyledCard>
        <div className="graph1">
          {" "}
          <Doughnut
            data={chart1(dataU.drivers)}
            options={{ maintainAspectRatio: false }}
          />
        </div>
        <div className="graph2">
          {" "}
          <Line
            width={100}
            height={50}
            options={lineOptions}
            data={chart3(dataUS.costumers, dataU.drivers)}
          />
        </div>
        <div className="graph3">
          {" "}
          <Line
            width={100}
            height={50}
            options={lineOptions}
            data={chart4(dataO.allOrders)}
          />
        </div>
        <div className="graph4">
          {" "}
          <Doughnut
            options={{ maintainAspectRatio: false }}
            data={chart2(dataUS.costumers, dataU.drivers)}
          />
        </div>
      </StyledCard>
    </>
  );
}
const StyledSpinner = styled.div`
height: 50vh;
width: 80vw;
overflow-x: hidden;
overflow-y: scroll;
background: #fafafa;
display: flex;
position:relative;
.spinner{
    display:flex;
    position:absolute:
    z-index:100;
    width:100%;
    height:100%;
    justify-content:center;

  }
`;

const StyledCard = styled.div`
  height: 100vh;
  width: 70vw;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #fafafa;
  display: grid;
  grid-template-areas:
    "graph1 graph2"
    "graph3 graph4";

  .graph1 {
    margin: 5%;
    grid-area: graph1;
    padding: 1vw;
    width: 35vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .graph2 {
    margin: 5%;
    grid-area: graph2;
    padding: 1vw;
    width: 35vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .graph3 {
    margin: 5%;
    grid-area: graph3;
    padding: 1vw;
    width: 35vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .graph4 {
    margin: 5%;
    grid-area: graph4;
    padding: 1vw;
    width: 35vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 734px) {
    height: 300vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #fafafa;
    display: grid;
    grid-template-areas:
      "graph1" "graph2"
      "graph3" "graph4";

    .graph1 {
      margin: 5%;
      grid-area: graph1;
      padding: 1vw;
      width: 90vw;
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .graph2 {
      margin: 5%;
      grid-area: graph2;
      padding: 1vw;
      width: 90vw;
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .graph3 {
      margin: 5%;
      grid-area: graph3;
      padding: 1vw;
      width: 90vw;
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .graph4 {
      margin: 5%;
      grid-area: graph4;
      padding: 1vw;
      width: 90vw;
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media only screen and (max-width: 969px) and (min-width: 735px) {
    height: 300vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #fafafa;
    display: grid;
    grid-template-areas:
      "graph1" "graph2"
      "graph3" "graph4";

    .graph1 {
      margin: 5%;
      grid-area: graph1;
      padding: 1vw;
      width: 90vw;
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .graph2 {
      margin: 5%;
      grid-area: graph2;
      padding: 1vw;
      width: 90vw;
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .graph3 {
      margin: 5%;
      grid-area: graph3;
      padding: 1vw;
      width: 90vw;
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .graph4 {
      margin: 5%;
      grid-area: graph4;
      padding: 1vw;
      width: 90vw;
      height: 60vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
