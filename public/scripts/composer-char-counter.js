$(document).ready(function() {

  let characterCount = 140;
  $("#tweet-text").on('input', function() {
    let counter = $(this)
      .parents("form")
      .children("#tweet-submit-div")
      .children("output.counter");
    counter.val(characterCount - this.value.length)
    if (counter.val() < 0) {
      counter.css("color", "red")
    } else {
      counter.css("color", "black")
    }  
  });

  $(".tweet-post").on({
    mouseenter: function () {
      console.log("red")
      $(this).css("box-shadow", "0.25em 0.25em #008000")
    },
    mouseleave: function () {
      $(this).css("box-shadow", "none")
    }
  });
  
  $(".flag").on({
    mouseenter: function () {
      $(this).css("color", "gold")
    },
    mouseleave: function () {
      $(this).css("color", "black")
    }
  });

  $(".retweet").on({
    mouseenter: function () {
      $(this).css("color", "gold")
    },
    mouseleave: function () {
      $(this).css("color", "black")
    }
  });

  $(".heart").on({
    mouseenter: function () {
      $(this).css("color", "gold")
    },
    mouseleave: function () {
      $(this).css("color", "black")
    }
  });
});