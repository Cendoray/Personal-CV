"use strict";
createDummyElements();
/** function for when DOM content is loaded */
U.ready(function(){
  disabledJavaScript();
});

/** Teaches IE < 9 to recognize HTML5 elements. */
function createDummyElements() {
  var semanticElements = [
    "article", "aside", "details", "figcaption", "figure",
    "footer", "header", "hgroup", "menu", "nav", "section"
  ];
  for (var i = 0; i < semanticElements.length; i++) {
    document.createElement(semanticElements[i]);
  }
}
/** function used to disable the paragraph letting the user know javascript is unavailable*/
function disabledJavaScript() {
  var hideList = U.$("hide");
  hideList.style.display = "none";
}
