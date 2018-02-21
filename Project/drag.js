"use strict";
var gallery = {
  "currentImg": 0,
  "flipped" : false,
  "selected" : false,
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
  ],
};
/**   function whose goal is to activate the functions after the DOM content was loaded  */
U.ready(function(){
  preloadImages();
  U.addHandler(document, "click", selectImage);
  U.addHandler(document, "drag", moveImage)
  U.addHandler(document, "dblclick", flipImage);

});

/**  function whose goal is to preload all the images */
function preloadImages() {
  return gallery.imgFiles.map(function(i) {
    var element = new Image();
    element.id = "slides";
    element.alt = "spider slideshow";
    element.src = "images/" + i;
    element.zindex = gallery.currentImg;
    element.style.position = "absolute";
    element.style.top = "4" + gallery.currentImg / "2" + "%";
    element.style.left = "3" + gallery.currentImg / "2" + "%";
    element.setAttribute("id", i);
    U.$("container").style.paddingBottom = "400px";
    U.$("container").appendChild(element);
    gallery.currentImg = gallery.currentImg + 2;
    return element;
  });
}
/**  function whose goal is to focus on an image after it got clicked
 *  @param {EventTarget} e
 */
function selectImage(e){
  var move = e || window.event;
  var targetName = move.target.id;
  var eleId = U.$(targetName);
  var verifier = targetName.substring(targetName.length - 3, targetName.length)
  if (verifier === "jpg"){
    if (!gallery.selected){
      gallery.selected = !gallery.selected;
      eleId.style.border = "thick solid black"
      eleId.zindex = 50;
    }else{
      resetImages();
    }
    eleId.style.border = "thick solid black"
  }
}
/**  function whose goal is to move the images when they are being dragged
 * @param {EventTarget} e
 */
function moveImage(e){
  setTimeout(function(){
    var move = e || window.event;
    var targetName = move.target.id;
    var eleId = U.$(targetName);
    var verifier = targetName.substring(targetName.length - 3, targetName.length)
    if (verifier === "jpg"){
      eleId.style.left = move.clientX + "px";
      eleId.style.top = move.clientY + "px";
    }
  }, 20);
}

/** function whose goal is to flip the image if double clicked
 *  @param {EventTarget} e
 */
function flipImage(e){
  var move = e || window.event;
  var targetName = move.target.id;
  var eleId = U.$(targetName);
  var verifier = targetName.substring(targetName.length - 3, targetName.length)
  if (verifier === "jpg"){
    if (!gallery.flipped){
      /**
      * DELETE THIS ONCE fixed
      * DOES NOT WORK, BACKGROUND DOES NOT CHANGE ANYTHING
      * VISIBILITY MAKES IT IMPOSSIBLE TO SEE IT AGAIN
      */
      eleId.style.backgroundColor = "white";
    }else{
      eleId.style.backgroundColor = "none";
    }
    gallery.flipped = !gallery.flipped;
  }
}


/** function whose goal is to help reset the border and zindex of all the images  */
function resetImages(){
  gallery.currentImg = 0;
  gallery.imgFiles.forEach(function(o){
    U.$(o).style.border = "none";
    U.$(o).zindex = gallery.currentImg;
    gallery.currentImg = gallery.currentImg + 2;
  });
}
