$(document).ready(function() {

  // JS logic for Character count when composing a new tweet.
  let characterCount = 140;
  $("#tweet-text").on('input', function() {
    let counter = $(this)
      .parents("form")
      .children("#tweet-submit-div")
      .children("output.counter");
    counter.val(characterCount - this.value.length);
    if (counter.val() < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });

});