var stockChart;
var openStock;

var ceilPrice;
var floorPrice;
var refPrice;
var stockBaseInfo;
var setTimeStamp;

var currentPortfolioId;
var currentPortfolio;
var portfolioIds;

function initPage() {
  setTimeStamp = setInterval(startTime, 1000);
  $(".tab-left .tab:has(a.active)").addClass("active");
  loadLocalStoreage();
  // getModalColumnShow();
  initQueue();
  queue1101();
  queue3210();
  queue3211();
  queue3220();
  queue3250();
  queue3310();
  queue9999();
  queueMktTime();
  // phaisinhQueue();
  // loadTopTrade();
  // initWebsocket();
  currentPortfolioId = $.jStorage.get("CURRENT_PORTFOLIO_ID", null);

  loadDanhmucMacdinh();
  loadTheme();
  // $.get("Tempfile/stockinfo.txt", function (data) {
  // 	try {
  // 		var rs = JSON.parse(data);
  // 	} catch (e) {
  // 		rs = data;
  // 	}

  // 	modal.listIndex = rs.data;
  // 	setAutoComplete('txtAddStock', rs.data);
  // 	initTooltipPrice();
  // });
  if (
    vStockPs == null ||
    vStockPs == "undefined" ||
    typeof vStockPs === "undefined"
  ) {
    $.ajaxSetup({ async: false });
    $.getJSON(
      psListLink,
      function (zdata) {
        zdata.sort();
        vStockPs = zdata;
      },
      "jsonp"
    );
    $.ajaxSetup({ async: true });
  }
  $.getJSON(getAllListStock, function (data) {
    if (data != null) {
      modal.listIndex = data;
      setAutoComplete("txtAddStock", data);
      setAutoComplete("txtModalStock", data);
      initTooltipPrice();
    }
  });

  loadViewDetail();
  loadInfoBox();
  timer = setInterval(loadInfoBox, timeReloadChart * 60 * 1000);

  // loadInfoBox();
  // getMarketIndicator(MARKET['HSX']);
  // getMarketIndicator(MARKET['HNX']);
  // getMarketIndicator(MARKET['UPCOM']);
  // getMarketIndicator(MARKET['HSX30']);

  loadChangeNews();
  hotnewsBox.init();

  if (!location.href.toString().includes("#ThoaThuan")) {
    getvaluethoathuan();
  }

  loadGlobalIndex();
}

function logout() {
  delete_cookie("USER");
  delete_cookie("JSESSION");

  global = { user: "", sid: "", accounts: null };
  if ($(".panel-order").is(":visible")) $(".panel-order").toggle();

  $(".dropdown-account").css("display", "none");
  $(".panel-comment").css("display", "none");
  $("#btn-fb-login").css("display", "");
  $("#btn-login").css("display", "");
  orderModel.txtPin = "";
  loadDanhmucMacdinh();
}

function getDifferenceTime() {
  // getDiffTime
  $.getJSON(getDiffTime, {}, function (zdata) {
    // console.log(zdata);
    try {
      var rs = JSON.parse(zdata);
    } catch (e) {
      rs = zdata;
    }

    var dnow = new Date();
    var sysdate =
      (dnow.getDate() < 10 ? "0" + dnow.getDate() : dnow.getDate()) +
      "/" +
      (dnow.getMonth() + 1 < 10
        ? "0" + (dnow.getMonth() + 1)
        : dnow.getMonth() + 1) +
      "/" +
      dnow.getFullYear() +
      " " +
      rs.srv_time;

    serverTime = getDateFromFormat(sysdate, "dd/MM/yyyy HH:mm:ss");
    console.info("serverTime", new Date(serverTime));

    var sdate = getDateFromFormat(sysdate, "dd/MM/yyyy HH:mm:ss");
    mktTime = Math.ceil(sdate - dnow.getTime());
  }).done(function (data) {
    fnDisplayTimeStamp();
  });
}

function loadInfoBox() {
  var targetDate = new Date().getHours();
  // check thá»i gian, náº¿u lá»›n hÆ¡n 3h chiá»u
  if (targetDate > 15 && timer != null) clearInterval(timer);

  var lt = settingUI.charts.length;

  data_HSX = { open: 0, series: [], volume: [] };
  data_VN30 = { open: 0, series: [], volume: [] };
  data_HNX = { open: 0, series: [], volume: [] };
  data_HNX30 = { open: 0, series: [], volume: [] };
  data_UPCOM = { open: 0, series: [], volume: [] };
  $("#if-chart-UPCOMIndex").remove();
  $("#if-chart-HNXIndex").remove();
  $("#if-chart-VNIndex").remove();
  $("#if-chart-VN30Index").remove();
  for (var i = lt - 1; i >= 0; i--) {
    // $('#if-chart-'+settingUI.charts[i]).remove();
    var lf = 1;
    if (i > 0) {
      lf = 250 * i;
    }
    // console.log(ChartHeaderName[settingUI.charts[i]], settingUI.charts[i])
    var html =
      '<div id="if-chart-' +
      settingUI.charts[i] +
      '" class="card chart" style="width: 250px; left: ' +
      lf +
      'px;">\
						<div class="card-body">\
							<div class="row">\
								<h6>' +
      ChartHeaderName[settingUI.charts[i]] +
      '</h6>\
								<div class="d-flex no-block align-items-center" id="container' +
      settingUI.charts[i].replace("Index", "").replace("VN", "HSX") +
      '"></div>\
								<div id="index-minibox-' +
      settingUI.charts[i] +
      '" class="font-12 w-100 txt-center index-minibox"></div>\
							</div>\
						</div>\
					</div>';
    $(".info-box .inner").prepend(html);
    // console.log(settingUI.charts[i].replace('Index', '').replace('VN','HSX'), MARKET[settingUI.charts[i].replace('Index', '').replace('VN','HSX')]);
    // console.log(MARKET[settingUI.charts[i].replace('Index', '').replace('VN','HSX')]);
    getMarketIndicator(
      MARKET[settingUI.charts[i].replace("Index", "").replace("VN", "HSX")]
    );
  }

  //$('.info-box .inner .index').css('left', lt * 250 + 'px');
  $(".info-box .inner .word-index").css("left", lt * 250 + "px");
  $(".info-box .inner .commondity-index").css("left", lt * 250 + 354 + "px");
  $(".info-box .inner .dow-jones-futures").css(
    "left",
    lt * 250 + 354 + 180 + "px"
  );

  loadIndexBox();
}

initGlobalIndexSocket = function () {
  if (socket != null && socket != "undefined") {
    socket.on("INDEX_CRUDEOILWTI", function (zdata) {
      var dt = JSON.parse(zdata);
      fnUpdateIndexPcanel(dt);
    });
    socket.on("INDEX_GOLD", function (zdata) {
      var dt = JSON.parse(zdata);
      fnUpdateIndexPanel(dt);
    });
    socket.on("INDEX_DOW30", function (zdata) {
      var dt = JSON.parse(zdata);
      fnUpdateIndexPanel(dt);
    });
    socket.on("INDEX_HANGSENG", function (zdata) {
      var dt = JSON.parse(zdata);
      fnUpdateIndexPanel(dt);
    });
    socket.on("INDEX_NIKKEI225", function (zdata) {
      var dt = JSON.parse(zdata);
      fnUpdateIndexPanel(dt);
    });
    socket.on("INDEX_SHANGHAI", function (zdata) {
      var dt = JSON.parse(zdata);
      fnUpdateIndexPanel(dt);
    });

    socket.on("INDEX_DJFUTURE", function (zdata) {
      var dt = JSON.parse(zdata);
      fnUpdateIndexPanel(dt);
    });

    socket.on("refreshinfo", function (zdata) {
      console.log(zdata);
      if (zdata == "DAYSTART_REFRESH") {
        location.reload(true);
      }
    });
  }
};

function fnUpdateIndexPanel(dt) {
  var name = dt.index;
  if (_.isEmpty(name)) {
    name = dt.commodity;
  }
  var obj = $(".word-index span.indexName:contains('" + name + "')");
  if (obj.length < 1) return false;

  var cl = dt.color == "r" ? "redClockIcon" : "greenClockIcon";
  obj
    .next("span")
    .text(dt.last)
    .next("span")
    .removeClass("redClockIcon")
    .removeClass("greenClockIcon")
    .addClass(cl);

  var div = obj.closest("div[data-name]");
  div.find("span.change span:eq(0)").text(dt.change).next().text(dt.changePc);

  cl = dt.change.includes("-") ? "txt-red" : "txt-lime";
  setTracking('div[data-name="' + name + '"] .change span:first-child', cl);
  cl = dt.changePc.includes("-") ? "txt-red" : "txt-lime";
  setTracking('div[data-name="' + name + '"] .change span:last-child', cl);
}

setAutoComplete = function (id, dataSource) {
  $("#" + id).autocomplete({
    minLength: 0,
    autoSelect: false,
    autoFocus: true,
    delay: 0,
    create: function () {
      $(this).data("ui-autocomplete")._renderItem = function (ul, item) {
        return $("<li>")
          .append(
            "<a><b>" +
              item.value +
              "</b> - " +
              item.name +
              " - " +
              item.san +
              "</a>"
          )
          .appendTo(ul);
      };
    },
    source: function (request, response) {
      var keySearch = (request.term + "").toUpperCase();
      var matcherbegin = new RegExp(
        "^" + $.ui.autocomplete.escapeRegex(keySearch),
        "i"
      );
      var matcher = new RegExp($.ui.autocomplete.escapeRegex(keySearch), "i");
      var rep = new Array(); // response array
      var maxRepSize = 10; // maximum response size

      // Æ¯u tiĂªn tĂ¬m chĂ­nh xĂ¡c trÆ°á»›c
      if ((keySearch + "").length > 2) {
        var ite = _.find(dataSource, function (x) {
          return (x.stock_code + "").toUpperCase() == keySearch;
        });
        if (!_.isEmpty(ite))
          rep.push({
            name: ite.name_vn,
            value: ite.stock_code,
            option: ite,
            san: ite.post_to,
          });
      }
      // TĂ¬m gáº§n Ä‘Ăºng
      for (var i = 0; i < dataSource.length; i++) {
        var value = dataSource[i].stock_code;
        // if (dataSource[i].sharetype == "F") {
        if (
          value &&
          value != keySearch &&
          (!keySearch || matcher.test(value) || matcherbegin.test(value))
        )
          // add element to result array
          rep.push({
            name: dataSource[i].name_vn, // no more bold
            value: value,
            option: dataSource[i],
            san: dataSource[i].post_to,
          });
        // } else {
        // 	if (value && (!request.term || matcherbegin.test(value)))
        // 		// add element to result array
        // 		rep.push({
        // 			name: dataSource[i].C_SHARE_NAME, // no more bold
        // 			value: value,
        // 			option: dataSource[i]
        // 		});
        // }

        if (rep.length > maxRepSize) {
          /*
					rep.push({
						name: "........",
						value: "maxRepSizeReached",
						exchange: "",
						option: ""
					});
					*/
          break;
        }
      }
      if (id == "txtAddStock") {
        vStockPs.forEach((element) => {
          rep.push({
            name: element,
            value: element,
            option: element,
            san: "PS",
          });
        });
      }
      // send response
      response(rep);
    },

    select: function (event, ui) {
      var obj = $(this);
      obj.val(ui.item.value);
      obj.attr("san", ui.item.san);
      if ($("#detail-modal").is(":visible")) {
        changeStockInfoModal(ui.item.value);
      } else if ($("#txtAddStock").val() != "") {
        var sym = ($("#txtAddStock").val() + "").toUpperCase();
        addStockDM(sym);
      }

      obj.change();
      return false;
    },
    open: function (event, ui) {
      $(this).autocomplete("widget").css({
        width: 400,
      });
    },
  });
};

initQueue = function () {
  window.csQueue = $.jqmq({
    delay: -1,
    batch: 1,
    callback: function (idata) {
      try {
        //console.log("[RECV] - " + idata );
        processMsg(idata);
      } catch (e) {
        console.log("[DEBUG] - error = " + idata + " err =" + e.message);
      }

      csQueue.next();
    },
    // When the queue completes naturally, execute this function.
    complete: function () {
      //alert('complete');
    },
  });
};

phaisinhQueue = function () {
  window.psQueue = $.jqmq({
    delay: -1,
    batch: 1,
    callback: function (idata) {
      try {
        //console.log("[RECV] - " + idata );
        processMsgPs(idata);
      } catch (e) {
        console.log("[DEBUG] - error = " + idata + " err =" + e.message);
      }

      psQueue.next();
    },
    // When the queue completes naturally, execute this function.
    complete: function () {
      //alert('complete');
    },
  });
};

queue1101 = function () {
  window.queue1101 = $.jqmq({
    delay: -1,
    batch: 1,
    callback: function (idata) {
      try {
        processAddPoint(idata);
        processIndexReal(idata);
      } catch (e) {
        console.log("[DEBUG] - error = " + idata + " err =" + e.message);
      }

      queue1101.next();
    },
    // When the queue completes naturally, execute this function.
    complete: function () {
      //alert('complete');
    },
  });
};

queue3210 = function () {
  window.queue3210 = $.jqmq({
    delay: -1,
    batch: 1,
    callback: function (idata) {
      try {
        processTP(idata);
      } catch (e) {
        console.log("[DEBUG] - error = " + idata + " err =" + e.message);
      }

      queue3210.next();
    },
    // When the queue completes naturally, execute this function.
    complete: function () {
      //alert('complete');
    },
  });
};

queue3211 = function () {
  window.queue3211 = $.jqmq({
    delay: -1,
    batch: 1,
    callback: function (idata) {
      try {
        process10Gia(idata);
      } catch (e) {
        console.log("[DEBUG] - error = " + idata + " err =" + e.message);
      }

      queue3211.next();
    },
    // When the queue completes naturally, execute this function.
    complete: function () {
      //alert('complete');
    },
  });
};

queue3220 = function () {
  window.queue3220 = $.jqmq({
    delay: -1,
    batch: 1,
    callback: function (idata) {
      try {
        processLS(idata);
        processRsi(idata);
        if (
          $(".panel-order").is(":visible") &&
          $("#sel-account-order").val().endsWith("8")
        ) {
          if (
            idata.sym == $("#txt-sym-order").val() &&
            $(".btn-real-price").hasClass("active")
          ) {
            $("#txt-val-order").val(idata.lastPrice);
          }
        }
      } catch (e) {
        console.log("[DEBUG] - error = " + idata + " err =" + e.message);
      }

      queue3220.next();
    },
    // When the queue completes naturally, execute this function.
    complete: function () {
      //alert('complete');
    },
  });
};

queue3250 = function () {
  window.queue3250 = $.jqmq({
    delay: -1,
    batch: 1,
    callback: function (idata) {
      try {
        processTR(idata);
      } catch (e) {
        console.log("[DEBUG] - error = " + idata + " err =" + e.message);
      }

      queue3250.next();
    },
    // When the queue completes naturally, execute this function.
    complete: function () {
      //alert('complete');
    },
  });
};

queue3310 = function () {
  window.queue3310 = $.jqmq({
    delay: -1,
    batch: 1,
    callback: function (idata) {
      try {
        processTV(idata);
      } catch (e) {
        console.log("[DEBUG] - error = " + idata + " err =" + e.message);
      }

      queue3310.next();
    },
    // When the queue completes naturally, execute this function.
    complete: function () {
      //alert('complete');
    },
  });
};

queue9999 = function () {
  window.queue9999 = $.jqmq({
    delay: -1,
    batch: 1,
    callback: function (idata) {
      try {
        processChart(idata);
      } catch (e) {
        console.log("[DEBUG] - error = " + idata + " err =" + e.message);
      }

      queue9999.next();
    },
    // When the queue completes naturally, execute this function.
    complete: function () {
      //alert('complete');
    },
  });
};

queueMktTime = function () {
  window.queueMktTime = $.jqmq({
    delay: -1,
    batch: 1,
    callback: function (idata) {
      try {
        processTranfferDiff(idata);
      } catch (e) {
        console.log("[DEBUG] - error = " + idata + " err =" + e.message);
      }

      queueMktTime.next();
    },
    // When the queue completes naturally, execute this function.
    complete: function () {
      //alert('complete');
    },
  });
};

sendQueue = function (idata) {
  if (window.csQueue) {
    csQueue.add(idata);
  }
};

sendQueue1101 = function (idata) {
  if (window.queue1101) {
    queue1101.add(idata);
  }
};

sendQueue3210 = function (idata) {
  if (window.queue3210) {
    queue3210.add(idata);
  }
};

sendQueue3211 = function (idata) {
  if (window.queue3211) {
    queue3211.add(idata);
  }
};

sendQueue3220 = function (idata) {
  if (window.queue3220) {
    queue3220.add(idata);
  }
};

sendQueue3250 = function (idata) {
  if (window.queue3250) {
    queue3250.add(idata);
  }
};

sendQueue3310 = function (idata) {
  if (window.queue3310) {
    queue3310.add(idata);
  }
};

sendQueue9999 = function (idata) {
  if (window.queue9999) {
    queue9999.add(idata);
  }
};

sendQueueMktTime = function (idata) {
  if (window.queueMktTime) {
    queueMktTime.add(idata);
  }
};

processMsg = function (idata) {
  // tuy loai msg ma xu ly
  // console.log('processMsg: ' + idata);
  // console.log("[IU] " + JSON.stringify(idata));
  switch (idata.id) {
    case 1101:
      if (!idata.hasOwnProperty("cmd")) {
        sendQueue1101(idata);
      }
      break;
    case 3210:
      sendQueue3210(idata);
      break;
    case 3211:
      sendQueue3211(idata);
      break;
    case 3220:
      sendQueue3220(idata);
      break;
    case 3223:
      // dá»± tĂ­nh
      // console.log('3223 - ' + idata);
      processLS(idata);
      break;
    case 3250:
      sendQueue3250(idata);
      break;
    case 3310:
      sendQueue3310(idata);
      break;
    case 9999:
      sendQueue9999(idata);
      break;
    default:
      break;
  }
};

function send(message) {
  if (!window.WebSocket) return false;
  if (socket.readyState == WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.log("WebSocket is not open!");
  }
}

function loadViewDetail() {
  var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
  var idata = _.find(dmck, function (o) {
    return o.active == true;
  });
  // var idata = $.jStorage.get('DANH-MUC-MAC-DINH');
  if (idata != null) {
    vStockListSelected = idata.symbols.join(",");
    $('.tab-left a[href="#DanhSachTheoDoi"]').text(idata.name);
  }
}

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
        } else if (marketCode == MARKET["HNX"]) {
          openIndex = objOIndex.HNXOINDEX;
        } else if (marketCode == MARKET["UPCOM"]) {
          openIndex = objOIndex.UPCOMOINDEX;
        } else if (marketCode == MARKET["HSX30"]) {
          openIndex = objOIndex.VN30OINDEX;
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
              } else if (marketCode == MARKET["HNX"]) {
                data_HNX.series.push(indexDataP1);
                data_HNX.series.push(indexDataP2);
                data_HNX.volume.push(indexDataV1);
                data_HNX.volume.push(indexDataV2);
              } else if (marketCode == MARKET["UPCOM"]) {
                data_UPCOM.series.push(indexDataP1);
                data_UPCOM.series.push(indexDataP2);
                data_UPCOM.volume.push(indexDataV1);
                data_UPCOM.volume.push(indexDataV2);
              } else if (marketCode == MARKET["HSX30"]) {
                data_VN30.series.push(indexDataP1);
                data_VN30.series.push(indexDataP2);
                data_VN30.volume.push(indexDataV1);
                data_VN30.volume.push(indexDataV2);
              } else if (marketCode == MARKET["HNX30"]) {
                data_HNX30.series.push(indexDataP1);
                data_HNX30.series.push(indexDataP2);
                data_HNX30.volume.push(indexDataV1);
                data_HNX30.volume.push(indexDataV2);
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
              } else if (marketCode == MARKET["HNX"]) {
                if (
                  data_HNX.series.length == 0 ||
                  utc - data_HNX.series[data_HNX.series.length - 1].x >= 60000
                ) {
                  data_HNX.open = openIndex;
                  data_HNX.series.push(indexData);
                  data_HNX.volume.push(volumeData);
                  oVol = idata.vol;
                } else {
                  data_HNX.series[data_HNX.series.length - 1] = indexData;
                  data_HNX.volume[data_HNX.volume.length - 1] = volumeData;
                }
              } else if (marketCode == MARKET["UPCOM"]) {
                if (
                  data_UPCOM.series.length == 0 ||
                  utc - data_UPCOM.series[data_UPCOM.series.length - 1].x >=
                    60000
                ) {
                  data_UPCOM.open = openIndex;
                  data_UPCOM.series.push(indexData);
                  data_UPCOM.volume.push(volumeData);
                  oVol = idata.vol;
                } else {
                  data_UPCOM.series[data_UPCOM.series.length - 1] = indexData;
                  data_UPCOM.volume[data_UPCOM.volume.length - 1] = volumeData;
                }
              } else if (marketCode == MARKET["HSX30"]) {
                if (
                  data_VN30.series.length == 0 ||
                  utc - data_VN30.series[data_VN30.series.length - 1].x >= 60000
                ) {
                  data_VN30.open = openIndex;
                  data_VN30.series.push(indexData);
                  data_VN30.volume.push(volumeData);
                  oVol = idata.vol;
                } else {
                  data_VN30.series[data_VN30.series.length - 1] = indexData;
                  data_VN30.volume[data_VN30.volume.length - 1] = volumeData;
                }
              } else if (marketCode == MARKET["HNX30"]) {
                if (
                  data_HNX30.series.length == 0 ||
                  utc - data_HNX30.series[data_HNX30.series.length - 1].x >=
                    60000
                ) {
                  data_HNX30.open = openIndex;
                  data_HNX30.series.push(indexData);
                  data_HNX30.volume.push(volumeData);
                  oVol = idata.vol;
                } else {
                  data_HNX30.series[data_HNX30.series.length - 1] = indexData;
                  data_HNX30.volume[data_HNX30.volume.length - 1] = volumeData;
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
        } else if (marketCode == MARKET["HNX"]) {
          initChart(
            indexChart_HNX,
            "containerHNX",
            marketCode,
            data_HNX.series,
            openIndex,
            data_HNX.volume
          );
        } else if (marketCode == MARKET["UPCOM"]) {
          initChart(
            indexChart_UPCOM,
            "containerUPCOM",
            marketCode,
            data_UPCOM.series,
            openIndex,
            data_UPCOM.volume
          );
        } else if (marketCode == MARKET["HSX30"]) {
          initChart(
            indexChart_VN30,
            "containerHSX30",
            marketCode,
            data_VN30.series,
            openIndex,
            data_VN30.volume
          );
        } else if (marketCode == MARKET["HNX30"]) {
          initChart(
            indexChart_HNX30,
            "containerHNX30",
            marketCode,
            data_HNX30.series,
            openIndex,
            data_HNX30.volume
          );
        }
      }
    },
    "jsonp"
  );
  return false;
}

function processAddPoint(idata) {
  var append = 0;
  var selectedSeries;
  try {
    if (idata.mc == "10") {
      // VNINDEX
      if (data_HSX.series.length == 0) {
        append = 0;
        // load lai do thi
        getMarketIndicator(MARKET["HSX"]);
      } else {
        append = 1;
        selectedSeries = indexChart_HSX.getSelectedSeries();
      }
    } else if (idata.mc == "02") {
      // HASTC
      if (data_HNX.series.length == 0) {
        append = 0;
        // load lai do thi
        getMarketIndicator(MARKET["HNX"]);
      } else {
        append = 1;
        selectedSeries = indexChart_HNX.getSelectedSeries();
      }
    } else if (idata.mc == "03") {
      // UPCOM
      if (data_UPCOM.series.length == 0) {
        append = 0;
        // load lai do thi
        getMarketIndicator(MARKET["UPCOM"]);
      } else {
        append = 1;
        selectedSeries = indexChart_UPCOM.getSelectedSeries();
      }
    } else if (idata.mc == "11") {
      // VN30
      if (data_VN30.series.length == 0) {
        append = 0;
        // load lai do thi
        getMarketIndicator(MARKET["HSX30"]);
      } else {
        append = 1;
        selectedSeries = indexChart_VN30.getSelectedSeries();
      }
    } else if (idata.mc == "12") {
      // VN30
      if (data_HNX30.series.length == 0) {
        append = 0;
        // load lai do thi
        getMarketIndicator(MARKET["HNX30"]);
      } else {
        append = 1;
        selectedSeries = indexChart_HNX30.getSelectedSeries();
      }
    } else {
      append = 0;
    }

    if (append == 1) {
      // if(idata.time == null) idata.time = '13:00:00';
      var time = idata.time.split(":");
      // neu 13:00 add them 2 diem null
      if (time[0] == "13" && time[1] == "00") {
        var nullUtc1 = Date.UTC(bYear, bMonth, bDay, 11, 31);
        var nullUtc2 = Date.UTC(bYear, bMonth, bDay, 12, 59);
        var indexData1 = { x: nullUtc1, y: null };
        var indexData2 = { x: nullUtc2, y: null };
        // add null 1
        jQuery.each(selectedSeries, function (i, series) {
          if (i == 0) {
            series.addPoint(indexData1, false, false);
          } else {
            series.addPoint(indexData1, false, false);
          }
        });
        // add null 2
        jQuery.each(selectedSeries, function (i, series) {
          if (i == 0) {
            series.addPoint(indexData2, false, false);
          } else {
            series.addPoint(indexData2, false, false);
          }
        });
      } else {
        var utc = Date.UTC(bYear, bMonth, bDay, time[0], time[1]);
        var newPrice = { x: utc, y: idata.cIndex };
        var newVolume = { x: utc, y: idata.accVol };
        // console.log(utc - selectedSeries[1].processedXData[selectedSeries[1].processedXData.length - 1]);
        if (
          utc -
            selectedSeries[1].processedXData[
              selectedSeries[1].processedXData.length - 1
            ] >=
          60000
        ) {
          jQuery.each(selectedSeries, function (i, series) {
            if (i == 0) {
              series.addPoint(newVolume, false, false);
            } else {
              series.addPoint(newPrice, false, false);
            }
          });
        } else {
          var acvol =
            idata.accVol +
            selectedSeries[0].processedYData[
              selectedSeries[1].processedXData.length - 1
            ].y;
          newVolume.y = acvol;
          selectedSeries[0].processedYData[
            selectedSeries[1].processedXData.length - 1
          ] = newVolume;
          selectedSeries[1].processedYData[
            selectedSeries[1].processedYData.length - 1
          ] = newPrice;
        }
      }
      if (idata.mc == "10" && data_HSX.series.length > 1) {
        // console.log(indexChart_HSX);
        indexChart_HSX.yAxis[0].isDirty = true;
        indexChart_HSX.yAxis[1].isDirty = true;
        indexChart_HSX.redraw();
      } else if (idata.mc == "02" && data_HNX.series.length > 1) {
        indexChart_HNX.yAxis[0].isDirty = true;
        indexChart_HNX.yAxis[1].isDirty = true;
        indexChart_HNX.redraw();
      } else if (idata.mc == "03" && data_UPCOM.series.length > 1) {
        indexChart_UPCOM.yAxis[0].isDirty = true;
        indexChart_UPCOM.yAxis[1].isDirty = true;
        indexChart_UPCOM.redraw();
      } else if (idata.mc == "11" && data_VN30.series.length > 1) {
        indexChart_VN30.yAxis[0].isDirty = true;
        indexChart_VN30.yAxis[1].isDirty = true;
        indexChart_VN30.redraw();
      } else if (idata.mc == "12" && data_HNX30.series.length > 1) {
        indexChart_HNX30.yAxis[0].isDirty = true;
        indexChart_HNX30.yAxis[1].isDirty = true;
        indexChart_HNX30.redraw();
      }
    }
  } catch (err) {
    console.log("[DEBUG] - append point error = " + err.message);
  }
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
  } else if (marketCode == MARKET["HNX"]) {
    stockCode = "HNXIndex";
    bMin = b90Min;
    vMax = 1000000;
  } else if (marketCode == MARKET["UPCOM"]) {
    stockCode = "UPCOMIndex";
    bMin = b90Min;
    vMax = 1000000;
  } else if (marketCode == MARKET["HSX30"]) {
    stockCode = "VN30Index";
    bMin = b91Min;
    vMax = 1000000;
  } else if (marketCode == MARKET["HNX30"]) {
    stockCode = "HSX30Index";
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
  } else if (marketCode == MARKET["HNX"]) {
    indexChart_HNX = stockChart;
  } else if (marketCode == MARKET["UPCOM"]) {
    indexChart_UPCOM = stockChart;
  } else if (marketCode == MARKET["HSX30"]) {
    indexChart_VN30 = stockChart;
  } else if (marketCode == MARKET["HNX30"]) {
    indexChart_HNX30 = stockChart;
  }
}

function processChart(data) {
  sendChartQueue(data);
}

sendChartQueue = function (idata) {
  if (objPage != null && objPage.sendMessage != undefined)
    objPage.sendMessage(JSON.stringify(idata));
};

function processTranfferDiff(idata) {
  // calculate time tranffer
  var dnow = new Date();

  var timeDiff = idata.split("ToT");

  var sysdate =
    (dnow.getDate() < 10 ? "0" + dnow.getDate() : dnow.getDate()) +
    "/" +
    (dnow.getMonth() + 1 < 10
      ? "0" + (dnow.getMonth() + 1)
      : dnow.getMonth() + 1) +
    "/" +
    dnow.getFullYear() +
    " " +
    timeDiff[0];
  // console.log(sysdate, dnow);
  var sdate = getDateFromFormat(sysdate, "dd/MM/yyyy HH:mm:ss");
  //console.log(sdate, timeDiff[1], mktTime);
  var timedivision =
    Math.abs(sdate - StringToInt(timeDiff[1]) - mktTime) > 10000 ? 1000 : 100;
  if (sdate > 0)
    $("#time-transfer-mkt").text(
      " " +
        Math.floor(
          Math.abs(sdate - StringToInt(timeDiff[1]) - mktTime) / timedivision
        ) +
        "ms"
    );
}

function getModalColumnShow() {
  var column_show = $.jStorage.get("COLUMN_SETTING_SHOW", [
    "total-volumn",
    "dumua",
    "duban",
    "ave",
    "hight",
    "low",
    "quote",
    "froom",
  ]);
  var html = "";

  column_show.forEach((element) => {
    html +=
      '<li type="' +
      element +
      '">' +
      getMessage("txt" + element) +
      '<input type="checkbox" style="float: right; margin-top: 4px;"></li>';
  });
  $("#column-selected").html(html);

  $("#column-selected").sortable();
  $("#column-selected").disableSelection();
  // column not select

  var column_not_show = _.filter(allColumn, function (o) {
    return column_show.indexOf(o) < 0;
  });
  html = "";
  column_not_show.forEach((element) => {
    html +=
      '<li type="' +
      element +
      '">' +
      getMessage("txt" + element) +
      '<input type="checkbox" style="float: right; margin-top: 4px;"></li>';
  });
  $("#column-un-selected").html(html);

  // chart setting show
  var chart_show = settingUI.charts; //$.jStorage.get("CHART_SETTING_SHOW", ['VNIndex', 'HNXIndex', 'UPCOMIndex', 'VN30Index']);
  html = "";

  chart_show.forEach((element) => {
    html +=
      '<li type="chart' +
      element +
      '">' +
      ChartHeaderName[element] +
      '<input type="checkbox" style="float: right; margin-top: 4px;"></li>';
  });
  $("#chart-selected").html(html);

  $("#chart-selected").sortable();
  $("#chart-selected").disableSelection();
  // column not select

  var chart_not_show = _.filter(allChart, function (o) {
    return chart_show.indexOf(o) < 0;
  });
  html = "";
  chart_not_show.forEach((element) => {
    html +=
      '<li type="chart' +
      element +
      '">' +
      ChartHeaderName[element] +
      '<input type="checkbox" style="float: right; margin-top: 4px;"></li>';
  });
  $("#chart-un-selected").html(html);
}

function completeUI() {
  $(".chart-toggle").attr("ty", settingUI.chartToggle);

  if (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent.toLowerCase()
    )
  ) {
    $(".banggia").css("min-width", "1000px");
    $(".chart-toggle").click();
    $(".chart-toggle").remove();
    $(".content-header").css("margin-top", "0");
    $(".container-fluid .main-content").css("margin-top", "0px");
    $(".tbl-fix-header").css("top", "75px");
    $("#tbl-cs").css("margin-top", "98px");
    $(".mini-bottom-index").css("display", "");
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  } else {
    if ($(".chart-toggle").attr("ty") == "2") {
      $(".container-fluid .info-box").css("display", "none");
      if (location.href.toString().includes("#PhaiSinh")) {
        $(".container-fluid .main-content").css("margin-top", "0px");
        $(".main-content").css("height", "100%");
      } else {
        $(".container-fluid .main-content").css("margin-top", "40px");
      }

      $(".content-header").css("margin-top", "0");
      $(".tbl-fix-header").css("top", "75px");
      $("#tbl-cs").css("margin-top", "58px");

      $(".chart-toggle").html(
        '<i class="fa fa-chevron-down" aria-hidden="true"></i><span class="txtMR">' +
          getMessage("txtMR") +
          "</span>"
      );
      $(".mini-index").css("display", "");
      $(".mini-bottom-index").css("display", "");
      $(".news").css("display", "none");

      $(".panel-order").css({
        top: "75px",
        height: "calc(100vh - 105px)",
      });
    } else {
      $(".panel-order").css({
        top: "225px",
        height: "calc(100vh - 255px)",
      });
    }
  }
  if (location.href.toString().includes("#PhaiSinh")) {
    fnSetHeightBottom();
  }
}

function fnSetHeightBottom() {
  let h = 0;
  $(".table-responsive tbody tr[id^=row]").each(function () {
    h += $(this).outerHeight();
  });
  h =
    $(".main").outerHeight() -
    $(".table-responsive thead").outerHeight() -
    h -
    40;
  console.log($(".bottom-panel").css("height"), h);
  $(".bottom-panel").css("height", h);
}

function debouncer(func, timeout) {
  var timeoutID,
    timeout = timeout || 200;
  return function () {
    var scope = this,
      args = arguments;
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function () {
      func.apply(scope, Array.prototype.slice.call(args));
    }, timeout);
  };
}

$(window).resize(debouncer(completeUI));

$(document).on("click", ".del-row", function () {
  var sid = getCookie("JSESSION");
  var stockDelete = $(this).parent().parent().attr("id");
  if (sid !== null) {
    var symbol = stockDelete.replace("row_", "");

    var msg = '{"action":"leave","list":"' + symbol + '"}';
    socket.emit("regs", msg);

    deleteSymbolFromPortfolio(symbol);
  } else {
    console.log($(this).parent().parent().attr("id"));
    // row_OGC
    $(this).parent().parent().remove();
    var sym = [];
    $("#sortable-banggia tr").each(function () {
      // console.log($(this).attr('id'))
      sym.push($(this).attr("id").replace("row_", ""));
    });
    // var data = { name: 'Danh má»¥c máº·c Ä‘á»‹nh', symbols: sym };

    var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
    dmck.forEach((element) => {
      if (element.active) element.symbols = sym;
    });

    $.jStorage.set("DANH-MUC-CHUNG-KHOAN", dmck);

    // Ä‘Äƒng kĂ½ láº¡i room
    var msg =
      '{"action":"leave","list":"' + stockDelete.replace("row_", "") + '"}';
    socket.emit("regs", msg);
    // update fb client
    if (faceId != null && faceId != "undefined") {
      var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
      saveStateFace(
        faceId.id,
        dmck,
        $.jStorage.get("COLUMN_SETTING_SHOW"),
        settingUI.addStockPosition
      );
    }
    tableSort();
  }
});

$("#setting-modal").on("shown.bs.modal", function (e) {
  getModalColumnShow();
  console.log(settingUI);
  $("#settingAddStock" + settingUI.addStockPosition).prop("checked", true);
});

$(document).on("click", ".chart-toggle", function () {
  var type = $(this).attr("ty");
  if (type == "1") {
    // thu gon
    console.log("thu gon");
    $(".container-fluid .info-box").toggle();
    if (location.href.toString().includes("#PhaiSinh")) {
      $(".container-fluid .main-content").css("margin-top", "0px");
      $(".main-content").css("height", "100%");
      $(".bottom-panel").css(
        "height",
        $(".main").outerHeight() - $(".table-responsive").outerHeight()
      );
    } else {
      $(".container-fluid .main-content").css("margin-top", "40px");
    }

    $(".content-header").css("margin-top", "0");
    $(".tbl-fix-header").css("top", "75px");
    $("#tbl-cs").css("margin-top", "58px");

    $(this).html(
      '<i class="fa fa-chevron-down" aria-hidden="true"></i><span class="txtMR">' +
        getMessage("txtMR") +
        "</span>"
    );
    $(this).attr("ty", "2");
    $(".mini-index").css("display", "");
    $(".mini-bottom-index").css("display", "");
    $(".news").css("display", "none");
    settingUI.chartToggle = "2";

    $(".panel-order").css({
      top: "75px",
      height: "calc(100vh - 105px)",
    });
  } else {
    // mo rong
    console.log("má»Ÿ rá»™ng");
    $(".container-fluid .info-box").toggle();
    $(".container-fluid .main-content").css("margin-top", "150px");
    $(".content-header").css("margin-top", "150px");
    $(".tbl-fix-header").css("top", "225px");
    $("#tbl-cs").css("margin-top", "98px");
    $(this).html(
      '<i class="fa fa-chevron-up" aria-hidden="true"></i><span class="txtTG">' +
        getMessage("txtTG") +
        "</span>"
    );
    $(this).attr("ty", "1");
    if (location.href.toString().includes("#PhaiSinh")) {
      $(".main-content").css("height", "calc(100% - 150px)");
      $(".bottom-panel").css(
        "height",
        $(".main").outerHeight() - $(".table-responsive").outerHeight()
      );
    }
    $(".mini-index").css("display", "none");
    $(".mini-bottom-index").css("display", "none");
    $(".news").css("display", "");
    settingUI.chartToggle = "1";

    $(".panel-order").css({
      top: "226px",
      height: "calc(100vh - 256px)",
    });
  }

  $.jStorage.set("SETTING_UI", settingUI);
  $(window).trigger("resize");
});

$("#txtAddStock").on("focus", function () {
  $(this).val("");
});

function addStockDM(stockCD) {
  var sid = getCookie("JSESSION");

  var obj = $("table.banggia #sym_" + stockCD);

  if (obj.length > 0) {
    shownotification("Warning", getMessage("txtMaCKDaTonTai"), "warning");
    fnScrollAndHighlightRow(stockCD);
    $("#txtAddStock").val("");
    return false;
  }

  if (
    window.location.href.indexOf("#DanhSachTheoDoi") < 0 ||
    stockCD == "" ||
    $("#menuVN30.active").length > 0 ||
    $("#menuHNX30.active").length > 0
  ) {
    $("#txtAddStock").val("");
    return false;
  }

  if (sid !== null) {
    addSymbolToPortfolio(stockCD);
    $("#txtAddStock").val("");
    return true;
  }

  //Without login
  var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
  var idata = _.find(dmck, function (o) {
    return o.active == true;
  });
  var arrListStock = idata.symbols;

  if (settingUI.addStockPosition == "2") {
    arrListStock.unshift(stockCD);
  } else {
    arrListStock.push(stockCD);
  }
  //
  dmck.forEach((element) => {
    if (element.active) element.symbols = arrListStock;
  });

  $.jStorage.set("DANH-MUC-CHUNG-KHOAN", dmck);

  var msg = '{"action":"join","list":"' + stockCD + '"}';
  socket.emit("regs", msg);

  fnDisplayDetailRow(stockCD, $("#txtAddStock").attr("san"));

  $("#txtAddStock").val("");
  shownotification("Infomation", getMessage("txtThemMoiMaCKTC"), "success");
}

function fnDisplayDetailRow(stockCD, san) {
  if (san != "PS") {
    $.getJSON(
      listStockDetailLink + stockCD,
      {},
      function (rData) {
        if (rData != null) {
          rData.forEach((element) => {
            var html = processStock(element);
            if (settingUI.addStockPosition == "2") {
              $("#sortable-banggia").prepend(html);
            } else {
              $("#sortable-banggia").append(html);
            }
          });
          getListRsi(stockCD);
          completeUI();
          initTooltipPrice();
          $(window).trigger("resize");
          if (
            ($("thead .changePc").css("display") != "none" &&
              $("thead .changeOt").css("display") != "none") ||
            $("thead .changePc").css("display") == "none"
          ) {
            $("#changePc_" + stockCD.toUpperCase()).css("display", "none");
          } else {
            $("#change_" + stockCD.toUpperCase()).css("display", "none");
          }
          fnScrollAndHighlightRow(stockCD.toUpperCase());
          fnProcessAfterAppendHTML();
        }
      },
      "jsonp"
    );
  } else {
    $.getJSON(
      psDetailLink + stockCD,
      function (zdata) {
        var data = _.filter(zdata, function (dt) {
          return dt.sym == stockCD;
        });
        var dtHtml = processDataPsCatalog(data[0]);
        if (settingUI.addStockPosition == "2") {
          $("#sortable-banggia").prepend(dtHtml);
        } else {
          $("#sortable-banggia").append(dtHtml);
        }
        if (
          ($("thead .changePc").css("display") != "none" &&
            $("thead .changeOt").css("display") != "none") ||
          $("thead .changePc").css("display") == "none"
        ) {
          $("#changePc_" + stockCD.toUpperCase()).css("display", "none");
        } else {
          $("#change_" + stockCD.toUpperCase()).css("display", "none");
        }
        $('[data-toggle="tooltip"]').tooltip();
        fnScrollAndHighlightRow(stockCD.toUpperCase());
        fnProcessAfterAppendHTML();
        //initSocketPs(psStockList.join(','));
      },
      "jsonp"
    );
  }
}

function fnScrollAndHighlightRow(symbol) {
  //scroll
  var container = $(".container-fluid");
  var rw = $("#row_" + symbol);
  rw[0].scrollIntoView();
  var delta =
    container[0].scrollHeight - rw[0].offsetTop - container[0].clientHeight;
  if (delta > 250) delta = 250;
  if ($(".chart-toggle").attr("ty") == "2") delta -= 40;
  container.scrollTop(container[0].scrollTop - delta);

  //HighlightRow
  rw.find("td").effect("highlight", { color: "#ccde07" }, 3500);
}

function fnProcessAfterAppendHTML() {
  $('#sortable-banggia tr td[id^="sym_"] a').each(function () {
    var ceil = $(this);
    if (ceil.html().length > 7) {
      ceil.addClass("autofontsize");
    }
  });
}

// column setting show
$(document).on("click", "#d-column-setting button", function () {
  var type = $(this).attr("type");
  // console.log(type);
  if (type == "aa") {
    // add all
    $("#column-un-selected")
      .find("li")
      .each(function () {
        var li = $(this)
          .find("input:checkbox")
          .prop("checked", false)
          .parent()
          .clone();
        $("#column-selected").append(li);
        $(this).remove();
      });
  } else if (type == "a") {
    // add
    if ($("#column-un-selected input:checkbox:checked").length == 0) {
      shownotification(
        "Warning",
        "HĂ£y chá»n Ă­t nháº¥t 1 pháº§n tá»­",
        "warning"
      );
    } else {
      $("#column-un-selected input:checkbox:checked").each(function () {
        var li = $(this).prop("checked", false).parent().clone();
        $("#column-selected").append(li);
        $(this).parent().remove();
      });
    }
  } else if (type == "d") {
    // delete
    if ($("#column-selected input:checkbox:checked").length == 0) {
      shownotification(
        "Warning",
        "HĂ£y chá»n Ă­t nháº¥t 1 pháº§n tá»­",
        "warning"
      );
    } else {
      $("#column-selected input:checkbox:checked").each(function () {
        var li = $(this).prop("checked", false).parent().clone();
        $("#column-un-selected").append(li);
        $(this).parent().remove();
      });
    }
  } else if (type == "da") {
    // delete all
    $("#column-selected")
      .find("li")
      .each(function () {
        var li = $(this)
          .find("input:checkbox")
          .prop("checked", false)
          .parent()
          .clone();
        $("#column-un-selected").append(li);
        $(this).remove();
      });
  }
});

$(document).on("click", "#d-chart-setting button", function () {
  var type = $(this).attr("type");
  // console.log(type);
  if (type == "aa") {
    // add all
    $("#chart-un-selected")
      .find("li")
      .each(function () {
        var li = $(this)
          .find("input:checkbox")
          .prop("checked", false)
          .parent()
          .clone();
        $("#chart-selected").append(li);
        $(this).remove();
      });
  } else if (type == "a") {
    // add
    if ($("#chart-un-selected input:checkbox:checked").length == 0) {
      shownotification(
        "Warning",
        "HĂ£y chá»n Ă­t nháº¥t 1 pháº§n tá»­",
        "warning"
      );
    } else {
      $("#chart-un-selected input:checkbox:checked").each(function () {
        var li = $(this).prop("checked", false).parent().clone();
        $("#chart-selected").append(li);
        $(this).parent().remove();
      });
    }
  } else if (type == "d") {
    // delete
    if ($("#chart-selected input:checkbox:checked").length == 0) {
      shownotification(
        "Warning",
        "HĂ£y chá»n Ă­t nháº¥t 1 pháº§n tá»­",
        "warning"
      );
    } else {
      $("#chart-selected input:checkbox:checked").each(function () {
        var li = $(this).prop("checked", false).parent().clone();
        $("#chart-un-selected").append(li);
        $(this).parent().remove();
      });
    }
  } else if (type == "da") {
    // delete all
    $("#chart-selected")
      .find("li")
      .each(function () {
        var li = $(this)
          .find("input:checkbox")
          .prop("checked", false)
          .parent()
          .clone();
        $("#chart-un-selected").append(li);
        $(this).remove();
      });
  }
});

$(document).on("click", ".modal-content button.save-setting", function () {
  var column = [];
  $("#column-selected")
    .find("li")
    .each(function () {
      column.push($(this).attr("type"));
    });

  var charts = [];
  $("#chart-selected")
    .find("li")
    .each(function () {
      charts.push($(this).attr("type").replace("chart", ""));
    });

  settingUI.addStockPosition = $("input[name=settingAddStock]:checked").val();

  if (!settingUI.charts.equals(charts)) {
    settingUI.charts = charts;
    if (timer != null && timer != "undefined") clearInterval(timer);
    loadInfoBox();
    timer = setInterval(loadInfoBox, timeReloadChart * 60 * 1000);
  }
  $.jStorage.set("SETTING_UI", settingUI);

  $.jStorage.set("COLUMN_SETTING_SHOW", column);
  // $.jStorage.set("CHART_SETTING_SHOW", charts);

  // load láº¡i báº£ng giĂ¡
  if (
    !location.href.toString().includes("#PhaiSinh") &&
    !location.href.toString().includes("#ThoaThuan") &&
    !location.href.toString().includes("#ThongKe") &&
    !location.href.toString().includes("#ODDLOT")
  )
    objPage.initBanggia();
  shownotification("Infomation", "LÆ°u cĂ i Ä‘áº·t thĂ nh cĂ´ng", "success");
  $("#setting-modal").modal("hide");
  // update fb client
  if (faceId != null && faceId != "undefined") {
    var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
    saveStateFace(
      faceId.id,
      dmck,
      $.jStorage.get("COLUMN_SETTING_SHOW"),
      settingUI.addStockPosition
    );
  }
});

// $(document).on('click', '.tab-datlenh', function () {
// 	shownotification("Infomation", "TĂ­nh nÄƒng Ä‘ang phĂ¡t triá»ƒn", "success");
// 	// $('.panel-order').toggle();
// });

getListRsi = function (stockList) {
  var date = new Date();
  date.setDate(date.getDate() - 30);
  // console.log(date, date.getTime());
  // var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
  // var column_show = _.find(dmck, function (o) { return o.active == true });

  var column_show = $.jStorage.get("COLUMN_SETTING_SHOW", [
    "total-volumn",
    "dumua",
    "duban",
    "ave",
    "hight",
    "low",
    "quote",
    "froom",
  ]);

  if (column_show.indexOf("rsi") < 0) return false;

  $.getJSON(
    "/GetHistory.do",
    {
      symbol: stockList,
      from: Math.floor(date.getTime() / 1000),
    },
    function (rData) {
      rData.forEach((element) => {
        CalculateRsi(element);
      });
    },
    "jsonp"
  );
};

function CalculateRsi(closePrices) {
  var stock = closePrices.s;

  var prices = [];
  if (closePrices.c.length > 16) {
    prices = closePrices.c.slice(Math.max(closePrices.c.length - 16, 1));
  } else {
    prices = closePrices.c;
  }

  calculateStockRsi(stock, prices);
}

calculateStockRsi = function (stock, prices) {
  var sumGain = 0;
  var sumLoss = 0;
  for (var i = 1; i < prices.length; i++) {
    // console.log(stock,prices[i], prices[i - 1])
    var difference = StringToDouble(prices[i]) - StringToDouble(prices[i - 1]);
    if (difference >= 0) {
      sumGain += difference;
    } else {
      sumLoss -= difference;
    }
  }

  if (sumGain == 0) return 0;
  if (Math.abs(sumLoss) == 0) return 100;

  var relativeStrength = sumGain / sumLoss;
  var rsi = 100.0 - 100.0 / (1 + relativeStrength);

  $("#rsi_" + stock).html(Highcharts.numberFormat(rsi, 2));
  $("#rsi_" + stock).attr("pri", prices.join(","));
  if (Highcharts.numberFormat(rsi, 2) >= 70)
    $("#rsi_" + stock).css({
      "background-color": getColor("d"),
      color: "#111217",
    });

  if (Highcharts.numberFormat(rsi, 2) <= 30)
    $("#rsi_" + stock).css({
      "background-color": getColor("i"),
      color: "#111217",
    });
};

processRsi = function (idata) {
  try {
    var prices = $("#rsi_" + idata.sym).attr("pri");
    var data = prices.split(",");
    data.pop();
    calculateStockRsi(idata.sym, data.push(idata.lastPrice));
  } catch (error) {}
};

function showChart(sym) {
  GStockData = [];
  G2StockData = [];
  G3StockData = [];
  G4StockData = [];
  G5StockData = [];
  G6StockData = [];

  GStockVolume = [];
  G2StockVolume = [];
  G3StockVolume = [];
  G4StockVolume = [];
  G5StockVolume = [];
  G6StockVolume = [];

  ceilPrice = StringToDouble($("#cel_" + sym).html());
  floorPrice = StringToDouble($("#flo_" + sym).html());
  refPrice = StringToDouble($("#ref_" + sym).html());
  openStock = sym;

  var aaa = _.find(modal.listIndex, function (dt) {
    return dt.stock_code == sym;
  });
  if (aaa == null || typeof aaa === "undefined") {
    shownotification(
      "Warning",
      "KhĂ´ng tĂ¬m tháº¥y dá»¯ liá»‡u mĂ£ chá»©ng khoĂ¡n!",
      "warning"
    );
    return;
  } else {
    $("#detail-modal .modal-title").text(aaa.stock_code + " - " + aaa.name_vn);

    var sanCK =
      aaa.C == "1"
        ? "HSX"
        : aaa.C == "2"
        ? "HNX"
        : aaa.C == "3"
        ? "UPCOM"
        : "HSX";
    $("#txtModalStock").val("");
    $("#detail-modal .san-ck").text(sanCK);

    app.loadTradingView("#chart-ptkt", sym.trim(), "&theme=Light");

    $("#detail-modal .nav-tabs .nav-link")
      .removeClass("active")
      .removeClass("show");
    $("#detail-modal .tab-content .tab-panel")
      .removeClass("active")
      .removeClass("show");

    $("#detail-modal .nav-tabs .nav-item")
      .eq(1)
      .find(".nav-link")
      .addClass("active show");
    $("#detail-modal .tab-content .tab-panel").eq(1).addClass("active show");

    // $('#detail-modal .nav-tabs .nav-item:first-child .nav-link').addClass('active show');
    // $('#detail-modal .tab-content .tab-panel:first-child').addClass('active show');

    $("#detail-modal .tab-content #detailFinancial .btn-def").removeClass(
      "active"
    );
    $('#detail-modal .tab-content button[ty="year"]').addClass("active");

    $("#detail-modal").modal("show");
    loadTaiChinh(sym);
    loadNewsSym(sym);
    getLSDetail(sym, ceilPrice, floorPrice, refPrice);
    loadHistoryOrder(sym);
    loadPTKT(sym, 86400);
  }
}

function loadHistoryOrder(sym) {
  $("#historyOrder").html("");
  var html =
    '<tr><td class="txt-center">' +
    getMessage("txtThoiGian") +
    '</td><td class="txt-center">' +
    getMessage("txtKhoiLuong") +
    '</td><td class="txt-center">' +
    getMessage("txtGia") +
    '</td><td class="txt-center">+/-</td></tr>';
  $.getJSON(
    listStockTradelink + sym,
    {},
    function (zdata) {
      // console.log(zdata);
      if (zdata != null) {
        // console.log(rData);
        var stockHistory = zdata.reverse();
        stockHistory.forEach((element) => {
          html +=
            "<tr><td>" +
            element.time +
            '</td><td class="txt-right">' +
            FormatVolume10(element.lastVol, 2) +
            '</td><td class="txt-right">' +
            Highcharts.numberFormat(element.lastPrice, 2) +
            '</td><td class="txt-right" style="color: ' +
            getColor(element.cl) +
            '">' +
            element.change +
            "</td></tr>";
        });
      }
      $("#historyOrder").html(html);
    },
    "jsonp"
  );
}

function loadNewsSym(sym) {
  $.getJSON(
    "https://banggia.vps.com.vn/vpbs.do?jKey=?",
    {
      msgType: "getStockNews",
      symbol: sym,
    },
    function (zdata) {
      var html = "",
        htmlAll = "";
      $("#symbol-news").html("");
      if (zdata != null) {
        $("#symbol-news").html('<ul class="symbol-news"></ul>');
        $.each(zdata.c[0], function (i, el) {
          var jsdate = el.PublishTime.replaceAll("/Date(", "").replaceAll(
            ")/",
            ""
          );
          //console.log(date);

          htmlAll =
            '<li><a target="_blank" href="https://vietstock.vn' +
            el.URL +
            '">' +
            el.Title +
            '&nbsp;<label class="FFull_News_DateTime">' +
            format(jsdate, "Y-m-d") +
            "</label></a></li>";
          $(".symbol-news").append(htmlAll);
        });
      }
    }
  );
}

function toDate(date) {
  if (date === void 0) {
    return new Date(0);
  }
  if (isDate(date)) {
    return date;
  } else {
    return new Date(parseFloat(date.toString()));
  }
}

function isDate(date) {
  return date instanceof Date;
}

function format(date, format) {
  var d = toDate(date);
  return format
    .replace(/Y/gm, d.getFullYear().toString())
    .replace(/m/gm, ("0" + (d.getMonth() + 1)).substr(-2))
    .replace(/d/gm, ("0" + (d.getDate() + 1)).substr(-2))
    .replace(/H/gm, ("0" + (d.getHours() + 0)).substr(-2))
    .replace(/i/gm, ("0" + (d.getMinutes() + 0)).substr(-2))
    .replace(/s/gm, ("0" + (d.getSeconds() + 0)).substr(-2))
    .replace(/v/gm, ("0000" + (d.getMilliseconds() % 1000)).substr(-3));
}

function loadPTKT(sym, period) {
  $("#tk-ptkt-content").html("");
  $("#dgh-ptkt-content").html("");
  $("#cbkt-ptkt-content").html("");
  $("#cbkt-ptkt-foot").html("");
  $("#tbd-ptkt-content").html("");
  $("#tbd-ptkt-foot").html("");
  $.getJSON(
    dataPTKTLink + sym + "&period=" + period,
    {},
    function (zdata) {
      if (zdata != null) {
        try {
          var pdata = JSON.parse(zdata);
        } catch (error) {
          pdata = zdata;
        }
        // console.log(pdata);
        try {
          pdata.forEach((element) => {
            switch (element.rowid) {
              case 1:
                var tk = element.data[0].toUpperCase();
                $("#tk-ptkt").text(tk).attr("sym", sym);
                if (tk.includes("BĂN")) {
                  $("#tk-ptkt")
                    .addClass("clRed")
                    .removeClass("clTC")
                    .removeClass("clLime");
                } else if (tk.includes("MUA")) {
                  $("#tk-ptkt")
                    .addClass("clLime")
                    .removeClass("clTC")
                    .removeClass("clRed");
                } else {
                  $("#tk-ptkt")
                    .addClass("clTC")
                    .removeClass("clLime")
                    .removeClass("clRed");
                }
                break;
              case 2:
              case 3:
                var html =
                  "<tr><td>" +
                  element.data[0] +
                  "</td><td>" +
                  element.data[1] +
                  "</td><td>" +
                  element.data[2] +
                  "</td><td>" +
                  element.data[3] +
                  "</td></tr>";
                $("#tk-ptkt-content").append(html);
                break;
              case 5:
              case 6:
              case 7:
              case 8:
              case 9:
                var html =
                  "<tr><td>" +
                  element.data[0] +
                  '</td><td class="text-right">' +
                  (element.data[1] == "-"
                    ? "-"
                    : Highcharts.numberFormat(element.data[1] / 1000, 2)) +
                  '</td>\
											<td class="text-right">' +
                  (element.data[2] == "-"
                    ? "-"
                    : Highcharts.numberFormat(element.data[2] / 1000, 2)) +
                  '</td><td class="text-right">' +
                  (element.data[3] == "-"
                    ? "-"
                    : Highcharts.numberFormat(element.data[3] / 1000, 2)) +
                  '</td>\
											<td class="text-right">' +
                  (element.data[4] == "-"
                    ? "-"
                    : Highcharts.numberFormat(element.data[4] / 1000, 2)) +
                  '</td><td class="text-right">' +
                  (element.data[5] == "-"
                    ? "-"
                    : Highcharts.numberFormat(element.data[5] / 1000, 2)) +
                  '</td>\
											<td class="text-right">' +
                  (element.data[6] == "-"
                    ? "-"
                    : Highcharts.numberFormat(element.data[6] / 1000, 2)) +
                  '</td><td class="text-right">' +
                  (element.data[7] == "-"
                    ? "-"
                    : Highcharts.numberFormat(element.data[7] / 1000, 2)) +
                  "</td></tr>";
                $("#dgh-ptkt-content").append(html);
                break;
              case 11:
              case 12:
              case 13:
              case 14:
              case 15:
              case 16:
              case 17:
              case 18:
              case 19:
              case 20:
              case 21:
              case 22:
                var cl = element.data[2].includes("Mua")
                  ? "txt-lime"
                  : element.data[2].includes("BĂ¡n")
                  ? "txt-red"
                  : "txt-action";
                var html =
                  "<tr><td>" +
                  element.data[0] +
                  '</td><td class="text-right">' +
                  Highcharts.numberFormat(element.data[1], 2) +
                  '</td><td class="' +
                  cl +
                  '">' +
                  element.data[2] +
                  "</td></tr>";
                $("#cbkt-ptkt-content").append(html);
                break;
              case 23:
                var dt = element.data[0].split(":");
                var cl = dt[4].toUpperCase().includes("MUA")
                  ? "txt-lime"
                  : dt[4].toUpperCase().includes("BĂN")
                  ? "txt-red"
                  : "txt-action";
                var html =
                  '<tr><td colspan="3" style="border-bottom: none;">\
											<span>' +
                  dt[0] +
                  ': </span><span class="txt-lime">' +
                  dt[1].trim().split(" ")[0] +
                  "</span>&nbsp;&nbsp;&nbsp;\
											<span>" +
                  dt[1].trim().split(" ")[1] +
                  ': </span><span class="txt-red">' +
                  dt[2].trim().split(" ")[0] +
                  "</span>&nbsp;&nbsp;&nbsp;\
											<span>" +
                  dt[2].trim().split(" ")[1] +
                  " " +
                  dt[2].trim().split(" ")[2] +
                  ": </span><span>" +
                  dt[3].trim().split(" ")[0] +
                  '</span>\
										</td></tr>\
										<tr><td colspan="3" style="border-top: none;">' +
                  dt[3].trim().split(" ")[1] +
                  " " +
                  dt[3].trim().split(" ")[2] +
                  ': <span class="' +
                  cl +
                  '">' +
                  dt[4].toUpperCase() +
                  "</span></td></tr>";

                $("#cbkt-ptkt-foot").html(html);
                break;
              case 25:
              case 26:
              case 27:
              case 28:
              case 29:
              case 30:
                var dg = element.data[1];
                var lt = element.data[2];
                var cldg = dg.split(" ")[1].includes("Mua")
                  ? "txt-lime"
                  : dg.split(" ")[1].includes("BĂ¡n")
                  ? "txt-red"
                  : "txt-action";
                var cllt = lt.split(" ")[1].includes("Mua")
                  ? "txt-lime"
                  : lt.split(" ")[1].includes("BĂ¡n")
                  ? "txt-red"
                  : "txt-action";
                var html =
                  "<tr><td>" +
                  element.data[0] +
                  '</td><td class="text-right">' +
                  Highcharts.numberFormat(dg.split(" ")[0] / 1000, 2) +
                  '<br /><span class="' +
                  cldg +
                  '">\
										' +
                  dg.split(" ")[1] +
                  '</span></td><td class="text-right">' +
                  Highcharts.numberFormat(lt.split(" ")[0] / 1000, 2) +
                  '<br /><span class="' +
                  cllt +
                  '">\
										' +
                  lt.split(" ")[1] +
                  "</span></td></tr>";
                $("#tbd-ptkt-content").append(html);
                break;
              case 31:
                var dt = element.data[0].split(":");
                var cl = dt[3].toUpperCase().includes("MUA")
                  ? "txt-lime"
                  : dt[3].toUpperCase().includes("BĂN")
                  ? "txt-red"
                  : "txt-action";
                var html =
                  '<tr><td colspan="3" style="border-bottom: none;">\
											<span>' +
                  dt[0] +
                  ': </span><span class="txt-lime">' +
                  dt[1].trim().split(" ")[0] +
                  "</span>&nbsp;&nbsp;&nbsp;\
											<span>" +
                  dt[1].trim().split(" ")[1] +
                  ': </span><span class="txt-red">' +
                  dt[2].trim().split(" ")[0] +
                  '</span>\
										</td></tr>\
										<tr><td colspan="3" style="border-top: none;">' +
                  dt[2].trim().split(" ")[1] +
                  " " +
                  dt[2].trim().split(" ")[2] +
                  ': <span class="' +
                  cl +
                  '">' +
                  dt[3].toUpperCase() +
                  "</span></td></tr>";

                $("#tbd-ptkt-foot").html(html);
                break;
              default:
                break;
            }
          });
        } catch (error) {
          console.log("load PTKT - " + error);
        }
      }
    },
    "jsonp"
  );
}

$(document).on("click", "#detailTechnical .btn-def", function () {
  $("#detailTechnical .btn-def").removeClass("active");
  $(this).addClass("active");
  var sym = $("#tk-ptkt").attr("sym");
  var period = $(this).attr("per");
  loadPTKT(sym, period);
});

$(document).on("click", "#detailFinancial .btn-def", function () {
  $("#detailFinancial .btn-def").removeClass("active");
  $(this).addClass("active");
  var sym = $("#tk-ptkt").attr("sym");
  var type = $(this).attr("ty");
  if (type == "year") {
    loadTaiChinh(sym);
  } else {
    loadFinanciQuater(sym);
  }
});

function loadFinanciQuater(sym) {
  // create header
  var htmlAll = "";
  var headerYear = "<th></th>";
  $.each(stockBaseInfo.ttQuy, function (i, data) {
    headerYear += "<th>" + data.TermName + " - " + data.YearPeriod + "</th>";
  });
  // káº¿t quáº£ kinh doanh nÄƒm
  $.each(stockBaseInfo.ketquaKDQuy, function (i, data) {
    if (i == 0) {
      htmlAll += "<thead><tr>";
      htmlAll +=
        "<th>" +
        data.ReportComponentName +
        "</th>" +
        headerYear +
        "</th></tr></thead><tbody>";
    }
    var spl =
      "" +
      data.Value4 +
      "," +
      data.Value3 +
      "," +
      data.Value2 +
      "," +
      data.Value1;
    //console.log(spl)
    htmlAll +=
      "<tr><td>" +
      data.Name +
      '</td>\
					<td class="text-center"><span id="kqkd-tristate' +
      i +
      '">' +
      spl +
      "</span></td>\
					<td>" +
      Highcharts.numberFormat(data.Value4, 0) +
      "</td>\
					<td>" +
      Highcharts.numberFormat(data.Value3, 0) +
      "</td>\
					<td>" +
      Highcharts.numberFormat(data.Value2, 0) +
      "</td>\
					<td>" +
      Highcharts.numberFormat(data.Value1, 0) +
      "</td>\
					</tr>";
  });
  htmlAll += "</tbody>";
  // console.log(htmlAll);
  $("#tbl-kqkd").html(htmlAll);

  htmlAll = "";
  // cĂ¢n Ä‘á»‘i káº¿ toĂ¡n
  $.each(stockBaseInfo.candoiKTQuy, function (i, data) {
    if (i == 0) {
      htmlAll += "<thead><tr>";
      htmlAll +=
        "<th>" +
        data.ReportComponentName +
        "</th>" +
        headerYear +
        "</th></tr></thead><tbody>";
    }
    var spl =
      "" +
      data.Value4 +
      "," +
      data.Value3 +
      "," +
      data.Value2 +
      "," +
      data.Value1;
    htmlAll +=
      "<tr><td>" +
      data.Name +
      '</td>\
					<td class="text-center"><span id="cdkt-tristate' +
      i +
      '">' +
      spl +
      "</span></td>\
					<td>" +
      Highcharts.numberFormat(data.Value4, 0) +
      "</td>\
					<td>" +
      Highcharts.numberFormat(data.Value3, 0) +
      "</td>\
					<td>" +
      Highcharts.numberFormat(data.Value2, 0) +
      "</td>\
					<td>" +
      Highcharts.numberFormat(data.Value1, 0) +
      "</td>\
					</tr>";
  });
  htmlAll += "</tbody>";
  // console.log(htmlAll);
  $("#tbl-cdkt").html(htmlAll);

  htmlAll = "";
  // chá»‰ sá»‘ tĂ i chĂ­nh
  $.each(stockBaseInfo.chisoTCQuy, function (i, data) {
    if (i == 0) {
      htmlAll += "<thead><tr>";
      htmlAll +=
        "<th>" +
        data.ReportComponentName +
        "</th>" +
        headerYear +
        "</th></tr></thead><tbody>";
    }
    var spl =
      "" +
      data.Value4 +
      "," +
      data.Value3 +
      "," +
      data.Value2 +
      "," +
      data.Value1;
    htmlAll +=
      "<tr><td>" +
      data.Name +
      '</td>\
					<td class="text-center"><span id="cstc-tristate' +
      i +
      '">' +
      spl +
      "</span></td>\
					<td>" +
      Highcharts.numberFormat(data.Value4, 0) +
      "</td>\
					<td>" +
      Highcharts.numberFormat(data.Value3, 0) +
      "</td>\
					<td>" +
      Highcharts.numberFormat(data.Value2, 0) +
      "</td>\
					<td>" +
      Highcharts.numberFormat(data.Value1, 0) +
      "</td>\
					</tr>";
  });
  htmlAll += "</tbody>";
  $("#tbl-cstc").html(htmlAll);
  initTristate("tbl-kqkd");
  initTristate("tbl-cdkt");
  initTristate("tbl-cstc");

  // $.getJSON(getFinalQuaterLink + sym, {}, function(data){
  // 	// console.log(data);
  // 	// káº¿t quáº£ kinh doanh
  // 	var htmlAll = '';
  // 	$.each(data.ketquaKD, function (i, data) {
  // 		if (i == 0) {
  // 			htmlAll += '<thead><tr>';
  // 			$.each(data, function (index, dt) {
  // 				if (index != 0) {
  // 					htmlAll += '<th>' + (dt == '' ? "" : dt.split(' ')[0] + '<br />' + dt.split(' ')[1]) + '</th>';
  // 				} else {
  // 					htmlAll += '<th>' + dt + '</th><th></th>';
  // 				}
  // 			});
  // 			htmlAll += '</tr></thead><tbody>';
  // 		} else {
  // 			htmlAll += '<tr>';
  // 			var aaa = '';
  // 			var spl = '';
  // 			$.each(data, function (j, dt) {
  // 				if (j == 0) {
  // 					htmlAll += '<td>' + dt + '</td>';
  // 				} else {
  // 					aaa += '<td>' + dt + '</td>';
  // 					spl += dt.replaceAll(',', '') + ',';
  // 				}
  // 			})
  // 			htmlAll += '<td class="text-center"><span id="kqkd-tristate' + i + '">' + spl.slice(0, -1) + '</span></td>' + aaa;
  // 			htmlAll += '</tr>';
  // 		}
  // 	});
  // 	htmlAll += '</tbody>';
  // 	$('#tbl-kqkd').html(htmlAll);
  // 	initTristate('tbl-kqkd');
  // })

  // $.getJSON(getFinalAssetQuaterLink + sym, {}, function(data){
  // 	// console.log(data);
  // 	// tĂ i sáº£n
  // 	var htmlAll = '';
  // 	$.each(data.taisan, function (i, data) {
  // 		if (i == 0) {
  // 			htmlAll += '<thead><tr>';
  // 			$.each(data, function (index, dt) {
  // 				if (index != 0) {
  // 					htmlAll += '<th>' + (dt == '' ? "" : dt.split(' ')[0] + '<br />' + dt.split(' ')[1]) + '</th>';
  // 				} else {
  // 					htmlAll += '<th>' + dt + '</th><th></th>';
  // 				}
  // 			});
  // 			htmlAll += '</tr></thead><tbody>';
  // 		} else {
  // 			htmlAll += '<tr>';
  // 			var aaa = '';
  // 			var spl = '';
  // 			$.each(data, function (j, dt) {
  // 				if (j == 0) {
  // 					htmlAll += '<td>' + dt + '</td>';
  // 				} else {
  // 					aaa += '<td>' + dt + '</td>';
  // 					spl += dt.replaceAll(',', '') + ',';
  // 				}
  // 			})
  // 			htmlAll += '<td class="text-center"><span id="cdkt-tristate' + i + '">' + spl.slice(0, -1) + '</span></td>' + aaa;
  // 			htmlAll += '</tr>';
  // 		}
  // 	});
  // 	htmlAll += '</tbody>';
  // 	$('#tbl-cdkt').html(htmlAll);
  // 	initTristate('tbl-cdkt');
  // })
}

function generateChartTongQuan(zdata) {
  // split the data set into ohlc and volume
  var ohlc = [],
    volume = [],
    dataLength = zdata.length;

  for (i; i < dataLength; i += 1) {
    ohlc.push([
      data[i][0], // the date
      data[i][1], // open
      data[i][2], // high
      data[i][3], // low
      data[i][4], // close
    ]);

    volume.push([
      data[i][0], // the date
      data[i][5], // the volume
    ]);
  }

  // create the chart
  Highcharts.stockChart("container", {
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: "AAPL Historical",
    },

    yAxis: [
      {
        title: {
          text: "",
        },
        height: "60%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        title: {
          text: "",
        },
        top: "65%",
        height: "35%",
        offset: 0,
        lineWidth: 2,
      },
    ],

    tooltip: {
      split: true,
    },

    series: [
      {
        type: "area",
        threshold: null,
        name: "AAPL",
        data: ohlc,
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [
              1,
              Highcharts.Color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
      },
      {
        type: "column",
        name: "Volume",
        data: volume,
        yAxis: 1,
      },
    ],
  });
}

function loadTaiChinh(sym) {
  $("#cb-caonhat").text($("#higP_" + sym).html());
  $("#cb-thapnhat").text($("#lowP_" + sym).html());
  $("#cb-klgd").text($("#vol_" + sym).html() + "0");
  $("#cb-nnmua").text($("#forB_" + sym).html() + "0");

  var htmlAll = "";
  $.getJSON(
    stockBaseInfoLink + sym,
    {},
    function (zdata) {
      if (zdata != null) {
        // thĂ´ng tin cÆ¡ báº£n
        stockBaseInfo = zdata;
        try {
          var foreignRoom = _.isEmpty(zdata.coban.foreignRoom)
            ? ""
            : zdata.coban.foreignRoom;
          // $('#cb-roe').text(zdata.roe);
          // $('#cb-roa').text(zdata.roa);

          $("#cb-dumua").text(Highcharts.numberFormat(zdata.coban.dumua, 0));
          $("#cb-duban").text(Highcharts.numberFormat(zdata.coban.duban, 0));
          $("#cb-yield").text(Highcharts.numberFormat(zdata.coban.yield, 2));
          $("#cb-fwpe").text(Highcharts.numberFormat(zdata.coban.fwpe, 2));
          $("#cb-bvps").text(Highcharts.numberFormat(zdata.coban.bvps, 2));
          $("#cb-pb").text(Highcharts.numberFormat(zdata.coban.pb, 2));
          $("#cb-nnsh").text(
            Highcharts.numberFormat(foreignRoom.slice(0, -1), 2) + "%"
          );
          $("#cb-totalRoom").text(
            Highcharts.numberFormat(zdata.coban.totalRoom, 0)
          );
          $("#cb-amplitude-52").text(
            Highcharts.numberFormat(zdata.coban.yearlow / 1000, 2) +
              " - " +
              Highcharts.numberFormat(zdata.coban.yearhigh / 1000, 2)
          );
          $("#cb-cap").text(
            Highcharts.numberFormat(zdata.coban.capitalLevel, 0)
          );
          //$('#cb-pe').text(Highcharts.numberFormat(zdata.coban.pe, 2));
          $("#cb-eps").text(Highcharts.numberFormat(zdata.coban.eps, 0));
          $("#cb-dividend").text(
            Highcharts.numberFormat(zdata.coban.dividend, 2)
          );
          $("#cb-beta").text(Highcharts.numberFormat(zdata.coban.beta, 2));

          let chisoTCNam = zdata.chisoTCNam;
          if (chisoTCNam.length > 0) {
            let ROAA, ROEA, PE, BVPS, EPS;
            $.each(chisoTCNam, function (key, value) {
              if (value.Name == "ROAA") ROAA = value.Value1;
              if (value.Name == "ROEA") ROEA = value.Value1;
              if (value.Name == "P/E cÆ¡ báº£n") PE = value.Value1;
              if (value.Name == "BVPS cÆ¡ báº£n") BVPS = value.Value1;
              if (value.Name == "EPS cá»§a 4 quĂ½ gáº§n nháº¥t")
                EPS = value.Value1;
            });

            $("#cb-roa").text(ROAA);
            $("#cb-roe").text(ROEA);
            //$('#cb-roe').text( _.isEmpty(ROS) ? "-" : ROS.Value1);
            $("#cb-pe").text(PE);
            $("#cb-bvps").text(!$.isNumeric(BVPS) ? "" : BVPS / 1000);
            $("#cb-eps").text(!$.isNumeric(EPS) ? "" : EPS / 1000);
          }
        } catch (error) {
          console.log(error);
          $("#cb-roe").text("");
          $("#cb-roa").text("");
          $("#cb-dumua").text("");
          $("#cb-duban").text("");
          $("#cb-yield").text("");
          $("#cb-fwpe").text("");
          $("#cb-bvps").text("");
          $("#cb-pb").text("");
          $("#cb-nnsh").text("");
          $("#cb-totalRoom").text("");
          $("#cb-amplitude-52").text("");
          $("#cb-cap").text("");
          $("#cb-pe").text("");
          $("#cb-eps").text("");
          $("#cb-dividend").text("");
          $("#cb-beta").text("");
        }

        // create header
        var headerYear = "<th></th>";
        $.each(zdata.ttNam, function (i, data) {
          headerYear +=
            "<th>" + data.TermName + " " + data.YearPeriod + "</th>";
        });
        // káº¿t quáº£ kinh doanh nÄƒm
        $.each(zdata.ketquaKDNam, function (i, data) {
          if (i == 0) {
            htmlAll += "<thead><tr>";
            htmlAll +=
              "<th>" +
              data.ReportComponentName +
              "</th>" +
              headerYear +
              "</th></tr></thead><tbody>";
          }
          var spl =
            "" +
            data.Value4 +
            "," +
            data.Value3 +
            "," +
            data.Value2 +
            "," +
            data.Value1;
          //console.log(spl)
          htmlAll +=
            "<tr><td>" +
            data.Name +
            '</td>\
							<td class="text-center"><span id="kqkd-tristate' +
            i +
            '">' +
            spl +
            "</span></td>\
							<td>" +
            Highcharts.numberFormat(data.Value4, 0) +
            "</td>\
							<td>" +
            Highcharts.numberFormat(data.Value3, 0) +
            "</td>\
							<td>" +
            Highcharts.numberFormat(data.Value2, 0) +
            "</td>\
							<td>" +
            Highcharts.numberFormat(data.Value1, 0) +
            "</td>\
							</tr>";
        });
        htmlAll += "</tbody>";
        // console.log(htmlAll);
        $("#tbl-kqkd").html(htmlAll);

        htmlAll = "";
        // cĂ¢n Ä‘á»‘i káº¿ toĂ¡n
        $.each(zdata.candoiKTNam, function (i, data) {
          if (i == 0) {
            htmlAll += "<thead><tr>";
            htmlAll +=
              "<th>" +
              data.ReportComponentName +
              "</th>" +
              headerYear +
              "</th></tr></thead><tbody>";
          }
          var spl =
            "" +
            data.Value4 +
            "," +
            data.Value3 +
            "," +
            data.Value2 +
            "," +
            data.Value1;
          htmlAll +=
            "<tr><td>" +
            data.Name +
            '</td>\
							<td class="text-center"><span id="cdkt-tristate' +
            i +
            '">' +
            spl +
            "</span></td>\
							<td>" +
            Highcharts.numberFormat(data.Value4, 0) +
            "</td>\
							<td>" +
            Highcharts.numberFormat(data.Value3, 0) +
            "</td>\
							<td>" +
            Highcharts.numberFormat(data.Value2, 0) +
            "</td>\
							<td>" +
            Highcharts.numberFormat(data.Value1, 0) +
            "</td>\
							</tr>";
        });
        htmlAll += "</tbody>";
        // console.log(htmlAll);
        $("#tbl-cdkt").html(htmlAll);

        htmlAll = "";
        // chá»‰ sá»‘ tĂ i chĂ­nh
        $.each(zdata.chisoTCNam, function (i, data) {
          if (i == 0) {
            htmlAll += "<thead><tr>";
            htmlAll +=
              "<th>" +
              data.ReportComponentName +
              "</th>" +
              headerYear +
              "</th></tr></thead><tbody>";
          }
          var spl =
            "" +
            data.Value4 +
            "," +
            data.Value3 +
            "," +
            data.Value2 +
            "," +
            data.Value1;
          htmlAll +=
            "<tr><td>" +
            data.Name +
            '</td>\
							<td class="text-center"><span id="cstc-tristate' +
            i +
            '">' +
            spl +
            "</span></td>\
							<td>" +
            Highcharts.numberFormat(data.Value4, 0) +
            "</td>\
							<td>" +
            Highcharts.numberFormat(data.Value3, 0) +
            "</td>\
							<td>" +
            Highcharts.numberFormat(data.Value2, 0) +
            "</td>\
							<td>" +
            Highcharts.numberFormat(data.Value1, 0) +
            "</td>\
							</tr>";
        });
        htmlAll += "</tbody>";
        $("#tbl-cstc").html(htmlAll);
        initTristate("tbl-kqkd");
        initTristate("tbl-cdkt");
        initTristate("tbl-cstc");

        // // káº¿t quáº£ kinh doanh
        // $.each(zdata.ketquaKD, function (i, data) {
        // 	if (i == 0) {
        // 		htmlAll += '<thead><tr>';
        // 		$.each(data, function (index, dt) {
        // 			if (index != 0) {
        // 				htmlAll += '<th>' + (dt == '' ? "" : dt.split(' ')[0] + ' ' + dt.split(' ')[1] + '<br />' + dt.split(' ')[2]) + '</th>';
        // 			} else {
        // 				htmlAll += '<th>' + dt + '</th><th></th>';
        // 			}
        // 		});
        // 		htmlAll += '</tr></thead><tbody>';
        // 	} else {
        // 		htmlAll += '<tr>';
        // 		var aaa = '';
        // 		var spl = '';
        // 		$.each(data, function (j, dt) {
        // 			if (j == 0) {
        // 				htmlAll += '<td>' + dt + '</td>';
        // 			} else {
        // 				aaa += '<td>' + dt + '</td>';
        // 				spl += dt.replaceAll(',', '') + ',';
        // 			}
        // 		})
        // 		htmlAll += '<td class="text-center"><span id="kqkd-tristate' + i + '">' + spl.slice(0, -1) + '</span></td>' + aaa;
        // 		htmlAll += '</tr>';
        // 	}
        // });
        // htmlAll += '</tbody>';
        // // console.log(htmlAll);
        // $('#tbl-kqkd').html(htmlAll);

        // // cĂ¢n Ä‘á»‘i káº¿ toĂ¡n
        // htmlAll = '';
        // $.each(zdata.candoiKT, function (i, data) {
        // 	if (i == 0) {
        // 		htmlAll += '<thead><tr><th>CĂ‚N Äá»I Káº¾ TOĂN</th><th></th>';
        // 		$.each(data, function (index, dt) {
        // 			// if(index != 0){
        // 			htmlAll += '<th>' + (dt == '' ? "" : dt.split(' ')[0] + ' ' + dt.split(' ')[1] + '<br />' + dt.split(' ')[2]) + '</th>';
        // 			// } else{
        // 			// 	htmlAll += '<th>'+dt+'</th>';
        // 			// }
        // 		});
        // 		htmlAll += '</tr></thead><tbody>';
        // 	} else {
        // 		htmlAll += '<tr>';
        // 		aaa = '';
        // 		spl = '';
        // 		$.each(data, function (j, dt) {
        // 			if (j == 0) {
        // 				htmlAll += '<td>' + dt + '</td>';
        // 			} else {
        // 				aaa += '<td>' + dt + '</td>';
        // 				spl += dt.replaceAll(',', '') + ',';
        // 			}
        // 		})
        // 		htmlAll += '<td class="text-center"><span id="cdkt-tristate' + i + '">' + spl.slice(0, -1) + '</span></td>' + aaa;
        // 		htmlAll += '</tr>';
        // 	}
        // });
        // htmlAll += '</tbody>';
        // $('#tbl-cdkt').html(htmlAll);

        // // chá»‰ sá»‘ tĂ i chĂ­nh
        // htmlAll = '';
        // $.each(zdata.chisoTC, function (i, data) {
        // 	if (i == 0) {
        // 		htmlAll += '<thead><tr><th>CHá»ˆ Sá» TĂ€I CHĂNH</th><th></th>';
        // 		$.each(data, function (index, dt) {
        // 			// if(index != 0){
        // 			htmlAll += '<th>' + (dt == '' ? "" : dt.split(' ')[0] + ' ' + dt.split(' ')[1] + '<br />' + dt.split(' ')[2]) + '</th>';
        // 			// } else{
        // 			// 	htmlAll += '<th>'+dt+'</th>';
        // 			// }
        // 		});
        // 		htmlAll += '</tr></thead><tbody>';
        // 	} else {
        // 		htmlAll += '<tr>';
        // 		aaa = '';
        // 		spl = '';
        // 		$.each(data, function (j, dt) {
        // 			if (j == 0) {
        // 				htmlAll += '<td>' + dt + '</td>';
        // 			} else {
        // 				aaa += '<td>' + dt + '</td>';
        // 				spl += dt.replaceAll(',', '') + ',';
        // 			}
        // 		})
        // 		htmlAll += '<td class="text-center"><span id="cstc-tristate' + i + '">' + spl.slice(0, -1) + '</span></td>' + aaa;
        // 		htmlAll += '</tr>';
        // 	}
        // });
      }
    },
    "jsonp"
  );
}

function initTristate(tbl) {
  $("#" + tbl + " tbody tr").each(function () {
    var id = $(this).children("td").eq(1).children("span").eq(0).attr("id");
    var dt = [];
    var ax = $("#" + id)
      .text()
      .split(",");
    //console.log(ax);
    ax.forEach((data) => {
      if (data.includes(".")) {
        dt.push(StringToDouble(data));
      } else {
        dt.push(StringToInt(data));
      }
    });
    $("#" + id).text("");
    //console.log(dt);
    $("#" + id).sparkline(dt, {
      type: "bar",
      height: "21",
      barWidth: 10,
      barSpacing: 4,
      barColor: getColor("i"),
    });
  });
}

// load danh sach khop lá»‡nh nhiá»u nháº¥t
function loadTopTrade() {
  loadTopVolCode(10);
}

function loadChangeNews() {
  $.getJSON(
    getTopNews + 6,
    {},
    function (zdata) {
      // var htmlAll = "<ul>";
      // console.log(zdata);
      if (zdata != null) {
        // sort theo time
        // var newsHtml = "";
        $(".news ul >li:first").remove();
        $.each(zdata, function (i, idata) {
          processNews(idata);
          // htmlAll += '<li><a href="#">' + idata.tl + '</a></li>';
        });
        $(".news ul >li:first").css("margin-top", "-2px");
        // htmlAll += '</ul>';
        // $('.news').html(htmlAll);
      }
    },
    "jsonp"
  );
}

function processNews(idata) {
  var newsCount = $(".news ul >li").length;
  if (newsCount >= 10) {
    //remove phan tu dau tien
    $(".news ul >li:first").remove();
  }
  var hash = new String(idata.tl).hashCode();
  if ($("#" + hash).length == 0) {
    var html =
      '<li style="line-height:22px;height:23px;overflow:hidden;" id="' +
      hash +
      '"><a style="font-size:12px;color:#FFB900;font-weight:bold;" target="_blank"';
    html = html + '	href="' + idata.rf + '" ';
    html =
      html + '	title="' + idata.tm + " - " + idata.tl + "(" + idata.sc + ')" >';
    html = html + "	" + idata.tl + "";
    html = html + "</a></li>";
    $(".news ul:last").append(html);
  }
}

$(document).on("click", ".top-vol th", function () {
  $(".top-vol th").removeClass("active");
  $(this).addClass("active");

  var code = $(this).attr("type");
  loadTopVolCode(code);
});

$(document).on(
  "click",
  ".tbl-fix-header table .thead-cs tr th:not([data-sorter=false])",
  function () {
    $("#tbl-cs").trigger("update"); // update tablesort before sorter
    var idx = $(this).attr("sort-idx");
    if (typeof idx === typeof undefined || idx === false) {
      // Khá»Ÿi táº¡o index
      $(".tbl-fix-header table .thead-cs tr th:not([data-sort=false]").each(
        function (index) {
          $(this).attr("sort-idx", index);
        }
      );
      $("#tbl-cs .thead-cs tr th:not([data-sort=false]").each(function (index) {
        $(this).attr("sort-idx", index);
      });
      idx = $(this).attr("sort-idx");
    }

    var td = $("#tbl-cs .thead-cs tr th[sort-idx=" + idx + "]");
    if (td.length < 1) {
      return false;
    }

    td.click();
    // Show sort arrow icon
    $(this)
      .closest("thead")
      .find("tr th[sort-idx]:not([sort-idx=" + idx + "])>span.sorticon")
      .remove();
    var sorticon = $(this).find("span.sorticon");
    if (sorticon.length !== 0) {
      if (sorticon.hasClass("descending")) {
        sorticon
          .removeClass("descending")
          .addClass("ascending")
          .html('<i class="fa fa-caret-down" aria-hidden="true"></i>');
      } else {
        sorticon
          .removeClass("ascending")
          .addClass("descending")
          .html('<i class="fa fa-caret-up" aria-hidden="true"></i>');
      }
    } else {
      $(this).append(
        '<span class="sorticon descending"><i class="fa fa-caret-up" aria-hidden="true"></i></span>'
      );
    }
  }
);

function loadTopVolReal() {
  // console.log($('.top-vol th.active').attr('type'))
  loadTopVolCode($(".top-vol th.active").attr("type"));
}

function loadTopVolCode(code) {
  var par = "";
  if (code == "6") {
    par = "5," + code;
  } else {
    par = "5," + code + ",5";
  }
  $.getJSON(
    listTopStockLink + par,
    {},
    function (zdata) {
      // {"id":2100,"sym":"AST","mc":"10","c":72.1,"f":62.7,"r":67.4,"lastPrice":67.4,"lastVolume":177,"lot":9945,"ot":"0.10","changePc":"0.15","avePrice":"67.60","highPrice":"68.00","lowPrice":"67.30","fBVol":"0","fBValue":"0","fSVolume":"2356","fSValue":"0","fRoom":"918479","g1":"67.20|305|d","g2":"67.10|205|d","g3":"67.00|1002|d","g4":"67.30|36|d","g5":"67.40|665|e","g6":"67.50|183|i","g7":"0|0|e","mp":"0%","color":"e"}
      if (zdata != null) {
        $.each(zdata, function (i, data) {
          if (data != null) {
            htmlAll =
              "<td>" +
              data.sym +
              '</td><td colspan="2" style="color: ' +
              getColor(data.color) +
              '" class="txt-right">' +
              Highcharts.numberFormat(data.lastPrice, 2) +
              '</td><td colspan="2" class="txt-right">' +
              FormatVolume10(data.lot, 2) +
              '</td><td class="txt-right" style="color: ' +
              (data.ot.includes("-") ? "#DA5664" : "#50C979") +
              '">' +
              Highcharts.numberFormat(data.ot, 2) +
              "</td>";
            $("#hsx_" + (i + 1)).html(htmlAll);
          }
        });
      }
    },
    "jsonp"
  );
  setTimeout("loadTopVolReal()", 30000);
}

loadGlobalIndex = function () {
  $(".info-box .card.word-index").html("");
  $(".info-box .card.commondity-index").html("");
  var kk = 1;
  $.getJSON(
    baseWorldIndex,
    {},
    function (zdata) {
      if (zdata != null) {
        $.each(zdata, function (i, data) {
          if (
            data != null &&
            data.index != "Nasdaq" &&
            data.index != "S&P 500"
          ) {
            var cl = data.color == "r" ? "redClockIcon" : "greenClockIcon";
            var html =
              '<div class="btn btn-secondary border1" data-name="' +
              data.index +
              '" style="width: 175px;"><span class="index">\
								<span style="color: #24DEAC;" class="indexName">' +
              data.index +
              "</span><span>" +
              data.last +
              '</span><span class="' +
              cl +
              '"></span></span>\
								<span class="change"><span class="' +
              (data.change.includes("-") ? "txt-red" : "txt-lime") +
              '">' +
              data.change +
              '</span>\
								<span class="' +
              (data.changePc.includes("-") ? "txt-red" : "txt-lime") +
              '">' +
              data.changePc +
              "</span></span></div>";
            $(".info-box .card.word-index").append(html);
            kk = kk < 3 ? kk + 1 : 1;
          }
        });
      }
    },
    "jsonp"
  ).then(function () {
    $.getJSON(
      baseComondityIndex,
      {},
      function (zdata) {
        if (zdata != null) {
          $.each(zdata, function (i, data) {
            if (data != null) {
              var cl = data.color == "r" ? "redClockIcon" : "greenClockIcon";
              var html =
                '<div class="btn btn-secondary comondity' +
                i +
                ' border1" data-name="' +
                data.commodity +
                '" style="width: 175px;"><span class="index">\
									<span style="color: #24DEAC;" class="indexName">' +
                data.commodity +
                "</span><span>" +
                data.last +
                '</span><span class="' +
                cl +
                '"></span></span>\
									<span class="change"><span class="' +
                (data.change.includes("-") ? "txt-red" : "txt-lime") +
                '">' +
                data.change +
                '</span>\
									<span class="' +
                (data.changePc.includes("-") ? "txt-red" : "txt-lime") +
                '">' +
                data.changePc +
                "</span></span></div>";
              $(".info-box .card.word-index").append(html);
            }
          });
        }
      },
      "jsonp"
    );
  });

  // setTimeout("loadGlobalIndex()", 10000);
};

function getLSDetail(stockCode, ceil, floor, ref) {
  // console.log($(document).width())
  var srwidth = $(document).width();

  var iii = Math.ceil(((srwidth * 0.8 - 60) * 7) / 12);

  $(".panel-left").css("width", iii);
  $("#containerStockChart").css("width", iii);
  $(".panel-right").css("width", srwidth - iii);

  GStockData = [];
  GStockVolume = [];
  // import first value
  if (GStockData.length == 0) {
    var newData = [Date.UTC(bYear, bMonth, bDay, bHour, b90Min), ref];
    GStockData.push(newData);
    var newVol = [Date.UTC(bYear, bMonth, bDay, bHour, b90Min), 0];
    GStockVolume.push(newVol);
  }

  var items = {},
    base,
    key;

  // Lay thong tin LS cuar CK update --> stockData
  $.getJSON(
    getListStockChange + stockCode,
    {},
    function (zdata) {
      // console.log(zdata);
      if (zdata != null) {
        var id = "";
        var oldTime = "0";
        var volIntime = 0;
        try {
          var rdata = JSON.parse(zdata);
        } catch (error) {
          var rdata = zdata;
        }

        if (rdata.length > 0) {
          $("#cb-mocua").text(rdata[0].lastPrice);
        } else {
          $("#cb-mocua").text("");
        }

        $.each(rdata, function (i, idata) {
          if (idata.lastVol > 0) {
            // if (idata[2] != null) {
            var time = idata.time.split(":");
            if (time[0] != "07" && time[0] != "08") {
              var currentTime = time[1];
              if (oldTime != currentTime) {
                volIntime = volIntime + idata.lastVol;
                var newData = [
                  Date.UTC(bYear, bMonth, bDay, time[0], time[1]),
                  idata.lastPrice,
                ];
                GStockData.push(newData);
                var newVol = [
                  Date.UTC(bYear, bMonth, bDay, time[0], time[1]),
                  volIntime,
                ];
                GStockVolume.push(newVol);
                oldTime = currentTime;
                volIntime = 0;
              } else {
                volIntime = volIntime + idata.lastVol;
              }
            }
            // }
            //step price
            key = idata.lastPrice;
            if (!items[key]) {
              items[key] = 0;
            }
            // tong khoi luong
            items[key] += idata.lastVol * 10;
          }
        });
        // step price
        var stepPrice = [];
        $.each(items, function (key, val) {
          stepPrice.push([key, val]);
        });

        stepPrice.sort(function (a, b) {
          // a and b will here be two objects from the array
          // thus a[1] and b[1] will equal the names

          // if they are equal, return 0 (no sorting)
          if (a[0] == b[0]) {
            return 0;
          }
          if (a[0] > b[0]) {
            // if a should come after b, return 1
            return 1;
          } else {
            // if b should come after a, return -1
            return -1;
          }
        });
        // outputArr contains the result
        //console.log(JSON.stringify(stepPrice));
        // draw step price chart
        initStepPriceChart(stepPrice);
        // ve do thi
        initStockChart(
          stockChart,
          "containerStockChart",
          ref,
          GStockData,
          GStockVolume
        );
      }
    },
    "jsonp"
  );
}

function initStepPriceChart(stepPrice) {
  // Create the chart
  $("#stepPriceChart").highcharts({
    chart: {
      type: "column",
      backgroundColor: "#000000",
      zoomType: "xy",
      animation: false,
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: { text: "" },
      gridLineColor: "#C0C0C0",
      gridLineWidth: 0.2,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        'Price:<span style="color:{point.color}">{point.name}</span> Vol: <b>{point.y}</b><br/>',
    },
    series: [
      {
        name: "Step price",
        data: stepPrice,
        color: "#2DFF1E",
      },
    ],
  });
}

function initStockChart(
  stockChart,
  chartName,
  refPrice,
  priceDate,
  volumeData
) {
  var stockCode = openStock;
  var iMin = refPrice * 0.985;
  var bMin = 9;
  var mColor = "#d1af54";
  bMin = b90Min;

  stockChart = new Highcharts.Chart({
    chart: {
      renderTo: chartName,
      backgroundColor: getBackground(),
      // zoomType: 'xy',
      animation: false,
    },
    title: { text: "" },
    xAxis: {
      type: "datetime",
      gridLineColor: getColor("t"),
      gridLineWidth: 0.2,
    },
    yAxis: [
      {
        // Primary yAxis
        title: { text: "" },
        gridLineColor: getColor("t"),
        gridLineWidth: 0.2,
        plotLines: [
          {
            color: getColor("e"),
            width: 1.5,
            value: refPrice,
            dashStyle: "shortdash",
          },
        ],
      },
      {
        // Secondary yAxis
        title: { text: "" },
        opposite: true,
        gridLineColor: getColor("t"),
        gridLineWidth: 0.2,
      },
    ],
    plotOptions: {
      line: {
        animation: false,

        lineWidth: 2,
        marker: {
          enabled: false,
        },
        shadow: false,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: refPrice,
      },
      area: {
        animation: false,

        lineWidth: 2,
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
    },
    tooltip: {
      shared: true,
      formatter: function () {
        //var str  = objToString(this.points[0].y);
        //alert(str);
        try {
          return (
            "<b> " +
            Highcharts.dateFormat("%H:%M", this.x) +
            " </b><br/>" +
            stockCode +
            ": <b>" +
            this.points[1].y +
            "</b><br/>" +
            "Volume: <b>" +
            Highcharts.numberFormat(this.points[0].y * 10, 0) +
            "</b>"
          );
        } catch (e) {
          return "";
        }
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "area",
        name: "Volume",
        yAxis: 1,

        // color: '#3167fb',
        // data: volumeData,
        // borderColor: '#5B87FF',

        color: "#67CDF0",
        pointInterval: 60 * 10000,
        pointStart: Date.UTC(bYear, bMonth, bDay, bHour, bMin),
        pointEnd: Date.UTC(eYear, eMonth, eDay, eHour, eMin),
        data: volumeData,
        borderRadiusTopLeft: 10,
        borderRadiusTopRight: 10,
      },
      {
        type: "line",
        color: getColor("i"),
        negativeColor: getColor("d"),
        pointInterval: 60 * 10000,
        pointStart: Date.UTC(bYear, bMonth, bDay, bHour, bMin),
        pointEnd: Date.UTC(eYear, eMonth, eDay, eHour, eMin),
        data: priceDate,
      },
    ],
  });
  // $('#containerStockChart').css('width', '100%');
  // $('#containerStockChart').resize();
}

function openHis(id) {
  var curHis = $(".modal-btn-chart.active").attr("id").replace("his", "");
  if (curHis == id) {
  } else {
    $(".modal-btn-chart").removeClass("active");
    $("#his" + id).addClass("active");
    curHis = id;
    if (id == 1) {
      // neu bang 1 load tu mem
      initStockChart(
        stockChart,
        "containerStockChart",
        refPrice,
        GStockData,
        GStockVolume
      );
    } else {
      // thuc hien thao tac load data his ve ve lai du lieu
      var fromDate;
      var toDate = new Date(bYear, bMonth - 1, bDay);
      if (id == 2) {
        // 1 tuan
        fromDate = new Date(bYear, bMonth - 1, bDay - 7);
        if (G2StockData.length > 0) {
          // update from mem
          initHisStockChart(
            stockChart,
            "containerStockChart",
            G2StockData,
            G2StockVolume,
            G2Xcate
          );
        } else {
          getHistoryData(openStock, formatDate(fromDate), formatDate(toDate));
        }
      } else if (id == 3) {
        // 1 thang
        fromDate = new Date(bYear, bMonth - 1 - 1, bDay);
        if (G3StockData.length > 0) {
          // update from mem
          initHisStockChart(
            stockChart,
            "containerStockChart",
            G3StockData,
            G3StockVolume,
            G3Xcate
          );
        } else {
          getHistoryData(openStock, formatDate(fromDate), formatDate(toDate));
        }
      } else if (id == 4) {
        fromDate = new Date(bYear, bMonth - 1 - 3, bDay);
        if (G4StockData.length > 0) {
          // update from mem
          initHisStockChart(
            stockChart,
            "containerStockChart",
            G4StockData,
            G4StockVolume,
            G4Xcate
          );
        } else {
          getHistoryData(openStock, formatDate(fromDate), formatDate(toDate));
        }
      } else if (id == 5) {
        fromDate = new Date(bYear, bMonth - 1 - 6, bDay);
        if (G5StockData.length > 0 && G5StockVolume.length > 0) {
          // update from mem
          initHisStockChart(
            stockChart,
            "containerStockChart",
            G5StockData,
            G5StockVolume,
            G5Xcate
          );
        } else {
          getHistoryData(openStock, formatDate(fromDate), formatDate(toDate));
        }
      } else if (id == 6) {
        fromDate = new Date(bYear - 1, bMonth - 1, bDay);
        if (G6StockData.length > 0) {
          // update from mem
          initHisStockChart(
            stockChart,
            "containerStockChart",
            G6StockData,
            G6StockVolume,
            G6Xcate
          );
        } else {
          getHistoryData(openStock, formatDate(fromDate), formatDate(toDate));
        }
      }
    }
  }
}

function getHistoryData(openStock, pFromDate, pToDate) {
  //alert('sym ' + openStock + ' f=' + fromDate + '  t=' + toDate);
  // Lay thong tin LS cuar CK update --> stockData

  var curHis = $(".modal-btn-chart.active").attr("id").replace("his", "");

  $.getJSON(
    "https://banggia.vps.com.vn/vpbs.do?jKey=?",
    {
      msgType: "loadHisSym",
      symbol: openStock,
      type: 1,
      fromDate: pFromDate,
      toDate: pToDate,
      return_type: 1,
    },
    function (zdata) {
      if (zdata != null) {
        if (zdata.sym == openStock) {
          $.each(zdata.content, function (i, idata) {
            //alert(idata[0] + ' ' +idata[1] + ' ' + idata[2] + ' ' + idata[3] + ' ' + idata[4] + ' ' + idata[5]);
            var date = idata[0];
            var y = getYear(date);
            var m = getMonth(date);
            var d = getDay(date);
            //var newData = [Date.UTC(y,m-1,d,0,0),idata[4]];
            var sDate = d + "/" + m;
            var newData = [sDate, idata[4]];
            //var newVol = [Date.UTC(y,m-1,d,0,0),idata[5]];

            var newVol = [sDate, idata[5]];
            if (curHis == 2) {
              G2Xcate.push(sDate);
              G2StockData.push(newData);
              G2StockVolume.push(newVol);
            } else if (curHis == 3) {
              G3Xcate.push(sDate);
              G3StockData.push(newData);
              G3StockVolume.push(newVol);
            } else if (curHis == 4) {
              G4Xcate.push(sDate);
              G4StockData.push(newData);
              G4StockVolume.push(newVol);
            } else if (curHis == 5) {
              G5Xcate.push(sDate);
              G5StockData.push(newData);
              G5StockVolume.push(newVol);
            } else if (curHis == 6) {
              G6Xcate.push(sDate);
              G6StockData.push(newData);
              G6StockVolume.push(newVol);
            }
          });
          if (curHis == 2) {
            initHisStockChart(
              stockChart,
              "containerStockChart",
              G2StockData,
              G2StockVolume,
              G2Xcate
            );
          } else if (curHis == 3) {
            initHisStockChart(
              stockChart,
              "containerStockChart",
              G3StockData,
              G3StockVolume,
              G3Xcate
            );
          } else if (curHis == 4) {
            initHisStockChart(
              stockChart,
              "containerStockChart",
              G4StockData,
              G4StockVolume,
              G4Xcate
            );
          } else if (curHis == 5) {
            initHisStockChart(
              stockChart,
              "containerStockChart",
              G5StockData,
              G5StockVolume,
              G5Xcate
            );
          } else if (curHis == 6) {
            initHisStockChart(
              stockChart,
              "containerStockChart",
              G6StockData,
              G6StockVolume,
              G6Xcate
            );
          }
        }
      }
    },
    "jsonp"
  );
}

function formatDate(sel) {
  var y = sel.getFullYear() + "";
  var m = sel.getUTCMonth() + 1 + "";
  if (m.length == 1) m = "0" + m;
  var d = sel.getUTCDate() + "";
  if (d.length == 1) d = "0" + d;
  var ret = y + m + d;
  return ret;
}

function getYear(date) {
  var y = date.toString().substring(0, 4);
  return y;
}
function getMonth(date) {
  var m = date.toString().substring(6, 4);
  return m;
}
function getDay(date) {
  var d = date.toString().substring(8, 6);
  return d;
}

function initHisStockChart(
  stockChart,
  chartName,
  priceDate,
  volumeData,
  xCategories
) {
  var stockCode = openStock;

  var mColor = getColor("i");
  var tick = 10;
  if (priceDate.length < 6) {
    tick = 1;
  } else if (priceDate.length >= 6 && priceDate.length < 30) {
    tick = 6;
  } else if (priceDate.length >= 30 && priceDate.length < 60) {
    tick = 10;
  } else {
    tick = 30;
  }

  stockChart = new Highcharts.Chart({
    chart: {
      renderTo: chartName,
      backgroundColor: getBackground(),
      animation: false,
    },
    title: { text: "" },
    //xAxis: { type: 'datetime',gridLineColor: '#C6CBDE',gridLineWidth: 0.2},
    xAxis: { categories: xCategories, tickInterval: tick },
    yAxis: [
      {
        // Primary yAxis
        title: { text: "" },
        gridLineColor: getColor("t"),
        gridLineWidth: 0.2,
      },
      {
        // Secondary yAxis
        title: { text: "" },
        opposite: true,
        gridLineColor: getColor("t"),
        gridLineWidth: 0.2,
      },
    ],
    plotOptions: {
      area: {
        animation: false,
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [
              1,
              Highcharts.Color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
            [
              1,
              Highcharts.Color(Highcharts.getOptions().colors[0])
                .setOpacity(0)
                .get("rgba"),
            ],
          ],
        },
        lineWidth: 2,
        marker: {
          enabled: false,
        },
        shadow: false,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
      column: {
        animation: false,
        borderWidth: 1,
        borderColor: "white",
      },
      series: {
        connectNulls: true,
      },
    },
    tooltip: {
      shared: true,
      formatter: function () {
        return (
          "<b> " +
          this.x +
          " </b><br/>" +
          stockCode +
          ": <b>" +
          this.points[1].y +
          "</b><br/>" +
          "Volume: <b>" +
          Highcharts.numberFormat(this.points[0].y, 0) +
          "</b>"
        );
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "column",
        name: "Volume",
        yAxis: 1,
        color: "#67CDF0",
        data: volumeData,
        borderColor: "#5B87FF",
        borderRadiusTopLeft: 10,
        borderRadiusTopRight: 10,
      },
      {
        type: "area",
        color: mColor,
        name: "VN-INDEX",
        data: priceDate,
      },
    ],
  });
}

getvaluethoathuan = function () {
  // $.getJSON('http://banggia.vps.com.vn:8083/webservices.vnd?jKey=?', {
  // 	msgType: "fullWSPT",
  // 	tradingCenter: code
  // }, function (zdata) {
  // 	if (zdata != null) {
  //         gtTTVal += zdata.value;
  //         $('#sum2MarketTTValue').text(Highcharts.numberFormat(gtTTVal/1000000, 0) + ' tá»·');
  // 	}
  // },
  // 	"jsonp"
  // );
  $("#sum2MarketTTValue").html(
    '0 <span class="txtTy">' + getMessage("txtTy") + "</span>"
  );
  $.getJSON(
    listThoaThuanLink,
    {},
    function (zdata) {
      if (zdata != null) {
        zdata.forEach((element) => {
          if (element.type == "PTM") gtTTVal += element.value;
        });

        $("#sum2MarketTTValue").html(
          Highcharts.numberFormat(gtTTVal / 1000000, 0) +
            ' <span class="txtTy">' +
            getMessage("txtTy") +
            "</span>"
        );
      }
    },
    "jsonp"
  );
};

function loadTheme() {
  $(".dropdown-content-theme .dropdown-item").removeClass("active");
  if (settingUI.theme == "m") {
    $(".dropdown-content-theme")
      .children(".dropdown-item")
      .eq(0)
      .addClass("active");
  } else if (settingUI.theme == "b") {
    $(".dropdown-content-theme")
      .children(".dropdown-item")
      .eq(1)
      .addClass("active");
  } else {
    $(".dropdown-content-theme")
      .children(".dropdown-item")
      .eq(2)
      .addClass("active");
  }
}

function fnAppendScript(filepath) {
  if ($('head script[src^="' + filepath + '"]').length > 0) return;

  $("head").append(
    $('<script src="' + filepath + "?v=" + serverTime + '"></script>')
  );
}

function fnAppendStyle(filepath) {
  if ($('head link[href="' + filepath + '"]').length > 0) return;

  $("head").append(
    $("<link rel='stylesheet' href='" + filepath + "' rel='stylesheet'>")
  );
}

$(document).on("click", ".dropdown-content-theme .dropdown-item", function () {
  if (!$(this).hasClass("active")) {
    $(".preloader").toggle();
    $.ajaxSetup({ async: false });
    var textTheme = $(this).children().eq(0).text();
    $(".dropdown-content-theme .dropdown-item").removeClass("active");
    $(this).addClass("active");

    if (textTheme == "Hiá»‡n Ä‘áº¡i" || textTheme == "Model") {
      settingUI.theme = "m";
      $("#basic-css").remove();
      $("#basic-js").remove();
      $("#colorFull-css").remove();
      $("#colorFull-js").remove();

      $(
        'head link[href="dist/css/basic.css"], head link[href="dist/css/colorFull.css"], head script[src^="dist/js/pages/theme/"]'
      ).remove();
      fnAppendStyle("dist/css/model.css");
      fnAppendScript("dist/js/pages/theme/model.js");

      try {
        indexChart_HSX.series[2].userOptions.color = "#50C979";
        indexChart_HSX.series[2].userOptions.negativeColor = "#DA5664";
        indexChart_HSX.series[2].update(indexChart_HSX.series[2].userOptions);

        indexChart_HNX.series[2].userOptions.color = "#50C979";
        indexChart_HNX.series[2].userOptions.negativeColor = "#DA5664";
        indexChart_HNX.series[2].update(indexChart_HNX.series[2].userOptions);

        indexChart_UPCOM.series[2].userOptions.color = "#50C979";
        indexChart_UPCOM.series[2].userOptions.negativeColor = "#DA5664";
        indexChart_UPCOM.series[2].update(
          indexChart_UPCOM.series[2].userOptions
        );

        indexChart_VN30.series[2].userOptions.color = "#50C979";
        indexChart_VN30.series[2].userOptions.negativeColor = "#DA5664";
        indexChart_VN30.series[2].update(indexChart_VN30.series[2].userOptions);
      } catch (e) {}
    } else if (textTheme == "Cá»• Ä‘iá»ƒn" || textTheme == "Classic") {
      settingUI.theme = "b";
      $("#model-css").remove();
      $("#model-js").remove();
      $("#colorFull-css").remove();
      $("#colorFull-js").remove();

      $(
        'head link[href="dist/css/model.css"], head link[href="dist/css/colorFull.css"], head script[src^="dist/js/pages/theme/"]'
      ).remove();
      fnAppendStyle("dist/css/basic.css");
      fnAppendScript("dist/js/pages/theme/basic.js");

      try {
        indexChart_HSX.series[2].userOptions.color = "#0f0";
        indexChart_HSX.series[2].userOptions.negativeColor = "red";
        indexChart_HSX.series[2].update(indexChart_HSX.series[2].userOptions);

        indexChart_HNX.series[2].userOptions.color = "#0f0";
        indexChart_HNX.series[2].userOptions.negativeColor = "red";
        indexChart_HNX.series[2].update(indexChart_HNX.series[2].userOptions);

        indexChart_UPCOM.series[2].userOptions.color = "#0f0";
        indexChart_UPCOM.series[2].userOptions.negativeColor = "red";
        indexChart_UPCOM.series[2].update(
          indexChart_UPCOM.series[2].userOptions
        );

        indexChart_VN30.series[2].userOptions.color = "#0f0";
        indexChart_VN30.series[2].userOptions.negativeColor = "red";
        indexChart_VN30.series[2].update(indexChart_VN30.series[2].userOptions);
      } catch (error) {}
    } else {
      // color full
      settingUI.theme = "c";
      $("#model-css").remove();
      $("#model-js").remove();
      $("#basic-css").remove();
      $("#basic-js").remove();

      $(
        'head link[href="dist/css/model.css"], head link[href="dist/css/basic.css"], head script[src^="dist/js/pages/theme/"]'
      ).remove();
      fnAppendStyle("dist/css/colorFull.css");
      fnAppendScript("dist/js/pages/theme/colorFull.js");

      try {
        indexChart_HSX.series[2].userOptions.color = "#0f0";
        indexChart_HSX.series[2].userOptions.negativeColor = "red";
        indexChart_HSX.series[2].update(indexChart_HSX.series[2].userOptions);

        indexChart_HNX.series[2].userOptions.color = "#0f0";
        indexChart_HNX.series[2].userOptions.negativeColor = "red";
        indexChart_HNX.series[2].update(indexChart_HNX.series[2].userOptions);

        indexChart_UPCOM.series[2].userOptions.color = "#0f0";
        indexChart_UPCOM.series[2].userOptions.negativeColor = "red";
        indexChart_UPCOM.series[2].update(
          indexChart_UPCOM.series[2].userOptions
        );

        indexChart_VN30.series[2].userOptions.color = "#0f0";
        indexChart_VN30.series[2].userOptions.negativeColor = "red";
        indexChart_VN30.series[2].update(indexChart_VN30.series[2].userOptions);
      } catch (error) {}
    }
    $.ajaxSetup({ async: true });
    $.jStorage.set("SETTING_UI", settingUI);
    $(".preloader").toggle();
    return;

    if (location.href.toString().includes("#ThongKe")) {
      initListStock();
    } else if (location.href.toString().includes("#ThoaThuan")) {
      getdsthoathuan();
      initListStock();
    } else if (location.href.toString().includes("#PhaiSinh")) {
      objPage.loadPhaisinh();
      initListStock();
    } else {
      initListStock();
      loadIndexBox();
    }
  }
});

function loadDanhmucMacdinh() {
  console.log("load danh muc mac dinh");
  var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
  var html = "";
  var htmlDM = "";
  var sid = getCookie("JSESSION");
  var userId = getCookie("USER");

  if (sid !== null) {
    $.ajax({
      url: portfolioLink + "/watchlists/" + userId,
      method: "GET",
      headers: {
        session: sid,
      },
      success: function (response) {
        portfolioIds = [];
        if (response.data.length === 0) {
          $('.tab-left  a[href="#DanhSachTheoDoi"]').text(
            "Danh má»¥c theo dĂµi"
          );
        }

        response.data.forEach(function (item, index) {
          portfolioIds.push(item.Id);

          html +=
            '<span class="dropdown-item ' +
            (item.Id === currentPortfolioId ? "active" : "") +
            '" id="' +
            item.Id +
            '">' +
            '<a href="javascript:void(0)" onclick="handlePortfolioClick(\'' +
            item.Id +
            "', '" +
            item.Name +
            "')\">" +
            item.Name +
            "</a>" +
            '<input type="text" hidden="" value="' +
            item.Name +
            '" onblur="handleEditPortfolio(this, \'' +
            item.Id +
            "')\"/>" +
            "<span>" +
            '<button title="Sá»­a danh má»¥c" onclick="editPortfolio(\'' +
            item.Id +
            '\')"><i class="fa fa-pencil" aria-hidden="true"></i></button>' +
            '<button title="XĂ³a danh má»¥c" onclick="deletePortfolio(\'' +
            item.Id +
            '\')"><i class="fa fa-times" aria-hidden="true"></i></button>' +
            '<button title="Share danh má»¥c"><i class="fa fa-share" aria-hidden="true"></i></button>' +
            "</span>" +
            "</span>";
          htmlDM +=
            '<a class="dropdown-it" href="javascript:void(0)">' +
            item.Name +
            "</a>";

          if (item.Id === currentPortfolioId) {
            $('.tab-left  a[href="#DanhSachTheoDoi"]').text(item.Name);
            $('.tab-left  a[href="#DanhSachTheoDoi"]').addClass("active");
            currentPortfolio = item;
          }
        });

        $("#detail-modal .dropdown-menu").html(htmlDM);
        html +=
          '<span class="dropdown-item">\
							<input id="txt-dm" type="text" placeholder="' +
          getMessage("txtTaoDanhMuc") +
          '" onchange="handleTxtCreatePortfolio(this)">\
							<button title="ThĂªm má»›i danh má»¥c" onclick="createPortfolio()"><i class="fa fa-plus" aria-hidden="true"></i></button>\
						</span>';
        $("#dropdownDanhSachTheodoi").html(html);

        $("#menuVN30, #menuHNX30").click(fnHandleClickDanhMucItem);

        //loadPortfolioSymbol(currentPortfolioId);
      },
      error: function () {},
    });
  } else {
    dmck.forEach((el) => {
      if (el.name != "VN30" && el.name != "HNX30") {
        html +=
          '<span class="dropdown-item ' +
          (el.active == true ? "active" : "") +
          '">\
							<a href="javascript:void(0)">' +
          el.name +
          '</a>\
							<input class="txt-edit-dm" type="text" hidden="" />\
							<span>\
								<button class="btn-ed" title="Sá»­a danh má»¥c"><i class="fa fa-pencil" aria-hidden="true"></i></button>\
								<button class="btn-del" title="XĂ³a danh má»¥c"><i class="fa fa-times" aria-hidden="true"></i></button>\
								<button class="btn-share" title="Share danh má»¥c"><i class="fa fa-share" aria-hidden="true"></i></button>\
							</span>\
						</span>';
        htmlDM +=
          '<a class="dropdown-it" href="javascript:void(0)">' +
          el.name +
          "</a>";
        if (el.active) {
          $('.tab-left  a[href="#DanhSachTheoDoi"]').text(el.name);
          var lcS = location.href.toString();
          if (
            !lcS.includes("#PhaiSinh") &&
            !lcS.includes("#ThoaThuan") &&
            !lcS.includes("#ThongKe") &&
            !lcS.includes("#HOSE") &&
            !lcS.includes("#HNX") &&
            !lcS.includes("#UPCOM")
          ) {
            //$('#sortable-banggia').html('');
          }
        }
      }
    });

    $("#detail-modal .dropdown-menu").html(htmlDM);
    html +=
      '<span class="dropdown-item">\
					<input class="txt-add-dm" type="text" placeholder="' +
      getMessage("txtTaoDanhMuc") +
      '">\
					<button class="btn-add" title="ThĂªm má»›i danh má»¥c"><i class="fa fa-plus" aria-hidden="true"></i></button>\
				</span>';
    $("#dropdownDanhSachTheodoi").html(html);

    $("#detail-modal .dropdown-menu .dropdown-it").click(function () {
      console.log($(this).text());
      $("#btnGroupDrop1").text($(this).text());
    });

    $("#dropdownDanhSachTheodoi .dropdown-item a, #menuVN30, #menuHNX30").click(
      fnHandleClickDanhMucItem
    );

    $(".dropdown-content .btn-ed").click(function () {
      $(this)
        .parent()
        .parent()
        .children()
        .eq(1)
        .val($(this).parent().parent().children().eq(0).text())
        .removeAttr("hidden")
        .focus();
      $(this).parent().parent().children().eq(0).attr("hidden", "hidden");
    });

    $(".dropdown-content .btn-share").click(function () {
      var txtdanhmuc = $(this).parent().parent().children().eq(0).text();
      var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
      var abc = _.find(dmck, function (num) {
        return num.name == txtdanhmuc;
      });
      var url =
        "https://www.facebook.com/sharer/sharer.php?u=https%3A//banggia.vps.com.vn/%23ShareDanhMuc/" +
        abc.symbols.join("-");

      window.open(
        url,
        "",
        "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=500,width=600"
      );
    });

    $(".dropdown-content .btn-del").click(function () {
      var txtdanhmuc = $(this).parent().parent().children().eq(0).text();
      var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
      var abc = _.reject(dmck, function (num) {
        return num.name == txtdanhmuc;
      });
      if ($(this).parent().parent().hasClass("active")) {
        abc.forEach((element) => {
          element.active = true;
          return false;
        });
        $(this).parent().parent().remove();
        $(".dropdown-content .dropdown-item:first-child").addClass("active");
        $('.tab-left a[href="#DanhSachTheoDoi"]').text(
          $(".dropdown-content .dropdown-item:first-child")
            .children()
            .eq(0)
            .text()
        );
        $.jStorage.set("DANH-MUC-CHUNG-KHOAN", abc);
        if (
          !location.href.toString().includes("#DanhSachTheoDoi") ||
          !location.href.toString().includes("#")
        ) {
          location.href = "#DanhSachTheoDoi";
          $(".tab-left .tab a").removeClass("active");
          $(".tab-left .tab").removeClass("active");
          $('.tab-left a[href="#DanhSachTheoDoi"]').parent().addClass("active");
        } else {
          initListStock();
          socketConnect();
        }
      } else {
        $(this).parent().parent().remove();
        $.jStorage.set("DANH-MUC-CHUNG-KHOAN", abc);
      }
      // update fb client
      if (faceId != null && faceId != "undefined") {
        saveStateFace(
          faceId.id,
          abc,
          $.jStorage.get("COLUMN_SETTING_SHOW"),
          settingUI.addStockPosition
        );
      }

      if (abc.length === 2) {
        console.log(abc[0].name);
        $('.tab-left a[href="#DanhSachTheoDoi"]').text(abc[0].name);
      }
    });

    $(".dropdown-content .btn-add").click(function () {
      var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
      var newdm = $(this).parent().children().eq(0).val();
      if (newdm.trim() == "") {
        shownotification(
          "Warning",
          "TĂªn danh má»¥c khĂ´ng Ä‘Æ°á»£c Ä‘á»ƒ trá»‘ng",
          "warning"
        );
      } else {
        var dmfilter = _.find(dmck, function (o) {
          return o.name == newdm.trim();
        });

        if (dmfilter == null) {
          dmck.forEach((el) => {
            if (el.active) {
              el.active = false;
              // Ä‘Äƒng kĂ½ láº¡i room
              var msg =
                '{"action":"leave","list":"' + el.symbols.join(",") + '"}';
              socket.emit("regs", msg);
            }
          });
          var data = { name: newdm, symbols: [], active: true };
          dmck.push(data);
          $.jStorage.set("DANH-MUC-CHUNG-KHOAN", dmck);
          $('.tab-left a[href="#DanhSachTheoDoi"]').text(newdm);
          $(".dropdown-item").removeClass("active");
          loadDanhmucMacdinh();
          if (
            !location.href.toString().includes("#DanhSachTheoDoi") ||
            !location.href.toString().includes("#")
          ) {
            location.href = "#DanhSachTheoDoi";
            $(".tab-left .tab a").removeClass("active");
            $(".tab-left .tab").removeClass("active");
            $('.tab-left a[href="#DanhSachTheoDoi"]')
              .parent()
              .addClass("active");
          } else {
            initListStock();
            socketConnect();
          }
          // update fb client
          if (faceId != null && faceId != "undefined") {
            saveStateFace(
              faceId.id,
              dmck,
              $.jStorage.get("COLUMN_SETTING_SHOW"),
              settingUI.addStockPosition
            );
          }
        } else {
          shownotification(
            "Warning",
            "Danh má»¥c Ä‘Ă£ tá»“n táº¡i trong list",
            "warning"
          );
        }
      }
    });

    $(".dropdown-content .txt-edit-dm").blur(function () {
      var txtdm = $(this).val();
      var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
      if (txtdm.trim() == "") {
        $(this).attr("hidden", "hidden");
        $(this).parent().children().eq(0).removeAttr("hidden");
      } else {
        var oldname = $(this).parent().children().eq(0).text();
        dmck.forEach((el) => {
          if (el.name == oldname) {
            el.name = txtdm;
          }
          el.active && $('.tab-left  a[href="#DanhSachTheoDoi"]').text(el.name);
        });
        $.jStorage.set("DANH-MUC-CHUNG-KHOAN", dmck);
        $(this).attr("hidden", "hidden");
        $(this).parent().children().eq(0).removeAttr("hidden").text(txtdm);
        // update fb client
        if (faceId != null && faceId != "undefined") {
          saveStateFace(
            faceId.id,
            dmck,
            $.jStorage.get("COLUMN_SETTING_SHOW"),
            settingUI.addStockPosition
          );
        }
      }
    });

    $(".dropdown-content .txt-add-dm").keyup(function (e) {
      if (e.which == 13) {
        // enter
        var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
        var newdm = $(".dropdown-content .txt-add-dm").val();
        if (newdm.trim() == "") {
          shownotification(
            "Warning",
            "TĂªn danh má»¥c khĂ´ng Ä‘Æ°á»£c Ä‘á»ƒ trá»‘ng",
            "warning"
          );
        } else {
          var dmfilter = _.find(dmck, function (o) {
            return o.name == newdm.trim();
          });

          if (dmfilter == null) {
            dmck.forEach((el) => {
              if (el.active) {
                el.active = false;
                // Ä‘Äƒng kĂ½ láº¡i room
                var msg =
                  '{"action":"leave","list":"' + el.symbols.join(",") + '"}';
                socket.emit("regs", msg);
              }
            });
            var data = { name: newdm, symbols: [], active: true };
            dmck.push(data);
            $.jStorage.set("DANH-MUC-CHUNG-KHOAN", dmck);
            $('.tab-left a[href="#DanhSachTheoDoi"]').text(newdm);
            $(".dropdown-item").removeClass("active");
            loadDanhmucMacdinh();
            if (
              !location.href.toString().includes("#DanhSachTheoDoi") ||
              !location.href.toString().includes("#")
            ) {
              location.href = "#DanhSachTheoDoi";
              $(".tab-left .tab a").removeClass("active");
              $(".tab-left .tab").removeClass("active");
              $('.tab-left a[href="#DanhSachTheoDoi"]')
                .parent()
                .addClass("active");
            } else {
              initListStock();
              socketConnect();
            }
            // update fb client
            if (faceId != null && faceId != "undefined") {
              saveStateFace(
                faceId.id,
                dmck,
                $.jStorage.get("COLUMN_SETTING_SHOW"),
                settingUI.addStockPosition
              );
            }
          } else {
            shownotification(
              "Warning",
              "Danh má»¥c Ä‘Ă£ tá»“n táº¡i trong list",
              "warning"
            );
          }
        }
      }
    });
  }
}

function fnHandleClickDanhMucItem() {
  var abc = $(this).text();
  $(".dropdown-content .dropdown-item, .tab.active").removeClass("active");

  if (!$(this).hasClass("menuitem")) {
    $('.tab-left a[href="#DanhSachTheoDoi"]')
      .text(abc)
      .parent()
      .addClass("active");
  } else {
    //VN30, HNX30
    $(this).parent().addClass("active");
  }

  var dmVN30 = [];
  if (abc == "VN30" || abc == "HNX30") {
    $.ajaxSetup({ async: false });
    $.getJSON(
      getListCKIndex + abc,
      {},
      function (rData) {
        if (rData != null) {
          dmVN30 = rData;
        }
      },
      "jsonp"
    );
    $.ajaxSetup({ async: true });
  }

  var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
  dmck.forEach((element) => {
    // if(element.name == curact){
    element.active = false;
    var msg = '{"action":"leave","list":"' + element.symbols.join(",") + '"}';
    socket.emit("regs", msg);
    // }
    if (element.name == abc) {
      if (dmVN30.length > 0) {
        element.symbols = dmVN30;
      }
      element.active = true;
    }
  });

  $.jStorage.set("DANH-MUC-CHUNG-KHOAN", dmck);
  $("#sortable-banggia").html("");
  // loadDanhmucMacdinh();
  if (
    !location.href.toString().includes("#DanhSachTheoDoi") ||
    !location.href.toString().includes("#")
  ) {
    location.href = "#DanhSachTheoDoi";
  } else {
    initListStock();
    socketConnect();
  }
  // update fb client
  if (faceId != null && faceId != "undefined") {
    saveStateFace(
      faceId.id,
      dmck,
      $.jStorage.get("COLUMN_SETTING_SHOW"),
      settingUI.addStockPosition
    );
  }
  $(".txtMaCK").find("span").remove();
  $(".txttotal-volumn").find("span").remove();
}

function handlePortfolioClick(portfolioId, name) {
  $('.tab-left a[href="#DanhSachTheoDoi"]').text(name);
  $.jStorage.set("CURRENT_PORTFOLIO_ID", portfolioId);
  currentPortfolioId = portfolioId;

  $(".dropdown-content .dropdown-item").removeClass("active");
  $("#" + portfolioId).addClass("active");

  loadPortfolioSymbol(currentPortfolioId);
}

function handleTxtCreatePortfolio(target) {
  var name = target.value.trim();
  if (name === "") {
    shownotification(
      "Warning",
      "TĂªn danh má»¥c khĂ´ng Ä‘Æ°á»£c Ä‘á»ƒ trá»‘ng",
      "warning"
    );
    return;
  }
  createPortolio(name);
}

function createPortfolio() {
  var name = $("#txt-dm").val().trim();
  if (name === "") {
    shownotification(
      "Warning",
      "TĂªn danh má»¥c khĂ´ng Ä‘Æ°á»£c Ä‘á»ƒ trá»‘ng",
      "warning"
    );
    return;
  }
  createPortolio(name);
}

function createPortolio(name) {
  var sid = getCookie("JSESSION");
  var userId = getCookie("USER");

  $.ajax({
    url: portfolioLink + "/watchlists",
    method: "POST",
    headers: {
      session: sid,
    },
    data: {
      userId: userId,
      name: name,
      symbols: [],
    },
    success: function (response) {
      $.jStorage.set("CURRENT_PORTFOLIO_ID", response.data.Id);
      currentPortfolioId = response.data.Id;
      loadDanhmucMacdinh();
    },
    error: function (error) {},
  });
}

function editPortfolio(portfolioId) {
  $(".dropdown-item").each(function (index, item) {
    $(this).children().eq(0).removeAttr("hidden");
    $(this).children().eq(1).attr("hidden", "hidden");
  });

  $("#" + portfolioId)
    .children()
    .eq(0)
    .attr("hidden", "hidden");
  $("#" + portfolioId)
    .children()
    .eq(1)
    .removeAttr("hidden")
    .focus();
}

function handleEditPortfolio(target, portfolioId) {
  var name = target.value.trim();

  if (name === "") {
    shownotification(
      "Warning",
      "TĂªn danh má»¥c khĂ´ng Ä‘Æ°á»£c Ä‘á»ƒ trá»‘ng",
      "warning"
    );
    loadDanhmucMacdinh();
    return;
  }

  var sid = getCookie("JSESSION");
  var userId = getCookie("USER");

  $.ajax({
    url:
      portfolioLink + "/watchlists/" + userId + "/" + portfolioId + "/" + name,
    method: "PATCH",
    headers: {
      session: sid,
    },
    success: function (response) {
      loadDanhmucMacdinh();
    },
    error: function (error) {},
  });
}

function deletePortfolio(portfolioId) {
  var sid = getCookie("JSESSION");
  var userId = getCookie("USER");

  $.ajax({
    url: portfolioLink + "/watchlists/" + userId + "/" + portfolioId,
    method: "DELETE",
    headers: {
      session: sid,
    },
    success: function (response) {
      if (
        portfolioId === currentPortfolioId &&
        portfolioId === portfolioIds[0]
      ) {
        if (portfolioIds.length > 1) {
          currentPortfolioId = portfolioIds[1];
        }
      }
      if (
        portfolioId === currentPortfolioId &&
        portfolioId === portfolioIds[portfolioIds.length - 1]
      ) {
        currentPortfolioId = portfolioIds[0];
      }

      loadDanhmucMacdinh();
    },
    error: function (error) {},
  });
}

function loadPortfolioSymbol(portfolioId) {
  var sid = getCookie("JSESSION");
  var userId = getCookie("USER");
  if (sid == null) return false;

  $.ajax({
    url: portfolioLink + "/watchlists/" + userId + "/" + portfolioId,
    method: "GET",
    headers: {
      session: sid,
    },
    success: function (response) {
      if (
        !location.href.toString().includes("#DanhSachTheoDoi") ||
        !location.href.toString().includes("#")
      ) {
        location.href = "#DanhSachTheoDoi";
        $(".tab-left .tab a").removeClass("active");
        $(".tab-left .tab").removeClass("active");
        $('.tab-left a[href="#DanhSachTheoDoi"]').parent().addClass("active");
      }
      initListStockFromPortfolio(response.data.Symbols);
      socketConnectFromPortfolio(response.data.Symbols);
    },
    error: function (error) {},
  });
}

function addSymbolToPortfolio(symbol) {
  var sid = getCookie("JSESSION");
  var userId = getCookie("USER");

  $.ajax({
    url:
      portfolioLink +
      "/watchlists/" +
      userId +
      "/" +
      currentPortfolioId +
      "/symbols/" +
      symbol,
    method: "PATCH",
    headers: {
      session: sid,
    },
    success: function (response) {
      loadPortfolioSymbol(currentPortfolioId);
    },
    error: function (error) {},
  });
}

function deleteSymbolFromPortfolio(symbol) {
  var sid = getCookie("JSESSION");
  var userId = getCookie("USER");

  $.ajax({
    url:
      portfolioLink +
      "/watchlists/" +
      userId +
      "/" +
      currentPortfolioId +
      "/symbols/" +
      symbol,
    method: "DELETE",
    headers: {
      session: sid,
    },
    success: function (response) {
      loadPortfolioSymbol(currentPortfolioId);
    },
    error: function (error) {},
  });
}

function initListStockFromPortfolio(symbols) {
  $("#sortable-banggia").html("");
  vStockListSelected = symbols.join(",");
  $.getJSON(
    listStockDetailLink + vStockListSelected,
    {},
    function (rData) {
      if (rData != null) {
        rData.forEach((element) => {
          var html = processStock(element);
          $("#sortable-banggia").append(html);
          fnProcessAfterAppendHTML();
        });
        if (
          $("thead .changePc").css("display") != "none" &&
          $("thead .changeOt").css("display") != "none"
        ) {
          $("thead .changePc").toggle();
        } else if ($("thead .changeOt").css("display") == "none") {
          $("thead .changePc").toggle();
          $("thead .changeOt").toggle();
        }

        $("tbody .changePc").toggle();

        getListRsi(vStockListSelected);
        completeUI();
        initTooltipPrice();
        $(window).trigger("resize");

        tableSort();
      }
    },
    "jsonp"
  );
  // check list máº·c Ä‘á»‹nh cĂ³ mĂ£ chá»©ng khoĂ¡n phĂ¡i sinh hay ko
  var psList = [];
  if (
    vStockPs == null ||
    vStockPs == "undefined" ||
    typeof vStockPs === "undefined"
  ) {
    $.ajaxSetup({ async: false });
    $.getJSON(
      psListLink,
      function (zdata) {
        zdata.sort();
        vStockPs = zdata;
      },
      "jsonp"
    );
    $.ajaxSetup({ async: true });
  }
  vStockPs.forEach((element) => {
    var dt = _.find(symbols, function (o) {
      return o === element;
    });
    if (dt != "" && typeof dt !== "undefined") {
      psList.push(element);
    }
  });
  if (psList.length > 0) {
    $.getJSON(
      psDetailLink + psList.join(","),
      function (zdata) {
        psList.forEach((el) => {
          var data = _.filter(zdata, function (dt) {
            return dt.sym == el;
          });
          var dtHtml = processDataPsCatalog(data[0]);
          $("#sortable-banggia").append(dtHtml);
        });
        socketConnectPs(psList.join(","));
        $('[data-toggle="tooltip"]').tooltip();
      },
      "jsonp"
    );
  }
}

function socketConnectFromPortfolio(symbols) {
  var msg = '{"action":"join","list":"' + symbols.join(",") + '"}';
  socket.emit("regs", msg);

  socket.on("board", function (zdata) {
    sendQueue(zdata.data);
  });

  socket.on("index", function (zdata) {
    sendQueue(zdata.data);
  });

  socket.on("stock", function (zdata) {
    sendQueue(zdata.data);
    var dnow = new Date();
    sendQueueMktTime(zdata.data.timeServer + "ToT" + dnow.getTime());
  });
  socket.on("snews", function (zdata) {
    processNews(zdata.data);
  });

  socket.on("spt", function (zdata) {
    processTT(zdata.data);
  });
  initGlobalIndexSocket();
}

$(document).on("click", ".btn-capture", function () {
  html2canvas(jQuery("#detail-modal .tab-content .tab-panel.active")[0]).then(
    function (canvas) {
      myRenderFunction(canvas);
    }
  );
});

function myRenderFunction(canvas) {
  var stockcode =
    $("#detail-modal .modal-title").text().split("-")[0].trim() +
    "-" +
    $("#detail-modal .nav-tabs .nav-link.active span").text();
  var a = document.createElement("a");
  a.href = canvas
    .toDataURL("image/jpeg")
    .replace("image/jpeg", "image/octet-stream");
  a.download = stockcode + ".jpg";
  a.click();
}

/* GĂ³p Ă½ */
$(document).on("click", ".hide-panel-comment", function () {
  $(".panel-comment").toggle();
});

$(document).on("click", ".btn-comment", function () {
  $(".panel-comment").toggle();
  $(".btn-comment").tooltip("hide");

  if (faceId == null || faceId == "undefined") {
    var html =
      '<div class="form-group" style="text-align: center;"><label class="txtLoginToGopy">' +
      getMessage("txtLoginToGopy") +
      '</label><fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button></div>';
    $(".panel-comment .form-material").html(html);
  } else {
    var html =
      '<div class="form-group">\
                        <label class="txtTieuDe">' +
      getMessage("txtTieuDe") +
      '</label>\
                        <input type="text" class="form-control tieude" placeholder="' +
      getMessage("txtTieuDe") +
      '"> </div>\
                    <div class="form-group">\
                        <label class="txtNoiDung">' +
      getMessage("txtNoiDung") +
      '</label>\
                        <textarea class="form-control noidung" rows="5"></textarea>\
                    </div>\
                    <div class="form-group" style="display: flex; justify-content: center;">\
                        <button type="button" class="btn waves-effect waves-light btn-success btn-save-gopy txtBtnSendGoY">' +
      getMessage("txtBtnSendGoY") +
      "</button>\
                    </div>";
    $(".panel-comment .form-material").html(html);
    $(document).on("click", ".btn-save-gopy", function () {
      if ($(".panel-comment .tieude").val().trim() == "") {
        shownotification(
          "Warning",
          "Báº¡n pháº£i nháº­p tiĂªu Ä‘á»",
          "warning"
        );
        return false;
      }
      if ($(".panel-comment .noidung").val().trim() == "") {
        shownotification(
          "Warning",
          "Báº¡n pháº£i nháº­p ná»™i dung gĂ³p Ă½",
          "warning"
        );
        return false;
      }

      var titleFeedback = $(".panel-comment .tieude")
        .val()
        .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
      var descriptionFeedback = $(".panel-comment .noidung").val().trim();

      $.post(
        feedbackLink,
        {
          title: titleFeedback,
          description: descriptionFeedback,
          custname: faceId.name,
          stk: null,
          email: null,
          mobile: null,
          fileattack: null,
          fbid: faceId.id,
        },
        function (zdata) {
          console.log(zdata);
          if (zdata == "success") {
            shownotification(
              "Infomation",
              "GĂ³p Ă½ cá»§a báº¡n Ä‘Ă£ Ä‘Æ°á»£c gá»­i Ä‘áº¿n VPS. Cáº£m Æ¡n báº¡n Ä‘Ă£ Ä‘Ă³ng gĂ³p cho chĂºng tĂ´i.",
              "success"
            );
            $(".panel-comment").toggle();
          } else {
            shownotification(
              "Warning",
              "ÄĂ£ cĂ³ lá»—i xáº£y ra trong quĂ¡ trĂ¬nh gá»­i pháº£n há»“i gĂ³p Ă½. Vui lĂ²ng thá»­ láº¡i sau.",
              "warning"
            );
          }
        }
      );
      return false;
    });
  }
});

function saveStateFace(fb_id, portfolio, setting, addStockPosition) {
  console.log("save state setting to facebook");

  //var charts = settingUI.charts; //$.jStorage.get("CHART_SETTING_SHOW", ['VNIndex', 'HNXIndex', 'UPCOMIndex', 'VN30Index']);

  $.post(
    fbClientUpdateLink,
    {
      fb_id: fb_id,
      portfolio: JSON.stringify(portfolio),
      setting:
        JSON.stringify(setting) +
        addStockPosition +
        ":" +
        settingUI.lang +
        ":" +
        settingUI.charts.join("-"),
    },
    function (zdata) {
      console.log(zdata);
    }
  );
}

$(document).on("click", ".inner .fa", function () {
  if ($(this).hasClass("fa-angle-left")) {
    // left
    // var element = $('.info-box .inner .card:first-child').css("left");
    var leftFirst = "0";
    $(".inner .card").each(function (index) {
      if (index == 0) {
        try {
          leftFirst = $(this).css("left");
          // console.log(index, leftFirst);
        } catch (error) {
          console.log(index, error);
        }
        return false;
      }
    });
    if (leftFirst == "0" || StringToInt(leftFirst.slice(0, -2)) < 0) {
      $(".inner .card").each(function (index) {
        try {
          var lf = $(this).css("left");
          // console.log(lf);
          $(this).css("left", StringToInt(lf.slice(0, -2)) + 250 + "px");
        } catch (error) {
          $(this).css("left", "0px");
        }
      });
    }
  } else {
    // right
    var docWidth = $(document).width();
    var lastobj = $(".info-box .inner .card:last-child");
    var elementleft = lastobj.css("left");

    // console.log(StringToInt(element.slice(0, -2)) + 180 - docWidth);

    if (
      StringToInt(elementleft.slice(0, -2)) + lastobj.width() - docWidth >
      0
    ) {
      $(".inner .card").each(function (index) {
        // console.log(index);
        try {
          var lf = $(this).css("left");
          // console.log(lf);
          $(this).css("left", StringToInt(lf.slice(0, -2)) - 250 + "px");
        } catch (error) {
          $(this).css("left", "-300px");
        }
      });
    }
  }
});

function showChange() {
  $(".changeOt").toggle();
  $(".changePc").toggle();
}

function changeStockInfoModal(sym) {
  GStockData = [];
  G2StockData = [];
  G3StockData = [];
  G4StockData = [];
  G5StockData = [];
  G6StockData = [];

  GStockVolume = [];
  G2StockVolume = [];
  G3StockVolume = [];
  G4StockVolume = [];
  G5StockVolume = [];
  G6StockVolume = [];

  ceilPrice = StringToDouble($("#cel_" + sym).html());
  floorPrice = StringToDouble($("#flo_" + sym).html());
  refPrice = StringToDouble($("#ref_" + sym).html());
  openStock = sym;

  var aaa = _.find(modal.listIndex, function (dt) {
    return dt.stock_code == sym;
  });
  $("#detail-modal .modal-title").text(aaa.stock_code + " - " + aaa.name_vn);

  var sanCK =
    aaa.C == "1"
      ? "HSX"
      : aaa.C == "2"
      ? "HNX"
      : aaa.C == "3"
      ? "UPCOM"
      : "HSX";

  $("#detail-modal .san-ck").text(sanCK);

  app.loadTradingView("#chart-ptkt", sym.trim(), "&theme=Light");

  $("#detail-modal .nav-tabs .nav-link")
    .removeClass("active")
    .removeClass("show");
  $("#detail-modal .tab-content .tab-panel")
    .removeClass("active")
    .removeClass("show");

  $("#detail-modal .nav-tabs .nav-item:first-child .nav-link").addClass(
    "active show"
  );
  $("#detail-modal .tab-content .tab-panel:first-child").addClass(
    "active show"
  );
  $("#detail-modal .tab-content #detailFinancial .btn-def").removeClass(
    "active"
  );
  $('#detail-modal .tab-content button[ty="year"]').addClass("active");

  // $('#detail-modal').modal('show');
  loadTaiChinh(sym);
  loadNewsSym(sym);
  getLSDetail(sym, ceilPrice, floorPrice, refPrice);
  loadHistoryOrder(sym);
  loadPTKT(sym, 86400);
}

$(document).on("click", "#btnAddStockModal", function () {
  var stockCD = $("#detail-modal .modal-title").text().split("-")[0].trim();
  var dmckModal = $("#btnGroupDrop1").text().trim();

  if (dmckModal == "Danh má»¥c") {
    shownotification(
      "Warning",
      "HĂ£y chá»n 1 danh má»¥c Ä‘á»ƒ thĂªm",
      "warning"
    );
    return;
  }
  // console.log(stockCD, dmckModal);

  var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
  var idata = _.find(dmck, function (o) {
    return o.name == dmckModal;
  });

  var arrListStock = idata.symbols;
  var even = _.find(arrListStock, function (o) {
    return o == stockCD.toUpperCase();
  });

  if (typeof even !== "undefined" && even != "") {
    shownotification("Warning", getMessage("txtMaCKDaTonTai"), "warning");
    // if($('a[href="#DanhSachTheoDoi"]').hasClass('active'))
    // 	$(".container-fluid").animate({ scrollTop: $('#row_' + stockCD.toUpperCase()).offset().top }, 1000);
    // $('#txtAddStock').val('');
    return false;
  }
  if (settingUI.addStockPosition == "2") {
    arrListStock.unshift(stockCD.toUpperCase());
  } else {
    arrListStock.push(stockCD.toUpperCase());
  }
  //
  dmck.forEach((element) => {
    if (element.name == dmckModal) element.symbols = arrListStock;
  });
  $.jStorage.set("DANH-MUC-CHUNG-KHOAN", dmck);
  shownotification("Infomation", getMessage("txtThemMoiMaCKTC"), "success");

  // update fb client
  if (faceId != null && faceId != "undefined") {
    saveStateFace(
      faceId.id,
      dmck,
      $.jStorage.get("COLUMN_SETTING_SHOW"),
      settingUI.addStockPosition
    );
  }

  var dmActive = _.find(dmck, function (o) {
    return o.active == true;
  });

  if (
    dmActive.name == dmckModal &&
    $('a[href="#DanhSachTheoDoi"]').hasClass("active")
  ) {
    var msg = '{"action":"join","list":"' + stockCD + '"}';
    socket.emit("regs", msg);
    $.getJSON(
      listStockDetailLink + stockCD,
      {},
      function (rData) {
        if (rData != null) {
          rData.forEach((element) => {
            var html = processStock(element);
            if (settingUI.addStockPosition == "2") {
              $("#sortable-banggia").prepend(html);
            } else {
              $("#sortable-banggia").append(html);
            }
          });
          getListRsi(stockCD);
          completeUI();
          initTooltipPrice();
          if (
            ($("thead .changePc").css("display") != "none" &&
              $("thead .changeOt").css("display") != "none") ||
            $("thead .changePc").css("display") == "none"
          ) {
            $("#changePc_" + stockCD.toUpperCase()).css("display", "none");
          } else {
            $("#change_" + stockCD.toUpperCase()).css("display: none");
          }
          $(window).trigger("resize");
        }
      },
      "jsonp"
    );
  }
});

function hideTooltip() {
  $(".user_guide").tooltip("hide");
}

var maxTime = 75; // 75s
var startTimeCount = 0;

function startTime() {
  if (startTimeCount == 0) {
    getDifferenceTime(); // get realtime from server
    return true;
  }
  fnDisplayTimeStamp();
  if (startTimeCount == maxTime) {
    startTimeCount = 0;
  }
}

function fnDisplayTimeStamp() {
  var tim = new Date(serverTime + startTimeCount * 1000);
  var h = tim.getHours();
  var m = checkTime(tim.getMinutes());
  var s = checkTime(tim.getSeconds());

  $(".timeStamp").text(h + ":" + m + ":" + s);
  startTimeCount++;
}

function fnChangeLanguage(lang) {
  settingUI.lang = lang;
  $.jStorage.set("SETTING_UI", settingUI);
  $.getJSON("dist/js/pages/lang/" + lang + ".json", function (data) {
    objLang = data;
    allTxtLangCol = Object.keys(data);

    $('a[href="#PhaiSinh"]').text(getMessage("txtPhaisinh"));
    $('a[href="#ThoaThuan"]').text(getMessage("txtTTT"));
    $('a[href="#ThongKe"]').text(getMessage("txtThongKe"));
    $('a[href="#ODDLOT"]').text(getMessage("txtLoLe"));
    $('a[href="#CHUNGQUYEN"]').text(getMessage("txtChungQuyen"));
    $("#txtAddStock").attr("placeholder", getMessage("txtAddStock"));
    $(".tieude").attr("placeholder", getMessage("txtTieuDe"));
    $(".txtNhapMaChungKhoan").attr(
      "placeholder",
      getMessage("txtNhapMaChungKhoan")
    );
    $(".dropdown-item .txt-add-dm").attr(
      "placeholder",
      getMessage("txtTaoDanhMuc")
    );
    $("button#txtThemGopY").attr(
      "data-original-title",
      getMessage("txtThemGopY")
    );
    $("a.khunggiogiaodich")
      .attr("data-original-title", getMessage("txtKhungGioGiaoDich"))
      .attr("href", getMessage("txtURLKhungGioGiaoDich"));
    $("a#txtHuongDanSuDung").attr(
      "data-original-title",
      getMessage("txtHuongDanSuDung")
    );

    $("a.txtDieuKhoan").attr("href", getMessage("txtURLDieuKhoan"));
    $("a.txtBaoMat").attr("href", getMessage("txtURLBaoMat"));
    $("a.txtBangCongBoRuiRo").attr("href", getMessage("txtURLCongBoRuiRo"));

    allTxtLangCol.forEach((element) => {
      if (element == "txtMaCK" || element == "txttotal-volumn") {
        if ($("." + element).find("span").length !== 0) {
          // Ä‘ang cĂ³ sort
          var abc = $("." + element)
            .find("span")
            .clone();
          $("." + element)
            .text(getMessage(element))
            .append(abc);
        } else {
          $("." + element).text(getMessage(element));
        }
      } else if (element == "txtMua" || element == "txtBan") {
        $("." + element).val(getMessage(element));
      } else {
        $("." + element).text(getMessage(element));
      }
    });

    if (_.isObject(objLang["txtTooltip"])) {
      $.each(objLang["txtTooltip"], function (key, value) {
        $('[tooltip-text="' + key + '"]').attr("data-original-title", value);
      });
    }

    if ($(".panel-order").is(":visible")) {
      var selOrder = $("#sel-type-order").val();
      var account = $("#sel-account-order").val();
      var typeAcc = account.slice(-1);
      var html = "";
      if (typeAcc == "8") {
        // phĂ¡i sinh
        if (selOrder == "0") {
          // lá»‡nh thÆ°á»ng
          html += '<option value="">' + getMessage("txtAll") + "</option>";
          html += '<option value="1">' + getMessage("txtChoKhop") + "</option>";
          html += '<option value="2">' + getMessage("txtDaKhop") + "</option>";
        } else {
          // lá»‡nh Ä‘iá»u kiá»‡n
          html += '<option value="">' + getMessage("txtAll") + "</option>";
          html +=
            '<option value="2">' + getMessage("txtChoKichHoat") + "</option>";
          html +=
            '<option value="3">' + getMessage("txtDaKichHoat") + "</option>";
        }
      } else {
        // cÆ¡ sá»Ÿ
        if (selOrder == "0") {
          // lá»‡nh thÆ°á»ng
          html += '<option value="ALL">' + getMessage("txtAll") + "</option>";
          html +=
            '<option value="MATCH_PENDING">' +
            getMessage("txtChoKhop") +
            "</option>";
          html +=
            '<option value="MATCH_FULL">' +
            getMessage("txtDaKhop") +
            "</option>";
          html +=
            '<option value="MATCH_PARTIAL">' +
            getMessage("txtKhop1Phan") +
            "</option>";
          html +=
            '<option value="MATCH_PARTIAL_CANCELED">' +
            getMessage("txtKhop1PhanDaHuy") +
            "</option>";
          html +=
            '<option value="MATCH_CANCELED">' +
            getMessage("txtHuy") +
            "</option>";
        } else {
          // lá»‡nh Ä‘iá»u kiá»‡n
          html += "<option>" + getMessage("txtAll") + "</option>";
        }
      }
      document.getElementById("sel-status-order").innerHTML = html;

      var htmlTypeOrder =
        '<option value="0">' +
        getMessage("txtLenhThuong") +
        '</option><option value="1">' +
        getMessage("txtLenhDieuKien") +
        "</option>";
      document.getElementById("sel-type-order").innerHTML = htmlTypeOrder;

      if ($('a[href="#listOrder"]').hasClass("active")) {
        objOrder.getIndayOrder();
      }
    }

    $(".dropdown a, .dropdown-item a").each(function () {
      var html = $(this).html();
      if (html == "Danh má»¥c theo dĂµi" || html == "Tracklists") {
        $(this).html(getMessage("txtDanhMucTheoDoi"));
      }
    });
  });
}

$(document).ready(function () {
  $("#btn-select-lang").click(function () {
    settingUI.lang = !$(this).hasClass("active") ? "vi" : "en";
    $.jStorage.set("SETTING_UI", settingUI);
    fnChangeLanguage(settingUI.lang);

    // update fb client
    if (faceId != null && faceId != "undefined") {
      var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
      saveStateFace(
        faceId.id,
        dmck,
        $.jStorage.get("COLUMN_SETTING_SHOW"),
        settingUI.addStockPosition
      );
    }
  });
});

function loadIndexBox() {
  $(".mini-index").html("");
  $(".mini-bottom-index").html("");
  var htmlMini = "";
  $.getJSON(
    indexDetailLink,
    {},
    function (rData) {
      // console.log(rData);
      if (rData != null) {
        var totalGD = 0;
        var htmlIndex = "";
        $("#table-stock-index tbody").html("");
        rData.forEach((element) => {
          if (element != null) {
            if (element.mc == MARKET.HSX) {
              objOIndex.HSXOINDEX = element.oIndex;
              gdVNI = element.value;
            } else if (element.mc == MARKET.HNX) {
              objOIndex.HNXOINDEX = element.oIndex;
              gdHNX = element.value;
            } else if (element.mc == MARKET.UPCOM) {
              objOIndex.UPCOMOINDEX = element.oIndex;
            } else if (element.mc == MARKET.HSX30) {
              objOIndex.VN30OINDEX = element.oIndex;
            } else if (element.mc == MARKET.HNX30) {
              objOIndex.HSX30OINDEX = element.oIndex;
            }

            processIndex(element);
            //$('#table-stock-index tbody').append(htmlIndex);
            htmlMini += processMiniIndex(element);
            // console.log(objOIndex);
          }
        });
        $(".mini-index").html(htmlMini);
        $(".mini-bottom-index").html(htmlMini);
        $("#sum2MarketValue").html(
          Highcharts.numberFormat(
            (StringToInt(gdVNI) + StringToInt(gdHNX)) / 1000,
            0
          ) +
            ' <span class="txtTy">' +
            getMessage("txtTy") +
            "</span>"
        );
        // $('#table-stock-index tbody').html(htmlIndex);
      }
    },
    "jsonp"
  );
}

var app = {};
app.sendMessageToFrame = function (idFrame, msg) {
  var iframeEl = $(idFrame);
  if (iframeEl.length > 0) iframeEl[0].contentWindow.postMessage(msg, "*");
};

app.loadTradingView = function (obj, sym, opt) {
  var src = $(obj).attr("src");
  var strLogin = _.isEmpty(global.sid)
    ? ""
    : "&u=" + global.user + "&s=" + global.sid;
  var url_chart = chartURL + sym + strLogin + opt;
  if (
    src == "" ||
    (strLogin == "" && src.indexOf("&s=") >= 0) ||
    (strLogin != "" && src.indexOf("&s=") < 0)
  ) {
    $(obj).attr("src", url_chart);
  } else {
    var msg = { symbolChart: sym };
    app.sendMessageToFrame(obj, JSON.stringify(msg));
    console.info("msg", msg);
  }

  // Stop other tradingview
  $("iframe")
    .not($(obj))
    .each(function () {
      var ths = $(this);
      if (!ths.is(":visible") && ths.attr("src").indexOf(chartURL) > -1) {
        ths.attr("src", "");
      }
    });
};
