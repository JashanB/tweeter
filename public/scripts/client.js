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
  //submit tweet to /tweets
  $('#compose-tweet').submit(function () {
    event.preventDefault();
    let formInput = $('#compose-tweet :input').val();
    console.log('form submitted');
    console.log(formInput)
    if (!formInput) {
      alert('No tweet inputed');
    } else if (formInput.length >140) {
      alert('Character limit exceeded');
    } else {
      $.post({type: "POST", url: '/tweets', data: $('#compose-tweet').serialize(), success: () => {
        console.log('msg sent');
      }})  
    }
  })
  //load tweets posted to /tweets
  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
    .then(function (tweets) {
      console.log('tweets processed')
      renderTweets(tweets)
    })
  }
  loadTweets();
})

