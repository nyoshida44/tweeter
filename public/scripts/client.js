/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Function to ensure text in form can cause Cross-site scripting.
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function that acts a DOM template for a tweet article.
  const createTweetElement = function(tweet) {

    const $tweetArticle = $('<article class="tweet-post"></article>');
    const $tweetHeader = $('<header class="tweet-header-footer"></header >');
    const $tweetFooter = $('<footer class="tweet-header-footer"></footer>');

    const $imageDiv = $('<div><img src=' + tweet.user.avatars + '/></div>');
    const $nameDiv = $('<div><h3>' + tweet.user.name + '</h3></div>');
    const $handleDiv = $('<div><p>' + tweet.user.handle + '</p></div>');

    const $messageDiv = $('<div class="tweet-message-div"><span>' + escape(tweet.content.text) + '</span></div>');

    const $dateDiv = $('<div><span>' + timeago.format(tweet.created_at) + '</span></div>');
    const $tweetOptionsDiv = $('<div><span class="flag"> <i class="fas fa-flag"></i> </span><span class="retweet"> <i class="fas fa-retweet"></i> </span><span class="heart"> <i class="fas fa-heart"></i> </span></div>');

    $tweetHeader.append($imageDiv);
    $tweetHeader.append($nameDiv);
    $tweetHeader.append($handleDiv);

    $tweetFooter.append($dateDiv);
    $tweetFooter.append($tweetOptionsDiv);

    $tweetArticle.append($tweetHeader);
    $tweetArticle.append($messageDiv);
    $tweetArticle.append($tweetFooter);

    return $tweetArticle;
    
  };

  // Render tweet appends our index.html with created tweet elements. Used when first loading the website.
  const renderTweets = function(tweets) {
    let $tweet;
    for (const tweet of tweets) {
      $tweet = $('#tweet-section').prepend(createTweetElement(tweet));
    }
    return $tweet;
  };

  // Load tweets retrieves the data from /tweets and passes it to renderTweets to be appended to the HTML.
  const loadTweets = function() {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    }).then((result) => {
      renderTweets(result);
    });
  };

  // JS Scripting for the form element. Occurs when you click the Tweet Button.
  $("form").on("submit", function(event) {
    
    // Prevents HTML logic for button. Does everything below instead.
    event.preventDefault();
    
    // Error checks. Will reveal the hidden error section if error applies.
    if ($("#tweet-text").val().length === 0) {
      $("#error-section").slideDown("slow", function() {
        $("#error-span").html("⚠️ ERROR: No characters ⚠️");
      });
      return;
    }

    if ($("#tweet-text").val().length > 140) {
      $("#error-section").slideDown("slow", function() {
        $("#error-span").html("⚠️ ERROR: Too many characters ⚠️");
      });
      return;
    }

    $("#error-section").slideUp("slow");

    // Ajax request so we don't have to reload page for new tweets. Prepends new tweet as soon as the TWeet Button is clicked.
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize(),
    }).then(() => {
      $.ajax({
        url: "http://localhost:8080/tweets",
        method: "GET",
      }).then((result) => {
        let lastTweet = result[Object.keys(result)[Object.keys(result).length - 1]];
        $('#tweet-section').prepend(createTweetElement(lastTweet));
      });
    });

    // Clears form after successful submission.
    $("form")[0].reset();

  });

  // loadTweets() occurs everytime we open/refresh the page.
  loadTweets();

});


