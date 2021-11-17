/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = function(tweet) {
    console.log("DATA IS INSIDE");
    console.log(tweet.user.avatars);

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

  renderTweets(data);

});


