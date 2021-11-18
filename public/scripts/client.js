/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(tweet) {

    const $tweetArticle = $('<article class="tweet-post"></article>')
    const $tweetHeader = $('<header class="tweet-header-footer"></header >')
    const $tweetFooter = $('<footer class="tweet-header-footer"></footer>')

    const $imageDiv = $('<div><img src=' + tweet.user.avatars + '/></div>')
    const $nameDiv = $('<div><h3>' + tweet.user.name + '</h3></div>')
    const $handleDiv = $('<div><p>' + tweet.user.handle + '</p></div>')

    const $messageDiv = $('<div class="tweet-message-div"><span>' + tweet.content.text + '</span></div>')

    const $dateDiv = $('<div><span>' + timeago.format(tweet.created_at) + '</span></div>')
    const $tweetOptionsDiv = $('<div><span class="flag"> <i class="fas fa-flag"></i> </span><span class="retweet"> <i class="fas fa-retweet"></i> </span><span class="heart"> <i class="fas fa-heart"></i> </span></div>')

    $tweetHeader.append($imageDiv);
    $tweetHeader.append($nameDiv);
    $tweetHeader.append($handleDiv);

    $tweetFooter.append($dateDiv);
    $tweetFooter.append($tweetOptionsDiv);

    $tweetArticle.append($tweetHeader);
    $tweetArticle.append($messageDiv);
    $tweetArticle.append($tweetFooter); 

    $('#tweet-section').append($tweetArticle);
    
  }

  const renderTweets = function(tweets) {
    let $tweet;
    for (const tweet of tweets) {
      createTweetElement(tweet);
      $tweet = $('#tweet-section').append(tweet);
    }
    return $tweet;
  }

  $("form").on("submit", function (event) {
    
    event.preventDefault();
      
    if ($("#tweet-text").val().length === 0) {
      alert("No tweet content present");
      return;
    }

    if ($("#tweet-text").val().length > 140) {
      alert("Too many Characters");
      return;
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize(),
    })

  });

  const loadTweets = function() {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    }).then((result) => {
      renderTweets(result);
    });
  }

  loadTweets();
});


