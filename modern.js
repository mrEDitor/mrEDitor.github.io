document.addEventListener("DOMContentLoaded", function() {
  if (location.search == "?print") {
    var elements = document.querySelectorAll('[data-abbr]');
    for ( var i = 0; i < elements.length; i++ ) {
      elements[i].innerHTML = elements[i].dataset['abbr'];
    }
  }
});
