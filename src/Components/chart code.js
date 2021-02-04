//lấy dữ liệu VNIndex "https://bgapidatafeed.vps.com.vn/getchartindexdata/10"
//getMarketIndicattor
//InitChart

function getMarketIndicator(marketCode) {
  $.getJSON(
    historyIndicatorLink + marketCode,
    {},
    function (zdata) {
      if (zdata != null) {
        var code = zdata.marketCode;
        var openIndex = 0;
        if (zdata.hasOwnProperty("openIndex")) {
          openIndex = zdata.openIndex;
        } else if (marketCode == MARKET["HSX"]) {
          openIndex = objOIndex.HSXOINDEX;
        }

        var oVol = 0;
        var j = 0;
        $.each(zdata.data, function (i, idata) {
          if (i == 0) {
            oVol = idata.vol;
            // openIndex = idata.oIndex;
          } else if (idata.time != null && idata.time != "null") {
            var date = new Date();
            bYear = date.getFullYear();
            bMonth = date.getMonth() + 1;
            bDay = date.getDate();
            eYear = date.getFullYear();
            eMonth = date.getMonth() + 1;
            eDay = date.getDate();
            var h = idata.time.split(":");
            var utc = Date.UTC(bYear, bMonth, bDay, h[0], h[1]);
            var indexData = { x: utc, y: idata.cIndex };
            var volumeData = { x: utc, y: idata.vol - oVol };

            if (
              ((h[0] == "13" && h[1] == "00") ||
                (h[0] == "12" && h[1] == "59")) &&
              j == 0
            ) {
              //alert('them diem null');
              var nullUtc1 = Date.UTC(bYear, bMonth, bDay, 11, 31);
              var nullUtc2 = Date.UTC(bYear, bMonth, bDay, 12, 59);
              var indexDataP1 = { x: nullUtc1, y: idata.cIndex };
              var indexDataV1 = { x: nullUtc1, y: 0 };
              var indexDataP2 = { x: nullUtc2, y: idata.cIndex };
              var indexDataV2 = { x: nullUtc2, y: 0 };
              if (marketCode == MARKET["HSX"]) {
                data_HSX.series.push(indexDataP1);
                data_HSX.series.push(indexDataP2);
                data_HSX.volume.push(indexDataV1);
                data_HSX.volume.push(indexDataV2);
              }
              j++;
            }
            if (idata.vol - oVol > 0) {
              // HSX
              if (marketCode == MARKET["HSX"]) {
                if (
                  data_HSX.series.length == 0 ||
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

        // ve do thi
        if (marketCode == MARKET["HSX"]) {
          initChart(
            indexChart_HSX,
            "containerHSX",
            marketCode,
            data_HSX.series,
            openIndex,
            data_HSX.volume
          );
        }
      }
    },
    "jsonp"
  );
  return false;
}

function initChart(
  stockChart,
  chartName,
  marketCode,
  indexData,
  openIndex,
  volumeData
) {
  var stockCode = "";
  var iMin = openIndex;
  var bMin = 9;
  var mColor = "#ffd700";
  var vMax = 0;
  //alert("length = " + indexData.length + " openIndex = " + openIndex);
  if (marketCode == MARKET["HSX"]) {
    stockCode = "VNIndex";
    bMin = b91Min;
    vMax = 1000000;
  }

  stockChart = new Highcharts.Chart({
    chart: {
      renderTo: chartName,
      backgroundColor: "#111217",
      // zoomType: 'xy',
      animation: false,
      marginLeft: 2,
      marginRight: 2,
      marginBottom: 22,
      marginTop: 2,
      // margin: 20,
      height: 79,
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
    series: [
      {
        type: "line",
        color: "#d1af54",
        data: [
          [Date.UTC(bYear, bMonth, bDay, bHour, bMin), openIndex],
          [Date.UTC(eYear, eMonth, eDay, eHour, eMin), openIndex],
        ],
        pointInterval: 60 * 10000,
        pointStart: Date.UTC(bYear, bMonth, bDay, bHour, bMin),
        pointEnd: Date.UTC(eYear, eMonth, eDay, eHour, eMin),
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
  });

  if (marketCode == MARKET["HSX"]) {
    indexChart_HSX = stockChart;
  }
}

function processChart(data) {
  sendChartQueue(data);
}

sendChartQueue = function (idata) {
  if (objPage != null && objPage.sendMessage != undefined)
    objPage.sendMessage(JSON.stringify(idata));
};
