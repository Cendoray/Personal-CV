"use strict";
var gallery = {
  "currentImg": 0,
  "flipped" : false,
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
  U.addHandler(U.$("container"), "click", selectImage);
  U.addHandler(U.$("container"), "dblclick", flipImage);
});

/**  function whose goal is to preload all the images */
function preloadImages() {
  return gallery.imgFiles.map(function(i) {
    var element = new Image();
    var name = i.substring(0, i.length - 4);
    element.id = "slides";
    element.alt = name
    element.src = "../images/" + i;
    element.zindex = gallery.currentImg;
    element.setAttribute("id", i);
    var div = document.createElement("figure");
    div.id = name;
    div.style.width = 200;
    div.style.height = 200;
    div.style.position = "absolute";
    element.style.position = "relative";
    div.style.top = "3" + gallery.currentImg / "2" + "%";
    div.style.left = "3" + gallery.currentImg / "2" + "%";
    div.style.backgroundColor = "white";
    U.$("container").appendChild(div);
    U.$("container").style.paddingBottom = "400px";
    U.$(name).appendChild(element);
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
    resetImages();
    U.addHandler(U.$("container"), "mousedown", moveImage);
    eleId.parentElement.style.border = "thick solid black"
    eleId.parentElement.style.zIndex = "50";
  }
}
/**  call the functions when image is clicked
 * @param {EventTarget} e
 */
function moveImage(){
  U.addHandler(document, "mousemove", mouseMove);
  U.removeHandler(document, "mouseup", mouseMove);
  U.removeHandler(document, "mouseup", moveImage);
}
/**
  * @param {EventTarget} e
  * move the image
 */
function mouseMove(e){
  setTimeout(function(){
    var move = e || window.event;
    var targetName = move.target.id;
    var eleId = U.$(targetName);
    var verifier = targetName.substring(targetName.length - 3, targetName.length)
    if (verifier === "jpg"){
      eleId.parentElement.style.left = move.clientX  + "px";
      eleId.parentElement.style.top = move.clientY + "px";
    }
    return false;
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
      eleId.style.visibility = "hidden";
    }else{
      eleId.style.backgroundColor = "visible";
    }
    gallery.flipped = !gallery.flipped;
  }
}


/** function whose goal is to help reset the border and zindex of all the images  */
function resetImages(){
  gallery.currentImg = 0;
  gallery.imgFiles.forEach(function(o){
    U.$(o).parentElement.style.border = "none";
    U.$(o).parentElement.style.zIndex = gallery.currentImg;
    U.removeHandler(U.$(o).parentElement, "mousedown", moveImage);
    gallery.currentImg = gallery.currentImg + 2;
  });
}
