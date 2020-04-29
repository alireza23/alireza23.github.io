$(document).ready(function () {
  var element = document.getElementById("container");
  var width = element.offsetWidth;
  var height = element.offsetHeight;

  console.log(height);
  console.log(width);
  var windowH = $(window).height();
  var delta = (windowH - height) / 2;
  console.log(`delta =  ${delta}`);
  if (height <= windowH) {
    $("#container").css("top", `${delta}px`);
  }
  var hammertime = new Hammer(element, {});

  hammertime.get("pinch").set({ enable: true });
  hammertime.get("pan").set({ threshold: 10 });

  var fixHammerjsDeltaIssue = undefined;
  var pinchStart = { x: undefined, y: undefined };
  var lastEvent = undefined;

  var originalSize = {
    width: width,
    height: height,
  };

  var current = {
    x: 0,
    y: 0,
    z: 1,
    zooming: false,
    width: originalSize.width * 1,
    height: originalSize.height * 1,
  };

  var last = {
    x: current.x,
    y: current.y,
    z: current.z,
  };

  function getRelativePosition(element, point, originalSize, scale) {
    var domCoords = getCoords(element);

    var elementX = point.x - domCoords.x;
    var elementY = point.y - domCoords.y;

    var relativeX = elementX / ((originalSize.width * scale) / 2) - 1;
    var relativeY = elementY / ((originalSize.height * scale) / 2) - 1;
    return { x: relativeX, y: relativeY };
  }

  function getCoords(elem) {
    // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { x: Math.round(left), y: Math.round(top) };
  }

  function scaleFrom(zoomOrigin, currentScale, newScale) {
    var currentShift = getCoordinateShiftDueToScale(originalSize, currentScale);
    var newShift = getCoordinateShiftDueToScale(originalSize, newScale);

    var zoomDistance = newScale - currentScale;

    var shift = {
      x: currentShift.x - newShift.x,
      y: currentShift.y - newShift.y,
    };

    var output = {
      x: zoomOrigin.x * shift.x,
      y: zoomOrigin.y * shift.y,
      z: zoomDistance,
    };
    return output;
  }

  function getCoordinateShiftDueToScale(size, scale) {
    var newWidth = scale * size.width;
    var newHeight = scale * size.height;
    var dx = (newWidth - size.width) / 2;
    var dy = (newHeight - size.height) / 2;
    return {
      x: dx,
      y: dy,
    };
  }

  hammertime.on("pinch", function (e) {
    // console.log('pinching')
    var d = scaleFrom(pinchZoomOrigin, last.z, last.z * e.scale);
    current.x = d.x + last.x + e.deltaX;
    current.y = d.y + last.y + e.deltaY;
    current.z = d.z + last.z;
    lastEvent = "pinch";
    update();
  });

  var pinchZoomOrigin = undefined;
  hammertime.on("pinchstart", function (e) {
    pinchStart.x = e.center.x;
    pinchStart.y = e.center.y;
    pinchZoomOrigin = getRelativePosition(
      element,
      { x: pinchStart.x, y: pinchStart.y },
      originalSize,
      current.z
    );
    lastEvent = "pinchstart";
  });

  hammertime.on("pinchend", function (e) {
    //console.log('pinch end')
    last.x = current.x;
    last.y = current.y;
    last.z = current.z;
    lastEvent = "pinchend";
    // console.log(`pinch end ${e}`)
  });

  function update() {
    var zoom = current.z;
    if (zoom < 1) {
      zoom = 1;
    }
    imageOriginalHeight = $("#myImage").height();
   // console.log(`image original height ${imageOriginalHeight}`);
    current.height = imageOriginalHeight * zoom;
    current.width = originalSize.width * zoom;
   // console.log("new3");
    if (current.x < -((current.width - originalSize.width) / 2)) {
      current.x = -((current.width - originalSize.width) / 2);
    }
    if (current.x > (current.width - originalSize.width) / 2) {
      current.x = (current.width - originalSize.width) / 2;
    }
    // if(current.y < - ((current.height - imageOriginalHeight)/2)){
    //     current.y = - ((current.height - imageOriginalHeight)/2)
    // }
    // if(current.y > (current.height - imageOriginalHeight)/2){
    //   current.y = (current.height - imageOriginalHeight)/2
    // }

    var windowH = $(window).innerHeight();

    if (current.height <= windowH) {
      var width2 = element.offsetWidth;
      var height2 = element.offsetHeight;

      var windowH2 = $(window).height();
      var delta2 = (windowH2 - height2) / 2;
     // console.log(`delta =  ${delta2}    ${current.height}    ${height2}`);
      if (height2 <= windowH2) {
        $("#container").css("top", `${delta2}px`);
      }

      element.style.transform =
        "translate3d(" + current.x + "px, " + 0 + "px, 0) scale(" + zoom + ")";
    } else {
     // console.log(` IMAGE bigger AND windwH= ${windowH}`);
      $("#container").css("top", `0px`);
      console.log({
        zoom,
        x: current.x,
        w: current.width,
        y: current.y,
        h: current.height,
      });
      if (current.y < -((current.height - imageOriginalHeight) / 2)) {
        current.y = -((current.height - imageOriginalHeight) / 2);
        comsole.log('y minus 0')
      }
      // if (current.y > (current.height - imageOriginalHeight) / 2) {
      //   current.y = (current.height - imageOriginalHeight) / 2;
      // }
      element.style.transform =
        "translate3d(" +
        current.x +
        "px, " +
        current.y +
        "px, 0) scale(" +
        zoom +
        ")";
    }


  }
});
