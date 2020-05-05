TouchEmulator();
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