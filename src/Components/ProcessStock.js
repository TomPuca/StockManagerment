//lay thong tin gia ban dau URL: https://bgapidatafeed.vps.com.vn/getliststockdata/VGT,TCM,DXG
//processStock(element) - thuc hien update sock vao du lieu
//websocket neu co du lieu thuc hien sendQueue(zdata.data);
//processTP - thuc hien update khi co du lieu

function processTR(idata) {
  if (idata.symbol != null) {
    // console.log(idata);
    setCellTracking(
      "#forB_" + idata.symbol,
      idata.fBVol == 0 ? " " : FormatVolume10(idata.fBVol),
      "",
      1
    );
    setCellTracking(
      "#forS_" + idata.symbol,
      idata.fSVolume == 0 ? " " : FormatVolume10(idata.fSVolume),
      "",
      1
    );
    setCellTracking(
      "#forR_" + idata.symbol,
      idata.fRoom == 0 ? " " : FormatVolume10(idata.fRoom),
      "",
      1
    );
  }
}

function processTV(idata) {
  //42["board",{"data":{"id":3310,"sym":"VCG","BVolume":43820,"SVolume":28860,"Total":13770,"AvePrice":17.2,"APColor":"e"}}]
  var iB = FormatVolume10(idata.BVolume);
  var iS = FormatVolume10(idata.SVolume);
  // Buy volume 4
  if (iB != "0.00") setCellTracking("#bV4_" + idata.sym, iB, "", 1);
  // Sell volume 4
  if (iS != "0.00") setCellTracking("#oV4_" + idata.sym, iS, "", 1);
  // Total volume
  setCellTracking("#vol_" + idata.sym, FormatVolume10(idata.Total), "", 1);
  // avg
  setCellTracking("#avgP_" + idata.sym, idata.AvePrice, idata.APColor, 1);
}

function processTP(idata) {
  // 42["board",{"data":{"id":3210,"sym":"REE","side":"S","g1":"34.90|314|i","g2":"35.00|1|i","g3":"35.10|259|i","vol4":0}}]
  // console.log(idata);
  var check = 0;
  var oldPrice;
  var oldvolume;
  var g;
  var check = 1;

  if (idata.side == "B") {
    if (idata.g1 != null) {
      g = idata.g1.split("|");
      oldPrice = $("#bP1_" + idata.sym).html();
      oldvolume = $("#bV1_" + idata.sym).html();
      // check = trackingTP(oldPrice, g[0], oldvolume, g[1]);
      if (g[1] != "") {
        setCellTracking(
          "#bP1_" + idata.sym,
          g[0] == "ATC" || g[0] == "ATO" ? g[0] : g[0],
          g[2],
          trackingVal(oldPrice, g[0])
        );
        setCellTracking(
          "#bV1_" + idata.sym,
          FormatVolume10(g[1]),
          g[2],
          trackingVal(oldvolume, g[1])
        );
      }
    }

    if (idata.g2 != null) {
      g = idata.g2.split("|");
      oldPrice = $("#bP2_" + idata.sym).html();
      oldvolume = $("#bV2_" + idata.sym).html();
      // check = trackingTP(oldPrice, g[0], oldvolume, g[1]);
      setCellTracking(
        "#bP2_" + idata.sym,
        g[0],
        g[2],
        trackingVal(oldPrice, g[0])
      );
      setCellTracking(
        "#bV2_" + idata.sym,
        FormatVolume10(g[1]),
        g[2],
        trackingVal(oldvolume, g[1])
      );
    }

    if (idata.g3 != null) {
      g = idata.g3.split("|");
      oldPrice = $("#bP3_" + idata.sym).html();
      oldvolume = $("#bV3_" + idata.sym).html();
      // check = trackingTP(oldPrice, g[0], oldvolume, g[1]);
      setCellTracking(
        "#bP3_" + idata.sym,
        g[0],
        g[2],
        trackingVal(oldPrice, g[0])
      );
      setCellTracking(
        "#bV3_" + idata.sym,
        FormatVolume10(g[1]),
        g[2],
        trackingVal(oldvolume, g[1])
      );
    }
  } else {
    if (idata.g1 != null) {
      g = idata.g1.split("|");
      oldPrice = $("#oP1_" + idata.sym).html();
      oldvolume = $("#oV1_" + idata.sym).html();
      // check = trackingTP(oldPrice, g[0], oldvolume, g[1]);
      if (g[1] != "") {
        setCellTracking(
          "#oP1_" + idata.sym,
          g[0] == "ATC" || g[0] == "ATO" ? g[0] : g[0],
          g[2],
          trackingVal(oldPrice, g[0])
        );
        setCellTracking(
          "#oV1_" + idata.sym,
          FormatVolume10(g[1]),
          g[2],
          trackingVal(oldvolume, g[1])
        );
      }
    }

    if (idata.g2 != null) {
      g = idata.g2.split("|");
      oldPrice = $("#oP2_" + idata.sym).html();
      oldvolume = $("#oV2_" + idata.sym).html();
      // check = trackingTP(oldPrice, g[0], oldvolume, g[1]);
      setCellTracking(
        "#oP2_" + idata.sym,
        g[0],
        g[2],
        trackingVal(oldPrice, g[0])
      );
      setCellTracking(
        "#oV2_" + idata.sym,
        FormatVolume10(g[1]),
        g[2],
        trackingVal(oldvolume, g[1])
      );
    }

    if (idata.g3 != null) {
      g = idata.g3.split("|");
      oldPrice = $("#oP3_" + idata.sym).html();
      oldvolume = $("#oV3_" + idata.sym).html();
      // check = trackingTP(oldPrice, g[0], oldvolume, g[1]);
      setCellTracking(
        "#oP3_" + idata.sym,
        g[0],
        g[2],
        trackingVal(oldPrice, g[0])
      );
      setCellTracking(
        "#oV3_" + idata.sym,
        FormatVolume10(g[1]),
        g[2],
        trackingVal(oldvolume, g[1])
      );
    }
  }
}

processLS = function (idata) {
  //{"id":3220,"sym":"TCB","lastPrice":25.3,"lastVol":100,"cl":"i","change":"0.50","changePc":"2.02","totalVol":108810,"time":"10:49:56","hp":25.3,"ch":"i","lp":24.9,"lc":"i","ap":25.1,"ca":"i"}

  var space = 0;
  if (idata.sym.includes("VN30")) {
    space = 2;
  }
  space = 2;
  var cl = getColor(idata.cl);
  // change
  if (Highcharts.numberFormat(idata.change, space) != "0.00") {
    var direct = getIcon(idata.cl);
    $("#direct_" + idata.sym).html(direct);
    $("#change_" + idata.sym).text(
      Highcharts.numberFormat(Math.abs(idata.change), 2)
    );
    $("#changePc_" + idata.sym).text(
      Highcharts.numberFormat(Math.abs(idata.changePc), space) + "%"
    );
  } else {
    if (
      ($("thead .changePc").css("display") != "none" &&
        $("thead .changeOt").css("display") != "none") ||
      $("thead .changePc").css("display") == "none"
    ) {
      $("#per_" + idata.sym).html(
        '<span id="direct_' +
          idata.sym +
          '"></span>&nbsp;<span class="changeOt" id="change_' +
          idata.sym +
          '"></span><span class="changePc" style="display: none;" id="changePc_' +
          idata.sym +
          '"></span>'
      );
    } else {
      $("#per_" + idata.sym).html(
        '<span id="direct_' +
          idata.sym +
          '"></span>&nbsp;<span class="changeOt" style="display: none;" id="change_' +
          idata.sym +
          '"></span><span class="changePc" id="changePc_' +
          idata.sym +
          '"></span>'
      );
    }
  }
  $("#per_" + idata.sym).css({ color: cl });
  $("#per_" + idata.sym).attr("sort-color", idata.cl);
  $("#sym_" + idata.sym).css({ color: cl });
  $("#sym_" + idata.sym + " a").css({ color: cl });

  if ($("#other_" + idata.sym) != null) {
    // update lại phần khác cơ sở
    var vn30Index = $("#cIndex11").text();
    var otI =
      idata.lastPrice == "0" || idata.lastPrice == "" || vn30Index == ""
        ? 0
        : idata.lastPrice - vn30Index;
    $("#other_" + idata.sym)
      .html(Highcharts.numberFormat(otI, 2))
      .css({ color: getcolorOther(otI) });
  }

  // Gia khop cuoi cung
  var check = trackingLS(
    Highcharts.numberFormat(idata.lastPrice, space),
    $("#pri_" + idata.sym).html()
  );
  setCellTracking("#pri_" + idata.sym, idata.lastPrice, idata.cl, check);
  // last vol
  check = trackingLS(
    FormatVolume10(idata.lastVol),
    $("#lat_" + idata.sym).html()
  );
  setCellTracking(
    "#lat_" + idata.sym,
    FormatVolume10(idata.lastVol),
    idata.cl,
    check
  );

  // last vol phái sinh
  check = trackingLS(
    FormatVolume10(idata.lv),
    $("#lat_ps_" + idata.sym).html()
  );
  setCellTracking(
    "#lat_ps_" + idata.sym,
    FormatVolume10(idata.lv),
    idata.cl,
    check
  );

  // Tong khoi luong khop
  check = trackingLS(
    FormatVolume10(idata.totalVol),
    $("#vol_" + idata.sym).html()
  );
  setCellTracking(
    "#vol_" + idata.sym,
    FormatVolume10(idata.totalVol),
    "",
    check
  );
  try {
    // % avg

    check = trackingLS(
      Highcharts.numberFormat(idata.ap, space),
      $("#avgP_" + idata.sym).html()
    );
    setCellTracking("#avgP_" + idata.sym, idata.ap, idata.ca, check);
    // high
    check = trackingLS(
      Highcharts.numberFormat(idata.ap, space),
      $("#higP_" + idata.sym).html()
    );
    setCellTracking("#higP_" + idata.sym, idata.hp, idata.ch, check);
    // low
    check = trackingLS(
      Highcharts.numberFormat(idata.ap, space),
      $("#lowP_" + idata.sym).html()
    );
    setCellTracking("#lowP_" + idata.sym, idata.lp, idata.lc, check);
  } catch (error) {
    console.log("error: " + error);
  }

  //Add in history Order
  if (idata.sID != "null") {
    $("#historyOrder[symbol=" + idata.sym + "] tbody").prepend(
      "<tr><td>" +
        idata.time +
        '</td><td class="txt-right">' +
        FormatVolume10(idata.lastVol, 2) +
        '</td><td class="txt-right">' +
        Highcharts.numberFormat(idata.lastPrice, 2) +
        '</td><td class="txt-right" style="color: ' +
        getColor(idata.cl) +
        '">' +
        idata.change +
        "</td></tr>"
    );
  }
};

trackingLS = function (curVal, oldVal) {
  if (curVal > oldVal) {
    return 1;
  } else if (curVal < oldVal) {
    return 3;
  }
  return 2;
};

setCellTracking = function (cellID, nValue, cl, check) {
  if (nValue != null && nValue != "undefined") {
    var cell = $(cellID);
    var setHl = 1;
    var clHi;
    if (check == 1) {
      clHi = "clLime";
    } else if (check == 2) {
      clHi = "clTC";
    } else {
      clHi = "clRed";
    }

    if (cell) {
      var pValue = cell.html();
      // console.log(cellID, pValue, nValue);
      if (pValue != nValue) {
        if (nValue == "0" || nValue == "0.0" || nValue == "0.00") {
          if (pValue == "" || pValue == "&nbsp;" || pValue == "-") {
            setHl = 0;
          } else {
            if (cell.html.length > 0) {
              cell.html("-");
            }
          }
        } else {
          //setTimeout(function () {
          if (
            (cellID.includes("oP") ||
              cellID.includes("bP") ||
              cellID.includes("higP") ||
              cellID.includes("lowP")) &&
            nValue != "ATO" &&
            nValue != "ATC"
          ) {
            cell.html(Highcharts.numberFormat(nValue, 2));
          } else {
            cell.html(nValue);
          }
          //}, 500);
        }
        if (setHl == 1) {
          var sCl = getColor(cl);

          cell.css({ color: "black" });
          cell.addClass(clHi);
          setTimeout(function () {
            cell.removeClass(clHi);
            cell.css({ color: sCl });
          }, 1000);
        }
      } else {
        var n = cellID.indexOf("lat");
        if (n > 0) {
          cell.html(nValue);
          // neu la cot lat thi van update
          var sCl = getColor(cl);
          cell.css({ color: "black" });
          cell.addClass(clHi);

          setTimeout(function () {
            cell.removeClass(clHi);
            cell.css({ color: sCl });
          }, 1000);
        }
      }
    }
  }
};

trackingTP = function (oldPrice, newPrice, oldVolume, newVolume) {
  var oVolume = parseInt(oldVolume);
  var nVolume = parseInt(newVolume);

  if (oldPrice == newPrice) {
    if (oVolume == nVolume) {
      return 0;
    } else if (nVolume > oVolume) {
      return 1;
    } else {
      return 2;
    }
  } else {
    return 0;
  }
};

trackingVal = function (oldVal, newVal) {
  var oVal = parseInt(oldVal);

  if (oVal == newVal) {
    return 2;
  } else if (newVal > oVal) {
    return 1;
  } else {
    return 0;
  }
};

function processStock(idata) {
  // console.log(idata);
  var html = '<tr id="row_' + idata.sym + '">';

  var getClass = getClassSymbol(
    idata.lastPrice,
    idata.r,
    idata.r,
    idata.c,
    idata.f
  );

  //var hq = (StringToDouble((StringToDouble(idata.c) + StringToDouble(idata.f)) / 2).toFixed(2) == StringToDouble(idata.r)) ? '' : '*';

  var hq = "";

  // console.log(idata.sym, idata.c, idata.f, idata.r, StringToDouble((StringToDouble(idata.c) + StringToDouble(idata.f)) / 2).toFixed(2), (StringToDouble((StringToDouble(idata.c) + StringToDouble(idata.f)) / 2).toFixed(2) == StringToDouble(idata.r)))

  // symbol
  // <span class="txt-content"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
  idata.sBenefit = _.isUndefined(idata.sBenefit)
    ? ""
    : (idata.sBenefit + "").trim();
  var coQuyen =
    _.isEmpty(idata.sBenefit) || idata.sBenefit == "0" || idata.sType == "W"
      ? ""
      : "<span style='color:white;'>*</span>";

  html +=
    '<td class="col-symbol" id="sym_' +
    idata.sym +
    '"><a href="javascript: void(0);" onclick="showChart(\'' +
    idata.sym +
    '\')" class="p-l-5 txt-head ' +
    getClass +
    '">' +
    idata.sym +
    hq +
    coQuyen +
    '</a><span class="txt-red right del-row"><i class="fa fa-times" aria-hidden="true"></i></span></td>';
  // html += '<td class="' + getClass + ' col-symbol" id="sym_'+idata.sym+'"><span class="txt-content"><i class="fa fa-angle-right" aria-hidden="true"></i></span><span class="p-l-5 txt-head">' + idata.sym + '</span><span class="txt-red right del-row"><i class="fa fa-times" aria-hidden="true"></i></span></td>'
  // gía tham chiếu
  html +=
    '<td class="txt-gia-tc txt-right col-price cell-highlight" id="ref_' +
    idata.sym +
    '">' +
    idata.r +
    "</td>";
  // giá trần
  html +=
    '<td class="txt-gia-tran txt-right col-price cell-highlight" id="cel_' +
    idata.sym +
    '">' +
    idata.c +
    "</td>";
  // giá sàn
  html +=
    '<td class="txt-gia-san txt-right col-price cell-highlight" id="flo_' +
    idata.sym +
    '">' +
    idata.f +
    "</td>";
  // bên mua
  var mua3 = idata.g3.split("|");
  if (mua3[0] == "0" || mua3[0] == "0.00" || mua3[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP3_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="bV3_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      mua3[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP3_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(mua3[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      mua3[2] +
      ' txt-right col-vol" id="bV3_' +
      idata.sym +
      '">' +
      FormatVolume10(mua3[1], 2) +
      "</td>";
  }
  var mua2 = idata.g2.split("|");
  if (mua2[0] == "0" || mua2[0] == "0.00" || mua2[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP2_' +
      idata.sym +
      '" ></td>';
    html +=
      '<td class="txt-right col-vol" return false;" id="bV2_' +
      idata.sym +
      '"></td>';
  } else {
    html +=
      '<td class="' +
      mua2[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP2_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(mua2[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      mua2[2] +
      ' txt-right col-vol" id="bV2_' +
      idata.sym +
      '">' +
      FormatVolume10(mua2[1], 2) +
      "</td>";
  }

  var mua1 = idata.g1.split("|");
  if (mua1[0] == "0" || mua1[0] == "0.00" || mua1[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP1_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="bV1_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      mua1[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP1_' +
      idata.sym +
      '" >' +
      (mua1[0] == "ATO" || mua1[0] == "ATC"
        ? mua1[0]
        : Highcharts.numberFormat(mua1[0], 2)) +
      "</td>";
    html +=
      '<td class="' +
      mua1[2] +
      ' txt-right col-vol" id="bV1_' +
      idata.sym +
      '">' +
      FormatVolume10(mua1[1], 2) +
      "</td>";
  }
  // khớp
  if (
    idata.lastPrice == "0" ||
    idata.lastPrice == "0.00" ||
    idata.lastPrice == "0.0"
  ) {
    html +=
      '<td class="txt-right col-price cell-highlight" ondblclick="dblClickOrderStock(this); return false;" id="pri_' +
      idata.sym +
      '" ></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-price cell-highlight" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="pri_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(idata.lastPrice, 2) +
      "</td>";
  }
  if (idata.lastVolume == "0" || idata.lastVolume == "") {
    html +=
      '<td class="txt-right col-vol cell-highlight" id="lat_' +
      idata.sym +
      '"></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-vol cell-highlight" id="lat_' +
      idata.sym +
      '">' +
      FormatVolume10(idata.lastVolume, 2) +
      "</td>";
  }
  if (idata.ot == "0" || idata.ot == "0.00" || idata.ot == "0.0") {
    html +=
      '<td class="txt-center col-diff cell-highlight" id="per_' +
      idata.sym +
      '" sort-color="' +
      getClass +
      '"><span id="direct_' +
      idata.sym +
      '"></span>&nbsp;<span class="changeOt" id="change_' +
      idata.sym +
      '"></span><span class="changePc" id="changePc_' +
      idata.sym +
      '"></span></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-center col-diff cell-highlight" id="per_' +
      idata.sym +
      '" sort-color="' +
      getClass +
      '"><span id="direct_' +
      idata.sym +
      '">' +
      getIconIndex(idata.lastPrice, idata.r) +
      '</i></span>&nbsp;<span class="changeOt" id="change_' +
      idata.sym +
      '">' +
      idata.ot +
      '</span><span class="changePc" id="changePc_' +
      idata.sym +
      '">' +
      idata.changePc +
      "%" +
      "</span></td>";
  }
  // bên bán
  var ban1 = idata.g4.split("|");
  if (ban1[0] == "0" || ban1[0] == "0.00" || ban1[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP1_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="oV1_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban1[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP1_' +
      idata.sym +
      '" >' +
      (ban1[0] == "ATO" || ban1[0] == "ATC"
        ? ban1[0]
        : Highcharts.numberFormat(ban1[0], 2)) +
      "</td>";
    html +=
      '<td class="' +
      ban1[2] +
      ' txt-right col-vol" id="oV1_' +
      idata.sym +
      '">' +
      FormatVolume10(ban1[1], 2) +
      "</td>";
  }
  var ban2 = idata.g5.split("|");
  if (ban2[0] == "0" || ban2[0] == "0.00" || ban2[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP2_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="oV2_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban2[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP2_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(ban2[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      ban2[2] +
      ' txt-right col-vol" id="oV2_' +
      idata.sym +
      '">' +
      FormatVolume10(ban2[1], 2) +
      "</td>";
  }
  var ban3 = idata.g6.split("|");
  if (ban3[0] == "0" || ban3[0] == "0.00" || ban3[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP3_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="oV3_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban3[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP3_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(ban3[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      ban3[2] +
      ' txt-right col-vol" id="oV3_' +
      idata.sym +
      '">' +
      FormatVolume10(ban3[1], 2) +
      "</td>";
  }
  // dư mua, dư bán
  var dumuaban = idata.g7.split("|");
  // dynamic
  var column_show = $.jStorage.get("COLUMN_SETTING_SHOW", [
    "total-volumn",
    "dumua",
    "duban",
    "ave",
    "hight",
    "low",
    "quote",
  ]);
  column_show.forEach((element) => {
    switch (element) {
      case "total-volumn":
        // tổng KL
        if (idata.lot == "0" || idata.lot == "") {
          html +=
            '<td class="txt-content txt-right col-vol" id="vol_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="txt-content txt-right col-vol" id="vol_' +
            idata.sym +
            '">' +
            FormatVolume10(idata.lot, 2) +
            "</td>";
        }
        break;
      case "dumua":
        if (dumuaban[0] == "0" || dumuaban[0] == "") {
          html +=
            '<td class="txt-content txt-dumuaban txt-right col-vol" id="bV4_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="txt-content txt-dumuaban txt-right col-vol" id="bV4_' +
            idata.sym +
            '">' +
            FormatVolume10(dumuaban[0], 2) +
            "</td>";
        }
        break;
      case "duban":
        if (dumuaban[1] == "0" || dumuaban[1] == "") {
          html +=
            '<td class="txt-content txt-dumuaban txt-right col-vol" id="oV4_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="txt-content txt-dumuaban txt-right col-vol" id="oV4_' +
            idata.sym +
            '">' +
            FormatVolume10(dumuaban[1], 2) +
            "</td>";
        }
        break;
      case "ave":
        // trung bình
        if (idata.avePrice == "0" || idata.avePrice == "0.00") {
          html +=
            '<td class="txt-right col-price cell-highlight" id="avgP_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="' +
            getClassSymbol(idata.avePrice, idata.r, idata.r, idata.c, idata.f) +
            ' txt-right col-price cell-highlight" id="avgP_' +
            idata.sym +
            '">' +
            Highcharts.numberFormat(idata.avePrice, 2) +
            "</td>";
        }
        break;
      case "hight":
        // cao
        if (idata.highPrice == "0" || idata.highPrice == "0.00") {
          html +=
            '<td class="txt-right col-price cell-highlight" id="higP_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="' +
            getClassSymbol(
              idata.highPrice,
              idata.r,
              idata.r,
              idata.c,
              idata.f
            ) +
            ' txt-right col-price cell-highlight" id="higP_' +
            idata.sym +
            '">' +
            Highcharts.numberFormat(idata.highPrice, 2) +
            "</td>";
        }
        break;
      case "low":
        // thấp
        if (idata.lowPrice == "0" || idata.lowPrice == "0.00") {
          html +=
            '<td class="txt-right col-price cell-highlight" id="lowP_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="' +
            getClassSymbol(idata.lowPrice, idata.r, idata.r, idata.c, idata.f) +
            ' txt-right col-price cell-highlight" id="lowP_' +
            idata.sym +
            '">' +
            Highcharts.numberFormat(idata.lowPrice, 2) +
            "</td>";
        }
        break;
      case "quote":
        // NN mua
        if (idata.fBVol == "0" || idata.fBVol == "") {
          html +=
            '<td class="txt-content txt-right col-vol" id="forB_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="txt-content txt-right col-vol" id="forB_' +
            idata.sym +
            '">' +
            FormatVolume10(idata.fBVol, 2) +
            "</td>";
        }
        // NN bán
        if (idata.fSVolume == "0" || idata.fSVolume == "") {
          html +=
            '<td class="txt-content txt-right col-vol" id="forS_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="txt-content txt-right col-vol" id="forS_' +
            idata.sym +
            '">' +
            FormatVolume10(idata.fSVolume, 2) +
            "</td>";
        }
        break;
      case "froom":
        // foreign room
        if (idata.fRoom == "0" || idata.fRoom == "0.00") {
          html +=
            '<td class="txt-content txt-right col-froom" id="froom_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="txt-content txt-right col-froom" id="froom_' +
            idata.sym +
            '">' +
            Highcharts.numberFormat(idata.fRoom, 0) +
            "</td>";
        }
        break;
      case "rsi":
        html +=
          '<td class="col-vol txt-center txt-content" id="rsi_' +
          idata.sym +
          '"></td>';
        break;
      case "macd":
        html +=
          '<td class="col-vol txt-center txt-content" id="macd_' +
          idata.sym +
          '"></td>';
        break;
      default:
        break;
    }
  });

  html += "</tr>";

  return html;
}

function processOddLotStock(idata) {
  // console.log(idata);
  var html = '<tr id="row_' + idata.sym + '">';

  var getClass = getClassSymbol(
    idata.lastPrice,
    idata.r,
    idata.r,
    idata.c,
    idata.f
  );

  // symbol
  // <span class="txt-content"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
  html +=
    '<td class="col-symbol" id="sym_' +
    idata.sym +
    '"><a href="javascript: void(0);" onclick="showChart(\'' +
    idata.sym +
    '\')" class="p-l-5 txt-head ' +
    getClass +
    '">' +
    idata.sym +
    '</a><span class="txt-red right del-row"><i class="fa fa-times" aria-hidden="true"></i></span></td>';
  // html += '<td class="' + getClass + ' col-symbol" id="sym_'+idata.sym+'"><span class="txt-content"><i class="fa fa-angle-right" aria-hidden="true"></i></span><span class="p-l-5 txt-head">' + idata.sym + '</span><span class="txt-red right del-row"><i class="fa fa-times" aria-hidden="true"></i></span></td>'
  // gía tham chiếu
  html +=
    '<td class="txt-gia-tc txt-right col-price cell-highlight" id="ref_' +
    idata.sym +
    '">' +
    idata.r +
    "</td>";
  // giá trần
  html +=
    '<td class="txt-gia-tran txt-right col-price cell-highlight" id="cel_' +
    idata.sym +
    '">' +
    idata.c +
    "</td>";
  // giá sàn
  html +=
    '<td class="txt-gia-san txt-right col-price cell-highlight" id="flo_' +
    idata.sym +
    '">' +
    idata.f +
    "</td>";
  // bên mua
  if (idata.bv3 == "0" || idata.bv3 == "0.00" || idata.bv3 == "0.0") {
    html += '<td class="txt-right col-price" id="bP3_' + idata.sym + '" ></td>';
    html += '<td class="txt-right col-vol" id="bV3_' + idata.sym + '"></td>';
  } else {
    getClass = getClassSymbol(idata.bp3, idata.r, idata.r, idata.c, idata.f);
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-price" id="bP3_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(idata.bp3, 2) +
      "</td>";
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-vol" id="bV3_' +
      idata.sym +
      '">' +
      FormatVolume10(idata.bv3, 2) +
      "</td>";
  }
  if (idata.bv2 == "0" || idata.bv2 == "0.00" || idata.bv2 == "0.0") {
    html += '<td class="txt-right col-price" id="bP2_' + idata.sym + '" ></td>';
    html += '<td class="txt-right col-vol" id="bV2_' + idata.sym + '"></td>';
  } else {
    getClass = getClassSymbol(idata.bp2, idata.r, idata.r, idata.c, idata.f);
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-price" id="bP2_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(idata.bp2, 2) +
      "</td>";
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-vol" id="bV2_' +
      idata.sym +
      '">' +
      FormatVolume10(idata.bv2, 2) +
      "</td>";
  }
  if (idata.bv1 == "0" || idata.bv1 == "0.00" || idata.bv1 == "0.0") {
    html += '<td class="txt-right col-price" id="bP1_' + idata.sym + '" ></td>';
    html += '<td class="txt-right col-vol" id="bV1_' + idata.sym + '"></td>';
  } else {
    getClass = getClassSymbol(idata.bp1, idata.r, idata.r, idata.c, idata.f);
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-price" id="bP1_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(idata.bp1, 2) +
      "</td>";
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-vol" id="bV1_' +
      idata.sym +
      '">' +
      FormatVolume10(idata.bv1, 2) +
      "</td>";
  }
  // khớp
  if (
    idata.lastPrice == "0" ||
    idata.lastPrice == "0.00" ||
    idata.lastPrice == "0.0"
  ) {
    html +=
      '<td class="txt-right col-price cell-highlight" id="pri_' +
      idata.sym +
      '" ></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-price cell-highlight" id="pri_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(idata.lastPrice, 2) +
      "</td>";
  }
  if (idata.lastVolume == "0" || idata.lastVolume == "") {
    html +=
      '<td class="txt-right col-vol cell-highlight" id="lat_' +
      idata.sym +
      '"></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-vol cell-highlight" id="lat_' +
      idata.sym +
      '">' +
      FormatVolume10(idata.lastVolume, 2) +
      "</td>";
  }
  var ot =
    idata.lastPrice == "" || idata.lastPrice == "0" || idata.lastPrice == "0.00"
      ? 0
      : (idata.lastPrice - idata.r).toFixed(2);
  getClass = getClassSymbol(
    idata.lastPrice,
    idata.r,
    idata.r,
    idata.c,
    idata.f
  );
  if (ot == "0" || ot == "0.00" || ot == "0.0") {
    html +=
      '<td class="txt-center col-diff cell-highlight" id="per_' +
      idata.sym +
      '" sort-color="' +
      getClass +
      '"><span id="direct_' +
      idata.sym +
      '"></span>&nbsp;<span class="changeOt" id="change_' +
      idata.sym +
      '"></span><span class="changePc" id="changePc_' +
      idata.sym +
      '"></span></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-center col-diff cell-highlight" id="per_' +
      idata.sym +
      '" sort-color="' +
      getClass +
      '"><span id="direct_' +
      idata.sym +
      '">' +
      getIconIndex(idata.lastPrice, idata.r) +
      '</i></span>&nbsp;<span class="changeOt" id="change_' +
      idata.sym +
      '">' +
      ot +
      '</span><span class="changePc" id="changePc_' +
      idata.sym +
      '">-</span></td>';
  }
  // bên bán
  if (idata.sv1 == "0" || idata.sv1 == "0.00" || idata.sv1 == "0.0") {
    html += '<td class="txt-right col-price" id="oP1_' + idata.sym + '" ></td>';
    html += '<td class="txt-right col-vol" id="oV1_' + idata.sym + '"></td>';
  } else {
    getClass = getClassSymbol(idata.sp1, idata.r, idata.r, idata.c, idata.f);
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-price" id="oP1_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(idata.sp1, 2) +
      "</td>";
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-vol" id="oV1_' +
      idata.sym +
      '">' +
      FormatVolume10(idata.sv1, 2) +
      "</td>";
  }
  if (idata.sv2 == "0" || idata.sv2 == "0.00" || idata.sv2 == "0.0") {
    html += '<td class="txt-right col-price" id="oP2_' + idata.sym + '" ></td>';
    html += '<td class="txt-right col-vol" id="oV2_' + idata.sym + '"></td>';
  } else {
    getClass = getClassSymbol(idata.sp2, idata.r, idata.r, idata.c, idata.f);
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-price" id="oP2_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(idata.sp2, 2) +
      "</td>";
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-vol" id="oV2_' +
      idata.sym +
      '">' +
      FormatVolume10(idata.sv2, 2) +
      "</td>";
  }
  if (idata.sv3 == "0" || idata.sv3 == "0.00" || idata.sv3 == "0.0") {
    html += '<td class="txt-right col-price" id="oP3_' + idata.sym + '" ></td>';
    html += '<td class="txt-right col-vol" id="oV3_' + idata.sym + '"></td>';
  } else {
    getClass = getClassSymbol(idata.sp3, idata.r, idata.r, idata.c, idata.f);
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-price" id="oP3_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(idata.sp3, 2) +
      "</td>";
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-vol" id="oV3_' +
      idata.sym +
      '">' +
      FormatVolume10(idata.sv3, 2) +
      "</td>";
  }
  html += "</tr>";

  return html;
}

// Khởi tạo bảng giá phái sinh từ snapshot api
function initPsBoard(idata) {
  var html = '<tr id="row_' + idata.sym + '">';

  var getClass = getClassSymbol(
    idata.lastPrice,
    idata.r,
    idata.r,
    idata.c,
    idata.f
  );
  // symbol
  html +=
    '<td id="sym_' +
    idata.sym +
    '"><a href="javascript: void(0);" data-toggle="tooltip" data-placement="top" title="' +
    getMessage("txtNgayDaoHan") +
    ": " +
    idata.matureDate +
    '" class="p-l-5 txt-head ' +
    getClass +
    '">' +
    idata.sym +
    '</a><span class="txt-red right del-row"><i class="fa fa-times" aria-hidden="true"></i></span></td>';
  // gía tham chiếu
  if (idata.sym.includes("VN30")) {
    html +=
      '<td class="txt-gia-tc txt-right cell-highlight" id="ref_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(idata.r, 2) +
      "</td>";
    // giá trần
    html +=
      '<td class="txt-gia-tran txt-right cell-highlight" id="cel_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(idata.c, 2) +
      "</td>";
    // giá sàn
    html +=
      '<td class="txt-gia-san txt-right cell-highlight" id="flo_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(idata.f, 2) +
      "</td>";
  } else {
    html +=
      '<td class="txt-gia-tc txt-right cell-highlight" id="ref_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(idata.r, 0) +
      "</td>";
    // giá trần
    html +=
      '<td class="txt-gia-tran txt-right cell-highlight" id="cel_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(idata.c, 0) +
      "</td>";
    // giá sàn
    html +=
      '<td class="txt-gia-san txt-right cell-highlight" id="flo_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(idata.f, 0) +
      "</td>";
  }

  // bên mua
  var mua3 = idata.g3.split("|");
  if (
    mua3[0] == "0" ||
    mua3[0] == "0.00" ||
    mua3[0] == "0.0" ||
    mua3[0] == ""
  ) {
    html +=
      '<td class="txt-right" ondblclick="dblClickOrderStock(this); return false;" id="bP3_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right" id="bV3_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      mua3[2] +
      ' txt-right" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP3_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(mua3[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      mua3[2] +
      ' txt-right" id="bV3_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(mua3[1], 0) +
      "</td>";
  }
  var mua2 = idata.g2.split("|");
  if (
    mua2[0] == "0" ||
    mua2[0] == "0.00" ||
    mua2[0] == "0.0" ||
    mua2[0] == ""
  ) {
    html +=
      '<td class="txt-right" ondblclick="dblClickOrderStock(this); return false;" id="bP2_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right" id="bV2_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      mua2[2] +
      ' txt-right" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP2_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(mua2[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      mua2[2] +
      ' txt-right" id="bV2_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(mua2[1], 0) +
      "</td>";
  }

  var mua1 = idata.g1.split("|");
  if (
    mua1[0] == "0" ||
    mua1[0] == "0.00" ||
    mua1[0] == "0.0" ||
    mua1[0] == ""
  ) {
    html +=
      '<td class="txt-right" ondblclick="dblClickOrderStock(this); return false;" id="bP1_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right" id="bV1_' + idata.sym + '"></td>';
  } else {
    if (idata.sym.includes("VN30")) {
      html +=
        '<td class="' +
        mua1[2] +
        ' txt-right" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
        getMessage("txtDoubleClickDatLenh") +
        '" id="bP1_' +
        idata.sym +
        '" >' +
        (mua1[0] == "ATO" || mua1[0] == "ATC"
          ? mua1[0]
          : Highcharts.numberFormat(mua1[0], 2)) +
        "</td>";
    } else {
      html +=
        '<td class="' +
        mua1[2] +
        ' txt-right" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
        getMessage("txtDoubleClickDatLenh") +
        '" id="bP1_' +
        idata.sym +
        '" >' +
        (mua1[0] == "ATO" || mua1[0] == "ATC"
          ? mua1[0]
          : Highcharts.numberFormat(mua1[0], 0)) +
        "</td>";
    }
    html +=
      '<td class="' +
      mua1[2] +
      ' txt-right" id="bV1_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(mua1[1], 0) +
      "</td>";
  }

  // khớp
  if (
    idata.lastPrice == "0" ||
    idata.lastPrice == "0.00" ||
    idata.lastPrice == "0.0"
  ) {
    html +=
      '<td class="txt-right cell-highlight" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="pri_' +
      idata.sym +
      '" ></td>';
  } else {
    if (idata.sym.includes("VN30")) {
      html +=
        '<td class="' +
        getClass +
        ' txt-right cell-highlight" id="pri_' +
        idata.sym +
        '" >' +
        Highcharts.numberFormat(idata.lastPrice, 2) +
        "</td>";
    } else {
      html +=
        '<td class="' +
        getClass +
        ' txt-right cell-highlight" id="pri_' +
        idata.sym +
        '" >' +
        Highcharts.numberFormat(idata.lastPrice, 0) +
        "</td>";
    }
  }

  if (idata.lastVolume == "0" || idata.lastVolume == "") {
    html +=
      '<td class="txt-right cell-highlight" id="lat_ps_' +
      idata.sym +
      '"></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-right cell-highlight" id="lat_ps_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(idata.lv, 0) +
      "</td>";
  }

  var ot = idata.lastPrice - idata.r;
  if (idata.lastPrice == 0) ot = 0;
  if (ot == "0" || ot == "0.00" || ot == "0.0") {
    html +=
      '<td class="txt-center cell-highlight" id="per_' +
      idata.sym +
      '"><span id="direct_' +
      idata.sym +
      '"></span>&nbsp;<span class="changeOt" id="change_' +
      idata.sym +
      '"></span><span class="changePc" id="changePc_' +
      idata.sym +
      '"></span></td>';
  } else {
    if (idata.sym.includes("VN30")) {
      html +=
        '<td class="' +
        getClass +
        ' txt-center cell-highlight" id="per_' +
        idata.sym +
        '"><span id="direct_' +
        idata.sym +
        '">' +
        getIconIndex(idata.lastPrice, idata.r) +
        '</i></span>&nbsp;<span class="changeOt" id="change_' +
        idata.sym +
        '">' +
        Highcharts.numberFormat(Math.abs(ot), 2) +
        '</span><span class="changePc" id="changePc_' +
        idata.sym +
        '">' +
        Highcharts.numberFormat(Math.abs((ot * 100) / idata.r), 2) +
        "</span></td>";
    } else {
      html +=
        '<td class="' +
        getClass +
        ' txt-center cell-highlight" id="per_' +
        idata.sym +
        '"><span id="direct_' +
        idata.sym +
        '">' +
        getIconIndex(idata.lastPrice, idata.r) +
        '</i></span>&nbsp;<span class="changeOt" id="change_' +
        idata.sym +
        '">' +
        Highcharts.numberFormat(Math.abs(ot), 0) +
        '</span><span class="changePc" id="changePc_' +
        idata.sym +
        '">' +
        Highcharts.numberFormat(Math.abs((ot * 100) / idata.r), 0) +
        "</span></td>";
    }
  }

  var vn30Index = $("#cIndex11").text();
  var otI =
    idata.lastPrice == "0" || idata.lastPrice == "" || vn30Index == ""
      ? 0
      : idata.lastPrice - vn30Index;
  if (idata.sym.includes("VN30")) {
    html +=
      '<td class="txt-center cell-highlight" id="other_' +
      idata.sym +
      '" style="color: ' +
      getcolorOther(otI) +
      '">' +
      Highcharts.numberFormat(otI, 2) +
      "</td>";
  } else {
    html += '<td class="txt-center cell-highlight" >-</td>';
  }

  // bên bán
  var ban1 = idata.g4.split("|");
  if (
    ban1[0] == "0" ||
    ban1[0] == "0.00" ||
    ban1[0] == "0.0" ||
    ban1[0] == ""
  ) {
    html +=
      '<td class="txt-right" ondblclick="dblClickOrderStock(this); return false;" id="oP1_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right" id="oV1_' + idata.sym + '"></td>';
  } else {
    if (idata.sym.includes("VN30")) {
      html +=
        '<td class="' +
        ban1[2] +
        ' txt-right" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
        getMessage("txtDoubleClickDatLenh") +
        '" id="oP1_' +
        idata.sym +
        '" >' +
        (ban1[0] == "ATO" || ban1[0] == "ATC"
          ? ban1[0]
          : Highcharts.numberFormat(ban1[0], 2)) +
        "</td>";
    } else {
      html +=
        '<td class="' +
        ban1[2] +
        ' txt-right" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
        getMessage("txtDoubleClickDatLenh") +
        '" id="oP1_' +
        idata.sym +
        '" >' +
        (ban1[0] == "ATO" || ban1[0] == "ATC"
          ? ban1[0]
          : Highcharts.numberFormat(ban1[0], 0)) +
        "</td>";
    }
    html +=
      '<td class="' +
      ban1[2] +
      ' txt-right" id="oV1_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(ban1[1], 0) +
      "</td>";
  }
  var ban2 = idata.g5.split("|");
  if (
    ban2[0] == "0" ||
    ban2[0] == "0.00" ||
    ban2[0] == "0.0" ||
    ban2[0] == ""
  ) {
    html +=
      '<td class="txt-right" ondblclick="dblClickOrderStock(this); return false;" id="oP2_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right" id="oV2_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban2[2] +
      ' txt-right" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP2_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(ban2[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      ban2[2] +
      ' txt-right" id="oV2_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(ban2[1], 0) +
      "</td>";
  }
  var ban3 = idata.g6.split("|");
  if (
    ban3[0] == "0" ||
    ban3[0] == "0.00" ||
    ban3[0] == "0.0" ||
    ban3[0] == ""
  ) {
    html +=
      '<td class="txt-right" ondblclick="dblClickOrderStock(this); return false;" id="oP3_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right" id="oV3_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban3[2] +
      ' txt-right" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP3_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(ban3[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      ban3[2] +
      ' txt-right" id="oV3_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(ban3[1], 0) +
      "</td>";
  }

  if (idata.lot == 0 || idata.lot == 0.0)
    html =
      html +
      '<td class="txt-content txt-right" id="vol_' +
      idata.sym +
      '"></td>';
  else
    html =
      html +
      '<td class="txt-content txt-right" id="vol_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(idata.lot, 0) +
      "</td>";

  if (idata.oi == 0 || idata.oi == 0.0)
    html =
      html +
      '<td class="txt-content txt-right" id="oi_' +
      idata.sym +
      '"></td>';
  else
    html =
      html +
      '<td class="txt-content txt-right" id="oi_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(idata.oi, 0) +
      "</td>";

  if (Highcharts.numberFormat(idata.highPrice, 2) == "0.00") {
    html = html + '<td class="txt-right" id="higP_' + idata.sym + '" ></td>';
  } else {
    if (idata.sym.includes("VN30")) {
      html =
        html +
        '<td class="txt-right" style="color:' +
        getColor10Gia(idata.r, idata.c, idata.f, idata.highPrice) +
        '" id="higP_' +
        idata.sym +
        '" >' +
        Highcharts.numberFormat(idata.highPrice, 2) +
        "</td>";
    } else {
      html =
        html +
        '<td class="txt-right" style="color:' +
        getColor10Gia(idata.r, idata.c, idata.f, idata.highPrice) +
        '" id="higP_' +
        idata.sym +
        '" >' +
        Highcharts.numberFormat(idata.highPrice, 0) +
        "</td>";
    }
  }
  if (Highcharts.numberFormat(idata.lowPrice, 2) == "0.00") {
    html = html + '<td class="txt-right" id="lowP_' + idata.sym + '" ></td>';
  } else {
    if (idata.sym.includes("VN30")) {
      html =
        html +
        '<td class="txt-right" style="color:' +
        getColor10Gia(idata.r, idata.c, idata.f, idata.lowPrice) +
        '" id="lowP_' +
        idata.sym +
        '" >' +
        Highcharts.numberFormat(idata.lowPrice, 2) +
        "</td>";
    } else {
      html =
        html +
        '<td class="txt-right" style="color:' +
        getColor10Gia(idata.r, idata.c, idata.f, idata.lowPrice) +
        '" id="lowP_' +
        idata.sym +
        '" >' +
        Highcharts.numberFormat(idata.lowPrice, 0) +
        "</td>";
    }
  }
  if (Highcharts.numberFormat(idata.avePrice, 2) == "0.00") {
    html = html + '<td class="txt-right" id="avgP_' + idata.sym + '" ></td>';
  } else {
    if (idata.sym.includes("VN30")) {
      html =
        html +
        '<td class="txt-right" style="color:' +
        getColor10Gia(idata.r, idata.c, idata.f, idata.avePrice) +
        '" id="avgP_' +
        idata.sym +
        '" >' +
        Highcharts.numberFormat(idata.avePrice, 2) +
        "</td>";
    } else {
      html =
        html +
        '<td class="txt-right" style="color:' +
        getColor10Gia(idata.r, idata.c, idata.f, idata.avePrice) +
        '" id="avgP_' +
        idata.sym +
        '" >' +
        Highcharts.numberFormat(idata.avePrice, 0) +
        "</td>";
    }
  }

  //ĐTNN Mua
  html +=
    '<td id="forB_' +
    idata.sym +
    '" class="txt-content txt-right col-vol">' +
    (idata.fBVol == 0 ? " " : FormatVolume10(idata.fBVol)) +
    "</td>";
  //ĐTNN Bán
  html +=
    '<td id="forS_' +
    idata.sym +
    '" class="txt-content txt-right col-vol">' +
    (idata.fSVolume == 0 ? " " : FormatVolume10(idata.fSVolume)) +
    "</td>";

  html += "</tr>";

  $("#tbodyPhaisinhContent").append(html);
}

function processDataPsCatalog(idata) {
  var html = '<tr id="row_' + idata.sym + '">';

  var getClass = getClassSymbol(
    idata.lastPrice,
    idata.r,
    idata.r,
    idata.c,
    idata.f
  );
  // symbol
  html +=
    '<td id="sym_' +
    idata.sym +
    '"><a href="javascript: void(0);" data-toggle="tooltip" data-placement="top" title="' +
    getMessage("txtNgayDaoHan") +
    ": " +
    idata.matureDate +
    '" class="p-l-5 txt-head ' +
    getClass +
    '">' +
    idata.sym +
    '</a><span class="txt-red right del-row"><i class="fa fa-times" aria-hidden="true"></i></span></td>';
  // gía tham chiếu
  html +=
    '<td class="txt-gia-tc txt-right cell-highlight col-price" id="ref_' +
    idata.sym +
    '">' +
    Highcharts.numberFormat(idata.r, 2) +
    "</td>";
  // giá trần
  html +=
    '<td class="txt-gia-tran txt-right cell-highlight col-price" id="cel_' +
    idata.sym +
    '">' +
    Highcharts.numberFormat(idata.c, 2) +
    "</td>";
  // giá sàn
  html +=
    '<td class="txt-gia-san txt-right cell-highlight col-price" id="flo_' +
    idata.sym +
    '">' +
    Highcharts.numberFormat(idata.f, 2) +
    "</td>";

  // bên mua
  var mua3 = idata.g3.split("|");
  if (
    mua3[0] == "0" ||
    mua3[0] == "0.00" ||
    mua3[0] == "0.0" ||
    mua3[0] == ""
  ) {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" id="bP3_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="bV3_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      mua3[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP3_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(mua3[0], 0) +
      "</td>";
    html +=
      '<td class="' +
      mua3[2] +
      ' txt-right col-vol" id="bV3_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(mua3[1], 0) +
      "</td>";
  }
  var mua2 = idata.g2.split("|");
  if (
    mua2[0] == "0" ||
    mua2[0] == "0.00" ||
    mua2[0] == "0.0" ||
    mua2[0] == ""
  ) {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" id="bP2_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="bV2_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      mua2[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP2_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(mua2[0], 0) +
      "</td>";
    html +=
      '<td class="' +
      mua2[2] +
      ' txt-right col-vol" id="bV2_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(mua2[1], 0) +
      "</td>";
  }

  var mua1 = idata.g1.split("|");
  if (
    mua1[0] == "0" ||
    mua1[0] == "0.00" ||
    mua1[0] == "0.0" ||
    mua1[0] == ""
  ) {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" id="bP1_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="bV1_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      mua1[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP1_' +
      idata.sym +
      '" >' +
      (mua1[0] == "ATO" || mua1[0] == "ATC"
        ? mua1[0]
        : Highcharts.numberFormat(mua1[0], 0)) +
      "</td>";
    html +=
      '<td class="' +
      mua1[2] +
      ' txt-right col-vol" id="bV1_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(mua1[1], 0) +
      "</td>";
  }

  // khớp
  if (
    idata.lastPrice == "0" ||
    idata.lastPrice == "0.00" ||
    idata.lastPrice == "0.0"
  ) {
    html +=
      '<td class="txt-right cell-highlight col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="pri_' +
      idata.sym +
      '" ></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-right cell-highlight col-price" id="pri_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(idata.lastPrice, 2) +
      "</td>";
  }
  var ot = idata.lastPrice - idata.r;
  if (idata.lastPrice == 0) ot = 0;
  if (ot == "0" || ot == "0.00" || ot == "0.0") {
    html +=
      '<td class="txt-center cell-highlight" id="per_' +
      idata.sym +
      '"><span id="direct_' +
      idata.sym +
      '"></span>&nbsp;<span class="changeOt" id="change_' +
      idata.sym +
      '"></span><span class="changePc" id="changePc_' +
      idata.sym +
      '" style="display: none;"></span></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-center cell-highlight" id="per_' +
      idata.sym +
      '"><span id="direct_' +
      idata.sym +
      '">' +
      getIconIndex(idata.lastPrice, idata.r) +
      '</i></span>&nbsp;<span class="changeOt" id="change_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(Math.abs(ot), 2) +
      '</span><span class="changePc" id="changePc_' +
      idata.sym +
      '" style="display: none;">' +
      Highcharts.numberFormat(Math.abs((ot * 100) / idata.r), 2) +
      "</span></td>";
  }
  if (idata.lastVolume == "0" || idata.lastVolume == "") {
    html +=
      '<td class="txt-right cell-highlight" id="lat_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-right cell-highlight" id="lat_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(idata.lastVolume, 0) +
      "</td>";
  }

  // var vn30Index = $('#cIndex11').text();
  // var otI = (idata.lastPrice == '0' || idata.lastPrice == '' || vn30Index == '') ? 0 : idata.lastPrice - vn30Index;
  // html += '<td class="txt-center cell-highlight" id="other_'+idata.sym+'" style="color: '+getcolorOther(otI)+'">'+Highcharts.numberFormat(otI, 2)+'</td>';

  // bên bán
  var ban1 = idata.g4.split("|");
  if (
    ban1[0] == "0" ||
    ban1[0] == "0.00" ||
    ban1[0] == "0.0" ||
    ban1[0] == ""
  ) {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" id="oP1_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="oV1_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban1[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP1_' +
      idata.sym +
      '" >' +
      (ban1[0] == "ATO" || ban1[0] == "ATC"
        ? ban1[0]
        : Highcharts.numberFormat(ban1[0], 0)) +
      "</td>";
    html +=
      '<td class="' +
      ban1[2] +
      ' txt-right col-vol" id="oV1_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(ban1[1], 0) +
      "</td>";
  }
  var ban2 = idata.g5.split("|");
  if (
    ban2[0] == "0" ||
    ban2[0] == "0.00" ||
    ban2[0] == "0.0" ||
    ban2[0] == ""
  ) {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" id="oP2_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="oV2_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban2[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP2_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(ban2[0], 0) +
      "</td>";
    html +=
      '<td class="' +
      ban2[2] +
      ' txt-right col-vol" id="oV2_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(ban2[1], 0) +
      "</td>";
  }
  var ban3 = idata.g6.split("|");
  if (
    ban3[0] == "0" ||
    ban3[0] == "0.00" ||
    ban3[0] == "0.0" ||
    ban3[0] == ""
  ) {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" id="oP3_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="oV3_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban3[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP3_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(ban3[0], 0) +
      "</td>";
    html +=
      '<td class="' +
      ban3[2] +
      ' txt-right col-vol" id="oV3_' +
      idata.sym +
      '">' +
      Highcharts.numberFormat(ban3[1], 0) +
      "</td>";
  }

  // dynamic
  var column_show = $.jStorage.get("COLUMN_SETTING_SHOW", [
    "total-volumn",
    "dumua",
    "duban",
    "ave",
    "hight",
    "low",
    "quote",
  ]);
  column_show.forEach((element) => {
    switch (element) {
      case "total-volumn":
        // tổng KL
        if (idata.lot == 0 || idata.lot == 0.0)
          html =
            html +
            '<td class="txt-content txt-right col-vol" id="vol_' +
            idata.sym +
            '"></td>';
        else
          html =
            html +
            '<td class="txt-content txt-right col-vol" id="vol_' +
            idata.sym +
            '">' +
            Highcharts.numberFormat(idata.lot, 0) +
            "</td>";
        break;
      case "dumua":
        html += '<td class="txt-content txt-right col-vol"></td>';
        break;
      case "duban":
        html += '<td class="txt-content txt-right col-vol"></td>';
        break;
      case "ave":
        // trung bình
        if (Highcharts.numberFormat(idata.avePrice, 2) == "0.00") {
          html =
            html +
            '<td class="txt-right col-price cell-highlight" id="avgP_' +
            idata.sym +
            '" ></td>';
        } else {
          html =
            html +
            '<td class="txt-right col-price cell-highlight" style="color:' +
            getColor10Gia(idata.r, idata.c, idata.f, idata.avePrice) +
            '" id="avgP_' +
            idata.sym +
            '" >' +
            Highcharts.numberFormat(idata.avePrice, 2) +
            "</td>";
        }
        break;
      case "hight":
        // cao
        if (Highcharts.numberFormat(idata.highPrice, 2) == "0.00") {
          html =
            html +
            '<td class="txt-right col-price cell-highlight" id="higP_' +
            idata.sym +
            '" ></td>';
        } else {
          html =
            html +
            '<td class="txt-right col-price cell-highlight" style="color:' +
            getColor10Gia(idata.r, idata.c, idata.f, idata.highPrice) +
            '" id="higP_' +
            idata.sym +
            '" >' +
            Highcharts.numberFormat(idata.highPrice, 2) +
            "</td>";
        }
        break;
      case "low":
        // thấp
        if (Highcharts.numberFormat(idata.lowPrice, 2) == "0.00") {
          html =
            html +
            '<td class="txt-right col-price cell-highlight" id="lowP_' +
            idata.sym +
            '" ></td>';
        } else {
          html =
            html +
            '<td class="txt-right col-price cell-highlight" style="color:' +
            getColor10Gia(idata.r, idata.c, idata.f, idata.lowPrice) +
            '" id="lowP_' +
            idata.sym +
            '" >' +
            Highcharts.numberFormat(idata.lowPrice, 2) +
            "</td>";
        }
        break;
      case "quote":
        // NN mua
        html += '<td class="txt-content txt-right col-vol"></td>';
        // NN bán
        html += '<td class="txt-content txt-right col-vol"></td>';
        break;
      case "froom":
        // foreign room
        html += '<td class="txt-content txt-right col-froom"></td>';
        break;
      case "rsi":
        html += '<td class="col-vol txt-center txt-content"></td>';
        break;
      case "macd":
        html += '<td class="col-vol txt-center txt-content"></td>';
        break;
      default:
        break;
    }
  });

  html += "</tr>";

  return html;
}

function processStockChungQuyen(idata) {
  var html = '<tr id="row_' + idata.sym + '">';
  var getClass = getClassSymbol(
    idata.lastPrice,
    idata.r,
    idata.r,
    idata.c,
    idata.f
  );
  var hq = "";
  html +=
    '<td class="col-symbol" id="sym_' +
    idata.sym +
    '"><a href="javascript: void(0);" onclick="showChart(\'' +
    idata.sym +
    '\')" class="p-l-5 txt-head ' +
    getClass +
    '">' +
    idata.sym +
    hq +
    '</a><span class="txt-red right del-row"><i class="fa fa-times" aria-hidden="true"></i></span></td>';
  // gía tham chiếu
  html +=
    '<td class="txt-gia-tc txt-right col-price cell-highlight" id="ref_' +
    idata.sym +
    '">' +
    idata.r +
    "</td>";
  // giá trần
  html +=
    '<td class="txt-gia-tran txt-right col-price cell-highlight" id="cel_' +
    idata.sym +
    '">' +
    idata.c +
    "</td>";
  // giá sàn
  html +=
    '<td class="txt-gia-san txt-right col-price cell-highlight" id="flo_' +
    idata.sym +
    '">' +
    idata.f +
    "</td>";
  // bên mua
  var mua3 = idata.g3.split("|");
  if (mua3[0] == "0" || mua3[0] == "0.00" || mua3[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP3_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="bV3_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      mua3[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP3_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(mua3[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      mua3[2] +
      ' txt-right col-vol" id="bV3_' +
      idata.sym +
      '">' +
      FormatVolume10(mua3[1], 2) +
      "</td>";
  }
  var mua2 = idata.g2.split("|");
  if (mua2[0] == "0" || mua2[0] == "0.00" || mua2[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP2_' +
      idata.sym +
      '" ></td>';
    html +=
      '<td class="txt-right col-vol" return false;" id="bV2_' +
      idata.sym +
      '"></td>';
  } else {
    html +=
      '<td class="' +
      mua2[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP2_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(mua2[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      mua2[2] +
      ' txt-right col-vol" id="bV2_' +
      idata.sym +
      '">' +
      FormatVolume10(mua2[1], 2) +
      "</td>";
  }

  var mua1 = idata.g1.split("|");
  if (mua1[0] == "0" || mua1[0] == "0.00" || mua1[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP1_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="bV1_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      mua1[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="bP1_' +
      idata.sym +
      '" >' +
      (mua1[0] == "ATO" || mua1[0] == "ATC"
        ? mua1[0]
        : Highcharts.numberFormat(mua1[0], 2)) +
      "</td>";
    html +=
      '<td class="' +
      mua1[2] +
      ' txt-right col-vol" id="bV1_' +
      idata.sym +
      '">' +
      FormatVolume10(mua1[1], 2) +
      "</td>";
  }
  // khớp
  if (
    idata.lastPrice == "0" ||
    idata.lastPrice == "0.00" ||
    idata.lastPrice == "0.0"
  ) {
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-price cell-highlight" ondblclick="dblClickOrderStock(this); return false;" id="pri_' +
      idata.sym +
      '" >' +
      idata.r +
      "</td>";
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-price cell-highlight" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="pri_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(idata.lastPrice, 2) +
      "</td>";
  }
  if (idata.lastVolume == "0" || idata.lastVolume == "") {
    html +=
      '<td class="txt-right col-vol cell-highlight" id="lat_' +
      idata.sym +
      '"></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-right col-vol cell-highlight" id="lat_' +
      idata.sym +
      '">' +
      FormatVolume10(idata.lastVolume, 2) +
      "</td>";
  }
  if (idata.ot == "0" || idata.ot == "0.00" || idata.ot == "0.0") {
    html +=
      '<td class="txt-center col-diff cell-highlight" id="per_' +
      idata.sym +
      '" sort-color="' +
      getClass +
      '"><span id="direct_' +
      idata.sym +
      '"></span>&nbsp;<span class="changeOt" id="change_' +
      idata.sym +
      '"></span><span class="changePc" id="changePc_' +
      idata.sym +
      '"></span></td>';
  } else {
    html +=
      '<td class="' +
      getClass +
      ' txt-center col-diff cell-highlight" id="per_' +
      idata.sym +
      '" sort-color="' +
      getClass +
      '"><span id="direct_' +
      idata.sym +
      '">' +
      getIconIndex(idata.lastPrice, idata.r) +
      '</i></span>&nbsp;<span class="changeOt" id="change_' +
      idata.sym +
      '">' +
      idata.ot +
      '</span><span class="changePc" id="changePc_' +
      idata.sym +
      '">' +
      idata.changePc +
      "%" +
      "</span></td>";
  }
  // bên bán
  var ban1 = idata.g4.split("|");
  if (ban1[0] == "0" || ban1[0] == "0.00" || ban1[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP1_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="oV1_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban1[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP1_' +
      idata.sym +
      '" >' +
      (ban1[0] == "ATO" || ban1[0] == "ATC"
        ? ban1[0]
        : Highcharts.numberFormat(ban1[0], 2)) +
      "</td>";
    html +=
      '<td class="' +
      ban1[2] +
      ' txt-right col-vol" id="oV1_' +
      idata.sym +
      '">' +
      FormatVolume10(ban1[1], 2) +
      "</td>";
  }
  var ban2 = idata.g5.split("|");
  if (ban2[0] == "0" || ban2[0] == "0.00" || ban2[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP2_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="oV2_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban2[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP2_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(ban2[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      ban2[2] +
      ' txt-right col-vol" id="oV2_' +
      idata.sym +
      '">' +
      FormatVolume10(ban2[1], 2) +
      "</td>";
  }
  var ban3 = idata.g6.split("|");
  if (ban3[0] == "0" || ban3[0] == "0.00" || ban3[0] == "0.0") {
    html +=
      '<td class="txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP3_' +
      idata.sym +
      '" ></td>';
    html += '<td class="txt-right col-vol" id="oV3_' + idata.sym + '"></td>';
  } else {
    html +=
      '<td class="' +
      ban3[2] +
      ' txt-right col-price" ondblclick="dblClickOrderStock(this); return false;" data-toggle="tooltip" data-placement="top" title="" data-original-title="' +
      getMessage("txtDoubleClickDatLenh") +
      '" id="oP3_' +
      idata.sym +
      '" >' +
      Highcharts.numberFormat(ban3[0], 2) +
      "</td>";
    html +=
      '<td class="' +
      ban3[2] +
      ' txt-right col-vol" id="oV3_' +
      idata.sym +
      '">' +
      FormatVolume10(ban3[1], 2) +
      "</td>";
  }
  // dư mua, dư bán
  var dumuaban = idata.g7.split("|");
  // dynamic
  var column_show = [
    "total-volumn",
    "ave",
    "hight",
    "low",
    "quote",
    "ckcoso",
    "dhv",
    "chenhlech",
  ];
  var pri_CW = idata.lastPrice == "0" ? idata.r : idata.lastPrice;
  column_show.forEach((element) => {
    switch (element) {
      case "total-volumn":
        // tổng KL
        if (idata.lot == "0" || idata.lot == "") {
          html +=
            '<td class="txt-content txt-right col-vol" id="vol_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="txt-content txt-right col-vol" id="vol_' +
            idata.sym +
            '">' +
            FormatVolume10(idata.lot, 2) +
            "</td>";
        }
        break;
      case "ave":
        // trung bình
        if (idata.avePrice == "0" || idata.avePrice == "0.00") {
          html +=
            '<td class="txt-right col-price cell-highlight" id="avgP_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="' +
            getClassSymbol(idata.avePrice, idata.r, idata.r, idata.c, idata.f) +
            ' txt-right col-price cell-highlight" id="avgP_' +
            idata.sym +
            '">' +
            Highcharts.numberFormat(idata.avePrice, 2) +
            "</td>";
        }
        break;
      case "hight":
        // cao
        if (idata.highPrice == "0" || idata.highPrice == "0.00") {
          html +=
            '<td class="txt-right col-price cell-highlight" id="higP_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="' +
            getClassSymbol(
              idata.highPrice,
              idata.r,
              idata.r,
              idata.c,
              idata.f
            ) +
            ' txt-right col-price cell-highlight" id="higP_' +
            idata.sym +
            '">' +
            Highcharts.numberFormat(idata.highPrice, 2) +
            "</td>";
        }
        break;
      case "low":
        // thấp
        if (idata.lowPrice == "0" || idata.lowPrice == "0.00") {
          html +=
            '<td class="txt-right col-price cell-highlight" id="lowP_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="' +
            getClassSymbol(idata.lowPrice, idata.r, idata.r, idata.c, idata.f) +
            ' txt-right col-price cell-highlight" id="lowP_' +
            idata.sym +
            '">' +
            Highcharts.numberFormat(idata.lowPrice, 2) +
            "</td>";
        }
        break;
      case "quote":
        // NN mua
        if (idata.fBVol == "0" || idata.fBVol == "") {
          html +=
            '<td class="txt-content txt-right col-vol" id="forB_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="txt-content txt-right col-vol" id="forB_' +
            idata.sym +
            '">' +
            FormatVolume10(idata.fBVol, 2) +
            "</td>";
        }
        // NN bán
        if (idata.fSVolume == "0" || idata.fSVolume == "") {
          html +=
            '<td class="txt-content txt-right col-vol" id="forS_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="txt-content txt-right col-vol" id="forS_' +
            idata.sym +
            '">' +
            FormatVolume10(idata.fSVolume, 2) +
            "</td>";
        }
        break;
      case "ckcoso":
        // Mã
        html +=
          '<td class="txt-center col-vol ckcosoSym_' +
          idata.sym.substring(1, 4) +
          '" id="ckcosoSym_' +
          idata.sym +
          '">' +
          idata.sym.substring(1, 4) +
          "</td>";
        // Giá
        html +=
          '<td class="txt-right col-vol ckcosoPri_' +
          idata.sym.substring(1, 4) +
          '" id="ckcosoPri_' +
          idata.sym +
          '"></td>';
        break;
      case "froom":
        // foreign room
        if (idata.fRoom == "0" || idata.fRoom == "0.00") {
          html +=
            '<td class="txt-content txt-right col-froom" id="froom_' +
            idata.sym +
            '"></td>';
        } else {
          html +=
            '<td class="txt-content txt-right col-froom" id="froom_' +
            idata.sym +
            '">' +
            Highcharts.numberFormat(idata.fRoom, 0) +
            "</td>";
        }
        break;
      case "rsi":
        html +=
          '<td class="col-vol txt-center txt-content" id="rsi_' +
          idata.sym +
          '"></td>';
        break;
      case "macd":
        html +=
          '<td class="col-vol txt-center txt-content" id="macd_' +
          idata.sym +
          '"></td>';
        break;
      case "dhv":
        var CWExcersisePrice = 0;
        var CWExerciseRatio = 0;
        var CWMaturityDate = "";
        try {
          var CWExcersisePrice = !_.isEmpty(idata.CWExcersisePrice)
            ? Number(idata.CWExcersisePrice)
            : 0;
          var tmp = idata.CWExerciseRatio.split(":");
          CWExerciseRatio = Number(tmp[0]) / Number(tmp[1]);

          CWMaturityDate = idata.CWMaturityDate;
        } catch (err) {
          console.log("Điểm hòa vốn err: ", err);
        }
        //init object Điểm hòa vốn
        diemhoavon[idata.sym] = [CWExcersisePrice, CWExerciseRatio];

        html +=
          '<td class="col-vol txt-right txt-content" id="dhv_' +
          idata.sym +
          '" data-CWMaturityDate="' +
          CWMaturityDate +
          '" data-CWExcersisePrice="' +
          CWExcersisePrice +
          '" data-CWExerciseRatio="' +
          idata.CWExerciseRatio +
          '" >' +
          Highcharts.numberFormat(
            CWExcersisePrice + pri_CW * CWExerciseRatio,
            2
          ) +
          "</td>";
        break;
      case "chenhlech":
        html +=
          '<td class="col-vol txt-center txt-content" id="chenhlech_' +
          idata.sym +
          '"></td>';
        break;
      default:
        break;
    }
  });

  html += "</tr>";

  return html;
}

/* Not use*/
function processIndexOLD(iData) {
  if (iData == null) return "";
  var html = '<tr id="index_' + iData.mc + '">';
  switch (iData.mc) {
    case "10":
      html += "<td>VN-Index</td>";
      break;
    case "02":
      html += "<td>HNX-Index</td>";
      break;
    case "11":
      html += "<td>VN30-Index</td>";
      break;
    case "03":
      html += "<td>UPCOM-Index</td>";
      break;
    default:
      html += "<td></td>";
      break;
  }
  var getClass = getClassIndex(iData.cIndex, iData.oIndex);
  var ot = iData.ot.split("|");
  html +=
    '<td class="txt-right" style="color: ' +
    getClass +
    '"><span id="cIndex' +
    iData.mc +
    '">' +
    iData.cIndex +
    "</span><span>&nbsp;" +
    getIconIndex(iData.cIndex, iData.oIndex) +
    "</span></td>";
  html +=
    '<td class="txt-right" style="color: ' + getClass + '">' + ot[0] + "</td>";
  html +=
    '<td class="txt-right" style="color: ' + getClass + '">' + ot[1] + "</td>";
  html +=
    '<td class="txt-right">' + Highcharts.numberFormat(iData.vol, 0) + "</td>";
  html +=
    '<td class="txt-right">' + Highcharts.numberFormat(ot[2], 0) + "</td>";
  html +=
    '<td class="txt-right" style="color: ' +
    getColor("i") +
    ';">' +
    ot[3] +
    "</td>";
  html +=
    '<td class="txt-right" style="color: ' +
    getColor("e") +
    ';">' +
    ot[5] +
    "</td>";
  html +=
    '<td class="txt-right" style="color: ' +
    getColor("d") +
    ';">' +
    ot[4] +
    "</td>";
  html +=
    '<td class="txt-center">' +
    (iData.status == "K" || iData.status == "Undefined" ? "C" : iData.status) +
    "</td></tr>";

  return html;
}

function processIndex(iData) {
  if (iData == null) return "";

  var html =
    '<div class="mini-index_' +
    iData.mc +
    '" style="display: flex; margin-left: 10px;">';
  var obj = $();
  switch (iData.mc) {
    case MARKET.HSX:
      html +=
        '<span>VN<span class="hide-on-mobile">-Index</span>:&nbsp;</span>';
      obj = $("div#index-minibox-" + settingUI.charts[0]);
      break;
    case MARKET.HNX:
      html +=
        '<span>HNX<span class="hide-on-mobile">-Index</span>:&nbsp;</span>';
      obj = $("div#index-minibox-" + settingUI.charts[1]);
      break;
    case MARKET.HSX30:
      html += "<span>VN30-Index:&nbsp;</span>";
      obj = $("div#index-minibox-" + settingUI.charts[3]);
      break;
    case MARKET.UPCOM:
      html += "<span>UPCOM-Index:&nbsp;</span>";
      obj = $("div#index-minibox-" + settingUI.charts[2]);
      break;
    default:
      html += "<span></span>";
      break;
  }
  var getClass = getClassIndex(iData.cIndex, iData.oIndex);
  var ot = iData.ot.split("|");

  var htmlIndex = "";
  htmlIndex +=
    '<span class="txt-right" style="color: ' +
    getClass +
    '"><span id="cIndex' +
    iData.mc +
    '">' +
    iData.cIndex +
    "</span><span>&nbsp;" +
    getIconIndex(iData.cIndex, iData.oIndex) +
    "&nbsp;</span></span>";
  htmlIndex +=
    ' (<span class="txt-right" style="color: ' +
    getClass +
    '">' +
    ot[0] +
    "&nbsp; " +
    ot[1] +
    "</span>)" +
    "<br />" +
    Highcharts.numberFormat(iData.vol, 0) +
    ' <span style="color: #ffd900;">CP</span> ' +
    Highcharts.numberFormat(ot[2] / 1000, 3) +
    ' <span style="color: #ffd900;" class="txtTy">' +
    getMessage("txtTy") +
    "</span> ";
  htmlIndex +=
    '<br /><span class="txt-right" style="color: ' +
    getColor("i") +
    ';">' +
    ot[3] +
    ' <i class="fa fa-caret-up" aria-hidden="true"></i></span> &nbsp;';
  htmlIndex +=
    '<span class="txt-right" style="color: ' +
    getColor("e") +
    ';">' +
    ot[5] +
    ' <i class="fa fa-square" aria-hidden="true" style="font-size:9px;"></i></span> &nbsp;';
  htmlIndex +=
    '<span class="txt-right" style="color: ' +
    getColor("d") +
    ';">' +
    ot[4] +
    ' <i class="fa fa-caret-down" aria-hidden="true"></i></span></div>';

  if (!_.isEmpty(obj)) {
    var vStatus =
      iData.status == "K" || iData.status == "Undefined" ? "C" : iData.status;

    obj.html(htmlIndex + " " + vStatus);
  }
}

function processMiniIndex(iData) {
  if (iData == null) return "";

  var html =
    '<div class="mini-index_' +
    iData.mc +
    '" style="display: flex; margin-left: 10px;">';
  switch (iData.mc) {
    case MARKET.HSX:
      html +=
        '<span>VN<span class="hide-on-mobile">-Index</span>:&nbsp;</span>';
      break;
    case MARKET.HNX:
      html +=
        '<span>HNX<span class="hide-on-mobile">-Index</span>:&nbsp;</span>';
      break;
    case MARKET.HSX30:
      html += "<span>VN30-Index:&nbsp;</span>";
      break;
    case MARKET.UPCOM:
      html += "<span>UPCOM-Index:&nbsp;</span>";
      break;
    default:
      html += "<span></span>";
      break;
  }
  var getClass = getClassIndex(iData.cIndex, iData.oIndex);
  var ot = iData.ot.split("|");

  html +=
    '<span class="txt-right" style="color: ' +
    getClass +
    '"><span id="cIndex' +
    iData.mc +
    '">' +
    iData.cIndex +
    "</span><span>&nbsp;" +
    getIconIndex(iData.cIndex, iData.oIndex) +
    "&nbsp;</span></span>";
  html +=
    '<span class="txt-right" style="color: ' +
    getClass +
    '">' +
    ot[0] +
    "</span>&nbsp;(";
  html +=
    '<span class="txt-right" style="color: ' +
    getColor("i") +
    ';">' +
    ot[3] +
    ' <i class="fa fa-caret-up" aria-hidden="true"></i></span> &nbsp;';
  html +=
    '<span class="txt-right" style="color: ' +
    getColor("e") +
    ';">' +
    ot[5] +
    ' <i class="fa fa-square" aria-hidden="true" style="font-size:9px;"></i></span> &nbsp;';
  html +=
    '<span class="txt-right" style="color: ' +
    getColor("d") +
    ';">' +
    ot[4] +
    ' <i class="fa fa-caret-down" aria-hidden="true"></i></span>)</div>';

  return html;
}

// Update realtime
function processIndexReal(iData) {
  // {"id":1101,"mc":"11","cIndex":933.88,"oIndex":932.12,"vol":6305660,"value":181461,"time":"09:34:05","status":"O","accVol":0,"ot":"1.76|0.19%|181461|19|7|4"}
  if (
    iData.mc == "10" ||
    iData.mc == "02" ||
    iData.mc == "11" ||
    iData.mc == "03"
  ) {
    processIndex(iData);

    var html = "";
    var htmlMini = "";
    switch (iData.mc) {
      case "10":
        html += "<td>VN-Index</td>";
        htmlMini += "<span>VN-Index:&nbsp;</span>";
        break;
      case "02":
        html += "<td>HNX-Index</td>";
        htmlMini += "<span>HNX-Index:&nbsp;</span>";
        break;
      case "11":
        html += "<td>VN30-Index</td>";
        htmlMini += "<span>VN30-Index:&nbsp;</span>";
        break;
      case "03":
        html += "<td>UPCOM-Index</td>";
        htmlMini += "<span>UPCOM-Index:&nbsp;</span>";
        break;
      default:
        html += "<td></td>";
        htmlMini += "<span></span>";
        break;
    }

    var getClass = getClassIndex(iData.cIndex, iData.oIndex);
    var ot = iData.ot.split("|");
    html +=
      '<td class="txt-right" style="color: ' +
      getClass +
      '"><span id="cIndex' +
      iData.mc +
      '">' +
      iData.cIndex +
      "</span><span>&nbsp;" +
      getIconIndex(iData.cIndex, iData.oIndex) +
      "</span></td>";
    html +=
      '<td class="txt-right" style="color: ' +
      getClass +
      '">' +
      ot[0] +
      "</td>";
    html +=
      '<td class="txt-right" style="color: ' +
      getClass +
      '">' +
      ot[1] +
      "</td>";
    html +=
      '<td class="txt-right">' +
      Highcharts.numberFormat(iData.vol, 0) +
      "</td>";
    html +=
      '<td class="txt-right">' + Highcharts.numberFormat(ot[2], 0) + "</td>";
    html +=
      '<td class="txt-right" style="color: ' +
      getColor("i") +
      ';">' +
      ot[3] +
      "</td>";
    html +=
      '<td class="txt-right" style="color: ' +
      getColor("e") +
      ';">' +
      ot[5] +
      "</td>";
    html +=
      '<td class="txt-right" style="color: ' +
      getColor("d") +
      ';">' +
      ot[4] +
      "</td>";
    html +=
      '<td class="txt-center">' +
      (iData.status == "K" || iData.status == "Undefined"
        ? "C"
        : iData.status) +
      "</td>";

    htmlMini +=
      '<span class="txt-right" style="color: ' +
      getClass +
      '"><span id="cIndex' +
      iData.mc +
      '">' +
      iData.cIndex +
      "</span><span>&nbsp;" +
      getIconIndex(iData.cIndex, iData.oIndex) +
      "</span></span>";
    htmlMini +=
      '<span class="txt-right" style="color: ' +
      getClass +
      '">' +
      ot[0] +
      "</span>&nbsp;(";
    htmlMini +=
      '<span class="txt-right" style="color: ' +
      getColor("i") +
      ';">' +
      ot[3] +
      ' <i class="fa fa-caret-up" aria-hidden="true"></i></span> &nbsp;';
    htmlMini +=
      '<span class="txt-right" style="color: ' +
      getColor("e") +
      ';">' +
      ot[5] +
      ' <i class="fa fa-square" aria-hidden="true" style="font-size:9px;"></i></span> &nbsp;';
    htmlMini +=
      '<span class="txt-right" style="color: ' +
      getColor("d") +
      ';">' +
      ot[4] +
      ' <i class="fa fa-caret-down" aria-hidden="true"></i></span>)</div>';

    if (iData.mc == "10") gdVNI = ot[2];
    if (iData.mc == "02") gdHNX = ot[2];
    $("#sum2MarketValue").html(
      Highcharts.numberFormat(
        (StringToInt(gdVNI) + StringToInt(gdHNX)) / 1000,
        0
      ) +
        ' <span class="txtTy">' +
        getMessage("txtTy") +
        "</span>"
    );

    $("#index_" + iData.mc).html(html);
    $(".mini-index_" + iData.mc).html(htmlMini);
    if (iData.mc == "11") {
      // update lại phần khác cơ sở
      $("#tbodyPhaisinhContent tr").each(function () {
        var sym = $(this).attr("id").replace("row_", "");
        var priSym = $("#pri_" + sym).html();
        var otI =
          priSym == "0" || priSym == "" || iData.cIndex == ""
            ? 0
            : StringToDouble(priSym) - iData.cIndex;
        $("#other_" + iData.sym)
          .html(Highcharts.numberFormat(otI, 2))
          .css({ color: getcolorOther(otI) });
      });
    }
  }
}

function initTooltipPrice() {
  $("#sortable-banggia")
    .children("tr")
    .each(function () {
      var sym = $(this).attr("id").replace("row_", "");
      var dhv = $("#dhv_" + sym);
      var CWExcersisePrice = dhv.attr("data-CWExcersisePrice");
      var CWExerciseRatio = dhv.attr("data-CWExerciseRatio");
      var CWMaturityDate = dhv.attr("data-CWMaturityDate");

      CWExcersisePrice = !_.isEmpty(CWExcersisePrice)
        ? "<br>Giá thực hiện: " + CWExcersisePrice
        : "";
      CWExerciseRatio = !_.isEmpty(CWExerciseRatio)
        ? "<br>Tỷ lệ chuyển đổi: " + CWExerciseRatio
        : "";
      CWMaturityDate =
        !_.isEmpty(CWMaturityDate) && CWMaturityDate.length == 8
          ? "<br>" +
            getMessage("txtNgayDaoHan") +
            ": " +
            CWMaturityDate.substr(6, 2) +
            "/" +
            CWMaturityDate.substr(4, 2) +
            "/" +
            CWMaturityDate.substr(0, 4)
          : "";

      var aaa = _.find(modal.listIndex, function (dt) {
        return dt.stock_code == sym;
      });
      typeof aaa !== "undefined" &&
        aaa != null &&
        $(this)
          .children("td")
          .eq(0)
          .find(".txt-head")
          .attr("data-toggle", "tooltip")
          .attr("data-placement", "top")
          .attr(
            "title",
            '<div style="text-align: left;">' +
              aaa.name_vn +
              " - " +
              aaa.post_to +
              CWMaturityDate +
              CWExcersisePrice +
              CWExerciseRatio +
              "</div>"
          );
    });
  $('[data-toggle="tooltip"]').tooltip({ html: true });
}

// thỏa thuận
processTT = function (idata) {
  if (idata.type == "PTM" && idata.volume > 0) {
    gtTTVal += idata.value;
    $("#sum2MarketTTValue").html(
      Highcharts.numberFormat(gtTTVal / 1000000, 0) +
        ' <span class="txtTy">' +
        getMessage("txtTy") +
        "</span>"
    );
  }

  var marketID = "";
  switch (objPage.filterCode + "") {
    case "HOSE":
      marketID = "10";
      break;
    case "HNX":
      marketID = "02";
      break;
    case "UPCOM":
      marketID = "03";
      break;
    default:
      marketID = "ALL";
      break;
  }

  if (marketID != "ALL" && idata.marketID != marketID) {
    return true;
  }

  var htmlM =
    '<tr> \
		<td class="' +
    idata.color +
    '">' +
    idata.sym +
    '</td>\
		<td class="txt-right ' +
    idata.color +
    '">' +
    Highcharts.numberFormat(idata.price, 2) +
    '</td>\
		<td class="txt-right txt-gia-tc">' +
    Highcharts.numberFormat(idata.volume, 0) +
    "</td>";
  htmlM +=
    idata.type != "PTM"
      ? ""
      : '<td class="txt-right txt-content">' +
        Highcharts.numberFormat(idata.value, 0) +
        "</td>";
  htmlM += '<td class="text-center txt-content">' + idata.time + "</td>";
  htmlM +=
    idata.type == "PTM"
      ? ""
      : '<td class="txt-center txt-content">' +
        idata.firmNo.padStart(3, "0") +
        "</td>";
  // htmlM += '<td class="text-center txt-content">-</td>';
  htmlM += "</tr>";

  var vbody = $();
  if (idata.type == "PTM" && idata.volume > 0) {
    //Khớp lệnh
    vbody = $("#thoathuan-khoplenh tbody");
  } else if (idata.type == "PTS") {
    // bên bán
    vbody = $("#thoathuan-benban tbody");
  } else if (idata.type == "PTB") {
    // bên mua
    vbody = $("#thoathuan-benmua tbody");
  }

  vbody.prepend(htmlM);
};
