import isEqual from "./isEqual";
import WindowFunc from "./window";

const tools = {
  isEqual,
  WindowFunc,
  gethashcode:gethashcode,
  isBelowIE9() {
    return (
      navigator.appName == "Microsoft Internet Explorer" &&
      parseInt(
        navigator.appVersion
          .split(";")[1]
          .replace(/[ ]/g, "")
          .replace("MSIE", "")
      ) <= 9
    );
  },
  downloadCvs2Img(cvs, picName = "Download") {
    if (this.isBelowIE9()) {
      message.warning(
        getLabel(
          385817,
          "IE9以下版本浏览器不支持下载功能，请换个其他版本的浏览使用"
        )
      );
      return;
    }
    if (!cvs) {
      return;
    }
    let $a = document.createElement("a");
    $a.download = `${picName}.jpg`;
    $a.target = "_blank";
    const url = cvs.toDataURL("image/jpg");
    $a.href = url;
    if (typeof MouseEvent === "function") {
      var evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false
      });
      $a.dispatchEvent(evt);
    } else {
      if (window.navigator.msSaveOrOpenBlob) {
        var bstr = atob(url.split(",")[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new Blob([u8arr]);
        window.navigator.msSaveOrOpenBlob(blob, "Download.jpg");
      } else {
        // var lang = model.get('lang');
        var html =
          "" +
          '<body style="margin:0;">' +
          '<img src="' +
          url +
          '" style="max-width:100%;" title="" />' +
          "</body>";
        var tab = window.open();
        tab.document.write(html);
      }
    }
  },
}

function randomWord(randomFlag, range) {
  var str = "",
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (var i = 0; i < range; i++) {
      var pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
  }
  return str;
}
//获取hashcode
function gethashcode() {
  //定义一个时间戳，计算与1970年相差的毫秒数  用来获得唯一时间
  var timestamp = (new Date()).valueOf();
  var myRandom=randomWord(false,6);
  return myRandom;
}

export default tools;