import React, { useState, useEffect } from "react";
import "./VnIndexChart.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useInterval } from "./Functions";

// const marketCode = "10";

function VnIndexChart() {
  const historyIndicatorLink =
    "https://bgapidatafeed.vps.com.vn/getchartindexdata/";
  const data_HSX = { open: 0, series: [], volume: [] };
  const [data, setData] = useState({ options: {} });
  const [isLoading, setIsLoading] = useState(false);
  let date = new Date();
  let bYear = date.getFullYear();
  let bMonth = date.getMonth() + 1;
  let bDay = date.getDate();
  let bHour = 9;
  let bMin = 15;
  let eYear = date.getFullYear();
  let eMonth = date.getMonth() + 1;
  let eDay = date.getDate();
  let eHour = 11;
  let eMin = 0;
  let newOptions;
  // let openIndex = 1075.56;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      //Lấy dữ liệu VNindex
      getMarketIndicator("10");
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useInterval(() => {
    // Your custom logic here
    getMarketIndicator("10");
    // console.log("HSX update:", Date());
  }, 60000);

  async function getMarketIndicator(marketCode) {
    const res = await fetch(historyIndicatorLink + marketCode);
    const zdata = await res.json();
    // console.log("zdata", zdata);
    // eMin = date.getMinutes();
    // if (eMin < 50) {
    //   eHour = date.getHours() + 2;
    //   // console.log(eHour);
    //   eMin = eMin;
    // } else {
    //   eHour = date.getHours() + 4;
    //   console.log("else", eHour);
    //   eMin = 5;
    // }
    eHour = date.getHours();
    if (eHour > 8 && eHour <= 12) {
      eHour = date.getHours() + 2;
      eMin = 0;
    } else {
      eHour = 14;
      eMin = 16;
    }

    if (zdata != null) {
      // let code = zdata.marketCode;
      let openIndex = 0;
      if (zdata.hasOwnProperty("openIndex")) {
        openIndex = zdata.openIndex;
      }
      let oVol = 0;
      let j = 0;
      zdata.data.map((idata, i) => {
        if (i === 0) {
          oVol = idata.vol;
          // openIndex = idata.oIndex;
        } else if (idata.time !== null && idata.time !== "null") {
          let h = idata.time.split(":");
          let utc = Date.UTC(bYear, bMonth, bDay, h[0], h[1]);
          let indexData = { x: utc, y: idata.cIndex };
          let volumeData = { x: utc, y: idata.vol - oVol };

          if (
            ((h[0] === "13" && h[1] === "00") ||
              (h[0] === "12" && h[1] === "59")) &&
            j === 0
          ) {
            //alert('them diem null');
            let nullUtc1 = Date.UTC(bYear, bMonth, bDay, 11, 31);
            let nullUtc2 = Date.UTC(bYear, bMonth, bDay, 12, 59);
            let indexDataP1 = { x: nullUtc1, y: idata.cIndex };
            let indexDataV1 = { x: nullUtc1, y: 0 };
            let indexDataP2 = { x: nullUtc2, y: idata.cIndex };
            let indexDataV2 = { x: nullUtc2, y: 0 };
            if (marketCode === "10") {
              data_HSX.series.push(indexDataP1);
              data_HSX.series.push(indexDataP2);
              data_HSX.volume.push(indexDataV1);
              data_HSX.volume.push(indexDataV2);
            }
            j++;
          }
          if (idata.vol - oVol > 0) {
            // HSX
            if (marketCode === "10") {
              if (
                data_HSX.series.length === 0 ||
                utc - data_HSX.series[data_HSX.series.length - 1].x >= 60000
              ) {
                data_HSX.open = openIndex;
                data_HSX.series.push(indexData);
                data_HSX.volume.push(volumeData);
                oVol = idata.vol;
              } else {
                data_HSX.series[data_HSX.series.length - 1] = indexData;
                data_HSX.volume[data_HSX.volume.length - 1] = volumeData;
              }
            }
          }
        }
      });
      // console.log("data_HSC: ", data_HSX);
      // ve do thi
      // prettier-ignore
      initChart("containerHSX",marketCode,data_HSX.series,openIndex,data_HSX.volume);
      // console.log("end get data", newOptions);
    }
  }

  function initChart(chartName, marketCode, indexData, openIndex, volumeData) {
    // let stockCode = "VNIndex";
    // let iMin = openIndex;
    // let mColor = "#ffd700";
    // let vMax = 1000000;
    // console.log("index data:", indexData);
    // console.log("volume data:", volumeData);
    newOptions = {
      chart: {
        renderTo: chartName,
        backgroundColor: "#111217",
        // zoomType: 'xy',
        animation: false,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 22,
        marginTop: 2,
        borderRadius: 5,
        // margin: 20,
        height: 90,
        width: 250,
      },
      title: { text: "" },
      xAxis: {
        type: "datetime",
        gridLineColor: "#C0C0C0",
        gridLineWidth: 0,
        labels: {
          style: {
            color: "#B6BDCD",
            fontSize: "10px",
          },
        },
      },
      yAxis: [
        {
          // Primary yAxis
          title: { text: "" },
          gridLineColor: "#C0C0C0",
          gridLineWidth: 0,
          labels: { enabled: false },
        },
        {
          // Secondary yAxis
          title: { text: "" },
          opposite: true,
          //max: vMax,
          gridLineColor: "#C0C0C0",
          gridLineWidth: 0,
          labels: { enabled: false },
        },
      ],
      plotOptions: {
        line: {
          animation: false,
          lineWidth: 1.5,
          marker: {
            enabled: false,
          },
          threshold: openIndex,
        },
        area: {
          animation: false,
          lineWidth: 1,
          marker: {
            enabled: false,
          },
          shadow: false,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
        },
        series: {
          connectNulls: true,
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: "line",
          color: "#d1af54",
          data: [
            [Date.UTC(bYear, bMonth, bDay, bHour, bMin), openIndex],
            [Date.UTC(eYear, eMonth, eDay, eHour, eMin), openIndex],
          ],
          pointInterval: 60 * 10000,
          pointStart: Date.UTC(2021, 2, 3, 9, 0),
          pointEnd: Date.UTC(2021, 2, 3, 14, 0),
          marker: {
            enabled: false,
          },
          dashStyle: "shortdash",
          enableMouseTracking: false,
          dataLabels: [
            {
              enabled: true,
              style: {
                color: "#B6BDCD",
                fontSize: "9px",
              },
              x: 120,
            },
            {
              enabled: true,
              style: {
                color: "#FFF",
                fontSize: "9px",
                opacity: 0.001,
              },
              x: 248,
            },
          ],
        },
        {
          type: "area",
          name: "Volume",
          yAxis: 1,
          color: "#67CDF0",
          pointInterval: 60 * 10000,
          pointStart: Date.UTC(bYear, bMonth, bDay, bHour, bMin),
          pointEnd: Date.UTC(eYear, eMonth, eDay, eHour, eMin),
          data: volumeData,
          selected: true,
          connectNulls: false,
          enableMouseTracking: false,
          dataGrouping: {
            second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
          },
        },
        {
          type: "line",
          threshold: openIndex,
          color: getColor("i"),
          negativeColor: getColor("d"),
          name: "VN-INDEX",
          pointInterval: 60 * 10000,
          pointStart: Date.UTC(bYear, bMonth, bDay, bHour, bMin),
          pointEnd: Date.UTC(eYear, eMonth, eDay, eHour, eMin),
          data: indexData,
          selected: true,
          connectNulls: true,
          enableMouseTracking: false,
          dataGrouping: {
            second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
          },
        },
      ],
    };
    // console.log("End make options:", newOptions);
    setData({ options: newOptions });
  }

  function getColor(cl) {
    if (cl === "d" || cl === "txt-red") return "red";
    if (cl === "i" || cl === "txt-lime") return "#0f0";
    if (cl === "e") return "#ffd900";
    if (cl === "c" || cl === "ceiling") return "#ff25ff";
    if (cl === "f" || cl === "floor") return "#1eeeee";

    return "#f0f0f0";
  }
  return (
    <div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={data.options} />
      )}
    </div>
  );
}

export default VnIndexChart;
