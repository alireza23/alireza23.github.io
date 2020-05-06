//TouchEmulator();

/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */
var myElement = document.getElementById("myElement");

var originalSize = {
    width: myElement.offsetWidth,
    height: myElement.offsetHeight
}
console.log(originalSize)

function getCoords(element) { //gets the distnce between top left corner of elemnt and 0,0 point
    var box = element.getBoundingClientRect();

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

function getRelativePosition(element, point, originalSize, scale) {
    var domCoords = getCoords(element);

    console.log({ point })
    console.log({ domCoords })

    var elementX = point.x - domCoords.x;
    var elementY = point.y - domCoords.y;
    console.log({ elementX, elementY })
    var relativeX = elementX / (originalSize.width * scale / 2) - 1;
    var relativeY = elementY / (originalSize.height * scale / 2) - 1;
    return { x: relativeX, y: relativeY }
}


/* -------------------------------------------------------------------------- */
/*                                functions end                               */
/* -------------------------------------------------------------------------- */

var myElement = document.getElementById("myElement");

// create a simple instance
// by default, it only adds horizontal recognizers
var hammertime = new Hammer(myElement);
hammertime.get('pinch').set({ enable: true });
//hammertime.get('rotate').set({ enable: true });
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
hammertime.add(new Hammer.Pinch({ threshold: 0, pointers: 0 }));
// listen to events...
hammertime.on("pinch", function(ev) {
    // console.log(ev);
});

/* -------------------------------------------------------------------------- */
/*                                 begin here                                 */
/* -------------------------------------------------------------------------- */
hammertime.on("tap", function(ev) {
    //when you touch the screen the pan start does not fire, you have to pan a distance to triger the panstart
    //for example you put your finger at pint {0, 200} and begin drawing your finger toward right x0, x1,x2, ... till a point that
    //hammer detect your intention as a pan event! at this very perticular point th ev.center.x is declared
    //but you have moved your finger a distance: so the difference between when you put your finger at screen and 
    // the point when panstart got fired is deltaX, offcourse if the lastEvent is not pan


    let centerX = ev.center.x
    let centerY = ev.center.y
    let deltaX = ev.deltaX
    let deltaY = ev.deltaY
    let realTouchStartX = ev.center.x - ev.deltaX
    let realTouchStartY = ev.center.y - ev.deltaY
    let scale = ev.scale
    let offsetX = ev.srcEvent.offsetX //margin ro to mohasebe nemiyare
    let offsetY = ev.srcEvent.offsetY
    console.log({ realTouchStartX, deltaX, offsetX })
    console.log(myElement.offsetLeft)
        // let clientX = ev.srcEvent.clientX
        // let clientY = ev.srcEvent.clientY
        // let layerX = ev.srcEvent.layerX // this probaby something no useful
        // let layerY = ev.srcEvent.layerY
        // let pageX = ev.srcEvent.pageX
        // let pageY = ev.srcEvent.pageY
        // let screenX = ev.srcEvent.screenX //relative to physical monitor
        // let screenY = ev.srcEvent.screenY
        // let touchX = ev.srcEvent.x
        // let touchY = ev.srcEvent.y

    //in dota paynin ham ehtemalan bara palm rejection estefade mishan 
    let touchWidth = ev.width
    let touchHeight = ev.height

    //ta inja marboot bood be event baed az in marboote be element

    let ElementOffsetHeight = ev.srcEvent.srcElement.offsetHeight
    let ElementOffsetWidth = ev.srcEvent.srcElement.offsetWidth // this is actual width, (content + border), scale does not affect this

    // let srcElementHeight = ev.srcEvent.srcElement.clientHeight
    // let srcElementWidth = ev.srcEvent.srcElement.clientWidth // this is width - (border*2) has no use

    // let ElementClientLeft = ev.srcEvent.srcElement.clientLeft // only border width affect this, transform, margina and padding do not affect this, so has no use
    // let ElementClientTop = ev.srcEvent.srcElement.clientTop


    // let ElementOffsetTop = ev.srcEvent.srcElement.offsetTop
    // let OffsetLeft = ev.srcEvent.srcElement.offsetLeft //only margin left affect this, so has no use


    //let offcetParent = ev.srcEvent.srcElement.offsetParent.attributes
    //scroll ham ehtemalan alan morede niyaze ma nistan 
    // let ElemenScrollLeft = ev.srcEvent.srcElement.scrollLeft
    // let ElemenScrollTop = ev.srcEvent.srcElement.scrollTop
    // let ElemenScrollWidth = ev.srcEvent.srcElement.scrollWidth
    // let ElemenScrollHeight = ev.srcEvent.srcElement.scrollHeight

    //get parent height and width also
    //get tanslateX and translateY
    //get width and height after scale


    const lastEvent = ev.type
    console.log(lastEvent)
        // console.log(ev);
    console.log(getRelativePosition(myElement, { x: centerX, y: centerY }, originalSize, scale))

});
hammertime.on("pan", function(ev) {
    const lastEvent = ev.type

    console.log(lastEvent)


});
hammertime.on("panend", function(ev) {
    const lastEvent = ev.type

    console.log(lastEvent)

});