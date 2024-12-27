import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "antd";
import "chartjs-plugin-datalabels";

function BarChart(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    setData({
      labels: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      datasets: [
        {
          type: "bar",
          label: props.MainLabel,
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
          data: props.data,
        },
      ],
    });
  }, [props]);

  return (
      <Card
          title="Monthly Income"
          style={{
            width: "375px",
            margin: "0 auto",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            overflow: "hidden"
          }}
      >
        <div style={{ width: "100%", height: "300px" }}>
          <Bar
              data={data}
              width={375}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                title: {
                  display: true,
                  text: props.MainLabel,
                  fontSize: 16,
                },
                legend: {
                  display: false,
                  position: "top",
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                        callback: function (value) {
                          return "$" + value.toLocaleString();
                        },
                      },
                    },
                  ],
                },
                plugins: {
                  datalabels: {
                    display: true,
                    color: "#000",
                    anchor: "end",
                    align: "top",
                  },
                },
              }}
          />
        </div>
      </Card>
  );
}

export default BarChart;
