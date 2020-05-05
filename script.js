const parent = document.getElementById('container')
const moveable = new Moveable(parent, {
        target: document.querySelector(".moveable"),
        draggable: true,
        resizable: true,
        scalable: true,
        rotatable: true,
        warpable: true,
        // Enabling pinchable lets you use events that
        // can be used in draggable, resizable, scalable, and rotateable.
        pinchable: true, // ["resizable", "scalable", "rotatable"]
        origin: true,
        keepRatio: true,
        // Resize, Scale Events at edges.
        edge: false,
        throttleDrag: 0,
        throttleResize: 0,
        throttleScale: 0,
        throttleRotate: 0,

    })
    //moveable.bounds = { left: 0, right: 100, top: 0, bottom: 100 };
    // moveable.on("drag", ({ target, left, top, beforeDelta }) => {

//     target.style.left = left + "px";
//     target.style.top = top + "px";
//     console.log(left)
//         //console.log(beforeDelta)
//         /* translate[0] += beforeDelta[0]; */
//         /* translate[1] += beforeDelta[1]; */
//         /* target.style.transform
//             = "translateX(" + translate[0] + "px) "
//             + "translateY(" + translate[1] + "px)"; */
// });


moveable.on("dragStart", ({ target, clientX, clientY }) => {
    console.log("onDragStart", target);
}).on("drag", ({
    target,
    transform,
    left,
    top,
    right,
    bottom,
    beforeDelta,
    beforeDist,
    delta,
    dist,
    clientX,
    clientY,
}) => {
    console.log(clientX)
        //  console.log("onDrag left", left);
        // if (left > 0) {
        //     target.style.left = 0 + "px";

    // } else if (left < 0) {
    //     target.style.left = 0 + "px";

    // } else {
    //     target.style.left = left + "px";

    // }

    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
    // console.log("onDrag translate", dist);
    // target!.style.transform = transform;
}).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
    console.log("onDragEnd", target, isDrag);
});




moveable.on("pinchStart", ({ target, clientX, clientY }) => {
    // pinchStart event occur before dragStart, rotateStart, scaleStart, resizeStart
    console.log("onPinchStart");
}).on("pinch", ({ target, clientX, clientY, datas }) => {
    // pinch event occur before drag, rotate, scale, resize
    console.log("onPinch");
}).on("pinchEnd", ({ isDrag, target, clientX, clientY, datas }) => {
    // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
    console.log("onPinchEnd");
});