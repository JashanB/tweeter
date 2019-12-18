// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]
//creates tweet element and appends to section tweet container
const createTweetElement = function(tweet) {
  const $tweet = $('<article>').addClass('tweet');
  const date = Math.floor((Date.now() - tweet.created_at) / 86400000); //converts miliseconds to days
  const htmlCode = `
  <header>
    <span class="display-name">${tweet.user.name}</span>
    <span class="twitter-tag">${tweet.user.handle}</span>
    <img src=${tweet.user.avatars}/>
  </header>
  <div>${tweet.content.text}</div>
  <footer>${date} days ago<img src="/images/twitter-share.png"></footer>
  `
  $tweet.append(htmlCode);
  return $tweet;
}
//loops through tweet data and appends each tweet to section tweet container
const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    $('#tweet-container').append(createTweetElement(tweet));
  })
}

$(document).ready(function() {
  $('#compose-tweet').submit(function () {
    event.preventDefault();
    console.log('form submitted');
    $.post({type: "POST", url: '/tweets/', data: $('#compose-tweet').serialize(), success: () => {
      console.log('msg sent');
    }})
  })
  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
    .then(function (tweets) {
      console.log('tweets processed')
      renderTweets(tweets)
    })
  }
  loadTweets();
})
//ajax submit form 
