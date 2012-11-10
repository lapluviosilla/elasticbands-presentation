var pres = {};
(function(t) {
  
  // events
  t.onnext = function(selector, callback) {
    $(selector).bind("showoff:next", callback);
  }
  
  // slides
  

  t.decorate = function(event) {
    var h1 = $(event.target).find("h1");
    if (h1.css("text-decoration") === "none") {
      event.preventDefault();
      h1.css({textDecoration: "line-through"});
    }
  }
  
  
})(pres);
