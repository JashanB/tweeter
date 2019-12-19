//creates tweet element and appends to section tweet container
const createTweetElement = function(tweet) {
  //create escape element for tweet content div
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  const $tweet = $('<article>').addClass('tweet');
  let date = Math.floor((Date.now() - tweet.created_at) / 86400000); //converts miliseconds to days
  if (date < 0) {
    date = 0;
  }
  const htmlCode = `
  <header>
    <span class="display-name">${tweet.user.name}</span>
    <span class="twitter-tag">${tweet.user.handle}</span>
    <img src=${tweet.user.avatars}/>
  </header>
  <div>${escape(tweet.content.text)}</div>
  <footer>${date} days ago<img src="/images/twitter-share.png"></footer>
  `
  $tweet.append(htmlCode);
  return $tweet;
}
//loops through tweet data and appends each tweet to section tweet container
const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    $('#tweet-container').prepend(createTweetElement(tweet));
  })
}

$(document).ready(function() {
  //submit tweet to /tweets
  $('#compose-tweet').submit(function () {
    event.preventDefault();
    let formInput = $('#compose-tweet :input').val();
    if (!formInput) {
      $('#error').show();
      $('#error').text('No tweet inputed');
    } else if (formInput.length > 140) {
      $('#error').show();
      $('#error').text('Character limit exceeded');
    } else {
      $('#error').hide();
      $.post({type: "POST", url: '/tweets', data: $('#compose-tweet').serialize(), success: () => {
        loadTweets(); //loads new tweets
      }})  
      $("#compose-tweet").trigger('reset');
    }
  })
  //load tweets posted to /tweets
  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
    .then(function (tweets) {
      renderTweets(tweets);
    })
  }
  //loads current tweets in history
  loadTweets();
})

