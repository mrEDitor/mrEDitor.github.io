document.addEventListener("DOMContentLoaded", function() {
  if (location.hash == "print") {
    var elements = document.querySelectorAll('[data-abbr]');
    for ( var i = 0; i < elements.length; i++ ) {
      elements[i].innerHTML = elements[i].dataset['abbr'];
    }
  }
});
