"use strict";
/** Teaches IE < 9 to recognize HTML5 elements. */
U.ready(function(){
  createDummyElements();
  disabledJavaScript();
});


function createDummyElements() {
  var semanticElements = [
    "article", "aside", "details", "figcaption", "figure",
    "footer", "header", "hgroup", "menu", "nav", "section"
  ];
  for (var i = 0; i < semanticElements.length; i++) {
    document.createElement(semanticElements[i]);
  }
}

function disabledJavaScript() {
  var hideList = U.$("hide");
  hideList.style.display = "none";
}
