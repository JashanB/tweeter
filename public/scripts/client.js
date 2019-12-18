/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
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
  const $tweet = $('<article>').addClass('tweet');
  const date = Math.floor((Date.now() - tweet.created_at) / 86400000);
  const htmlCode = `
  <header>
    <span class="span-one">${tweet.user.name}</span>
    <span class="span-two">${tweet.user.handle}</span>
    <img src=${tweet.user.avatars}/>
  </header>
  <div>${tweet.content.text}</div>
  <footer>${date} days ago<img src="/images/twitter-share.png"></footer>
  `
  $tweet.append(htmlCode);
  return $tweet;
}

const $tweet = createTweetElement(tweetData[0]);
$(document).ready(function() {
  $('#tweet-container').append($tweet);
})

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
}


renderTweets(tweetData);
