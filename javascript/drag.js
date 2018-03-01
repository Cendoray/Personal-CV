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
  ],
  "selectedImg" : "",
};
/**   function whose goal is to activate the functions after the DOM content was loaded  */
U.ready(function(){
  preloadImages();
  U.addHandler(U.$("container"), "mousedown", selectImage);
  U.addHandler(U.$("container"), "dblclick", flipImage);
  U.addHandler(U.$("container"), "mouseup", resetMove);
});

/**  function whose goal is to preload all the images */
function preloadImages() {
  for (var i = 0 ; i < gallery.imgFiles.length; i++){
    var element = new Image();
    var name = gallery.imgFiles[i].substring(0, gallery.imgFiles[i].length - 4);
    element.id = "slides";
    element.alt = name
    element.src = "../images/" + gallery.imgFiles[i];
    element.ondragstart = function() { return false;};
    element.zindex = gallery.currentImg;
    element.setAttribute("id", gallery.imgFiles[i]);
    var div = document.createElement("figure");
    div.ondragstart = function() { return false;};
    div.id = name;
    div.style.width = "200px";
    div.style.height = "200px";
    div.style.position = "absolute";
    element.style.position = "absolute";
    div.style.top = "2" + gallery.currentImg / "2" + "%";
    div.style.left = "3" + gallery.currentImg / "2" + "%";
    div.style.backgroundColor = "white";
    U.$("container").appendChild(div);
    U.$("container").style.height = "400px";
    U.$(name).appendChild(element);
    gallery.currentImg = gallery.currentImg + 2;
  }
}

/**  function whose goal is to focus on an image after it got clicked
 *  @param {EventTarget} e
 */
function selectImage(e){
  var move = e || window.event;
  var target = move.target || move.srcElement
  var targetName = target.id;
  var verifier = targetName.substring(targetName.length - 3, targetName.length);
  resetImages();
  if (verifier === "jpg"){
    U.addHandler(U.$("container"), "mousemove", mouseMove);
    target.parentElement.style.border = "thick solid black"
    target.parentElement.style.zIndex = "50";
    gallery.selectedImage = target.parentElement;
  }else if (targetName !== "container"){
    U.addHandler(U.$("container"), "mousemove", mouseMove);
    target.style.border = "thick solid black";
    target.style.zIndex = "50";
    gallery.selectedImage = target;
  }
}

/**
 * removes the "mousemove" handler from all images after you let go
 */
function resetMove(){
  U.removeHandler(U.$("container"), "mousemove", mouseMove);
}


/**s
  * @param {EventTarget} e
  * move the image
 */
function mouseMove(e){
  var move = e || window.event;
  var coords = {
    x : move.clientX + document.documentElement.scrollLeft,
    y : move.clientY + document.documentElement.scrollTop
  };
  setTimeout(function(){
    var xValue = coords.x - gallery.selectedImage.offsetWidth / 2 + "px";
    var yValue = coords.y - U.$("container").offsetTop
    - gallery.selectedImage.offsetHeight / 2  + "px";
    gallery.selectedImage.style.left = xValue;
    gallery.selectedImage.style.top = yValue;
  }, 20);
}

/** function whose goal is to flip the image if double clicked
 *  @param {EventTarget} e
 */
function flipImage(e){
  var move = e || window.event;
  var target = move.target || move.srcElement
  var targetName = target.id;
  if (targetName.substring(targetName.length - 3, targetName.length) === "jpg"){
    target.style.visibility = "hidden";
  }else if (targetName !== "container"){
    target.children[0].style.visibility = "visible";
  }
}


/** function whose goal is to help reset the border and zindex of all the images  */
function resetImages(){
  gallery.currentImg = 0;
  for( var i = 0 ; i < gallery.imgFiles.length; i++){
    U.$(gallery.imgFiles[i]).parentElement.style.border = "none";
    U.$(gallery.imgFiles[i]).parentElement.style.zIndex = gallery.currentImg;
    gallery.currentImg = gallery.currentImg + 2;
  }
}
