"use strict";

U.ready(function(){
  addSlider();
});

function addSlider(){
  if (U.supportsInput("range")){
    var slider = document.createElement("INPUT");
    slider.setAttribute("type", "range");
    slider.max = 3;
    slider.min = 1;
    slider.step = 3;
    slider.defaultValue = 1;
    document.body.appendChild(slider);
  }
}
