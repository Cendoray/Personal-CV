"use strict";
var gallery = {
  "currentImg": 0,
  "imgFiles": [
    "cat.jpg",
    "doge.jpg",
    "dolphin.jpg",
    "leopard.jpg",
    "mouse.jpg",
    "parrot.jpg",
    "polarbear.jpg",
    "tortoise.jpg",
    "owl.jpg"
  ]
};

U.ready(function(){
  preloadImages();
});

function preloadImages() {
  return gallery.imgFiles.map(function(i) {
    var element = new Image();
    var x = 50 + i*2;
    element.id = "slides";
    element.alt = "spider slideshow";
    element.src = "images/" + i;
    element.zindex = i;
    element.style.position = "relative";
    element.style.top = x + "%";
    element.style.left = x + "%";
    U.$("container").appendChild(element);
    return element;
  });
}
