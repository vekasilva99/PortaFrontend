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
  if (loadingU) return "Loading...";
  if (errorU) return `Error! ${errorU.message}`;
  if (loadingUS) return "Loading...";
  if (errorUS) return `Error! ${errorU.message}`;
  if (loadingO) return "Loading...";
  if (errorO) return `Error! ${errorU.message}`;

  console.log(dataUS);
  const chart1 = (drivers) => {
    let dataD = [0, 0];
    dataU.drivers.map((user) =>
      user.workingStatus ? (dataD[0] = dataD[0] + 1) : (dataD[1] = dataD[1] + 1)
    );

    console.log(dataD);
    const dataF = {
      labels: ["Accepted", "Rejected"],
      datasets: [
        {
          data: dataD,
          backgroundColor: ["#ef0023", "#ebebeb"],
          hoverBackgroundColor: ["#ef0023", "#ebebeb"],
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
      labels: ["Users", "Drivers"],
      datasets: [
        {
          data: dataD,
          backgroundColor: ["#00507a", "#ef0023"],
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
          backgroundColor: "#ebebeb",
          borderColor: "#ebebeb",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#ebebeb",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#ebebeb",
          pointHoverBorderColor: "#ebebeb",
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
          backgroundColor: "#ebebeb",
          borderColor: "#ebebeb",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#ebebeb",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#ebebeb",
          pointHoverBorderColor: "#ebebeb",
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
        <div classname="graph">
          {" "}
          <Doughnut
            width={10}
            height={5}
            data={chart1(dataU.drivers)}
            className="graph1"
          />
        </div>
        <div classname="graph">
          {" "}
          <Doughnut
            width={10}
            height={5}
            data={chart2(dataUS.costumers, dataU.drivers)}
          />
        </div>
        <div classname="graph">
          {" "}
          <Line
            width={100}
            height={50}
            options={lineOptions}
            data={chart3(dataUS.costumers, dataU.drivers)}
          />
        </div>
        <div classname="graph">
          {" "}
          <Line
            width={100}
            height={50}
            options={lineOptions}
            data={chart4(dataO.allOrders)}
          />
        </div>
      </StyledCard>
    </>
  );
}

const StyledCard = styled.div`
  height: auto;
  width: 100%;
  top: 0;
  left: 0;
  background: pink;
  overflow-x: hidden;
  background: #fafafa;
  display: grid;
  grid-area: profile;
  grid-template-areas:
    "graph"
    "graph";

  .graph {
    grid-area: graph;
    width: 50%;
    height: 50%;
  }

  .graph1 {
    width: 50px;
    height: 50px;
  }
`;
