"use strict";
/**
* function for when DOM content is loaded
*/
U.ready(function(){
  addSlider();
  U.addHandler(U.$("slider"), "click", hideInfo);
});
/**
* function used to create a slider and a paragraph
*/
function addSlider(){
  if (U.supportsInput("range")){
    var slider = document.createElement("INPUT");
    slider.setAttribute("type", "range");
    slider.max = 75;
    slider.min = 25;
    slider.step = 25;
    slider.defaultValue = 25;
    slider.id = "slider";
    var para = document.createElement("p");
    U.setText(para, "Details:");
    U.$("navbar").appendChild(para);
    U.$("navbar").appendChild(slider);
  }
}
/**
* function used to hide info based on the slider
* @param {EventTarget} e
*/
function hideInfo(e){
  setTimeout(function(){
    var targetName = e.target.id;
    if (targetName === "slide"){
      var core = document.getElementByClassName("core");
      var useful = document.getElementByClassName("useful");
      var bonus = document.getElementByClassName("bonus");
      if (targetName.value === "25"){
        hideInfoHelper(core, "visible", useful, "hidden", bonus, "hidden");
      }else if (U.$(targetName).value === "50"){
        hideInfoHelper(core, "visible", useful, "visible", bonus, "hidden");
      }else{
        hideInfoHelper(core, "visible", useful, "visible", bonus, "visible");
      }
    }
  }, 250);
}
/**
* helper method used for hideInfo used to reduce repetition
* @param {element} object1
* @param {string} string1
* @param {element} object2
* @param {string} string2
* @param {element} object3
* @param {string} string3
*/
function hideInfoHelper(object1, string1, object2, string2, object3, string3){
  if (typeof string1 !== "string" ||
   typeof string2 !== "string" ||
    typeof string3 !== "string") {
    throw new TypeError(errorMsg("Invalid parameters for U.$", arguments));
  }
  if (!(object1 instanceof Element) ||
   !(object2 instanceof Element) ||
    !(object3 instanceof Element)) {
    throw new TypeError(errorMsg("Invalid parameters for U.$", arguments));
  }
  object1.foreEach(function(o){
    o.style.visibility = string;
  });
  object2.foreEach(function(o){
    o.style.visibility = string2;
  });
  object3.foreEach(function(o){
    o.style.visibility = string3;
  });
}
