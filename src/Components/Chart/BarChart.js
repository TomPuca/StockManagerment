import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

function BarChart(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    // console.log("Data :", props);
    setData({
      // prettier-ignore
      labels: ["January", "February", "March", "April", "May", "June" , "July" , "August", "September", "October" ,"November" ,"December"],
      datasets: [
        {
          type: "line",
          label: props.MainLabel,
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
          fill: false,
          // prettier-ignore
          data: [
            props.Total, props.Total, props.Total, props.Total, props.Total, props.Total, props.Total, props.Total, props.Total, props.Total, props.Total, props.Total, ],
        },
        {
          label: props.SubLabel,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
          // borderColor: "rgba(0,0,0,1)",
          borderWidth: 1,
          // data: [65, -59, 80, 81, 56],
          data: props.data,
        },
      ],
    });
  }, [props]);

  return (
    <div >
      <Bar
        width={375}
        data={data}
        options={{
          responsive: false,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: props.MainLabel,
            fontSize: 12,
          },
          //No Display legend in the page
          legend: {
            display: false,
            position: "right",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (value) {
                    return (
                      "$" +
                      value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    );
                  },
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                return (
                  "$" +
                  Number(tooltipItem.yLabel)
                    .toFixed(0)
                    .replace(/./g, function (c, i, a) {
                      return i > 0 && c !== "." && (a.length - i) % 3 === 0
                        ? "," + c
                        : c;
                    })
                );
              },
            },
          },
          plugins: {
            datalabels: {
              display: false,
              color: "red",
            },
          },
        }}
      />
    </div>
  );
}

export default BarChart;
