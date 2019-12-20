//return time accurately
const currentTime = function(time) {
  let reportedTime = 0;
  if (Math.floor((Date.now() - time) / 86400000) > 0) {
    reportedTime = Math.floor((Date.now() - time) / 86400000);
    if (reportedTime === 1) {
      return reportedTime + ' day ago';
    } else {
      return reportedTime + ' days ago';
    }
  } else if (Math.floor((Date.now() - time) / 3600000) > 0) {
    reportedTime = Math.floor((Date.now() - time) / 3600000);
    if (reportedTime === 1) {
      return reportedTime + ' hour ago';
    } else {
      return reportedTime + ' hours ago';
    }
  } else if (Math.floor((Date.now() - time) / 60000) > 0) {
    reportedTime = Math.floor((Date.now() - time) / 60000);
    if (reportedTime === 1) {
      return reportedTime + ' minute ago';
    } else {
      return reportedTime + ' minutes ago';
    }
  } else {
    reportedTime = Math.floor((Date.now() - time) / 1000);
    if (reportedTime < 0) {
      reportedTime = 0;
    }
    if (reportedTime === 1) {
      return reportedTime + ' second ago';
    } else {
      return reportedTime + ' seconds ago';
    }
  }
};
//creates tweet element and appends to section tweet container
const createTweetElement = function(tweet) {
  //create escape element for tweet content div
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //creates tweet article for each tweet
  const $tweet = $('<article>').addClass('tweet');
  const htmlCode = `
  <header>
    <span class="display-name">${tweet.user.name}</span>
    <span class="twitter-tag">${tweet.user.handle}</span>
    <img src=${tweet.user.avatars}/>
  </header>
  <div>${escape(tweet.content.text)}</div>
  <footer>${currentTime(tweet.created_at)}<img class="share" src="/images/twitter-share.png"></footer>
  `;
  $tweet.append(htmlCode);
  return $tweet;
};
//loops through tweet data and appends each tweet to section tweet container
const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    $('#tweet-container').prepend(createTweetElement(tweet));
  });
};

$(document).ready(function() {
  //submit tweet to /tweets
  $('#compose-tweet').submit(function() {
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
      $.post({
        type: "POST", url: '/tweets', data: $('#compose-tweet').serialize(), success: () => {
          loadTweets(); //loads new tweets
        }
      });
      $("#compose-tweet").trigger('reset');
      $('.counter').text('140');
    }
  });
  //load tweets posted to /tweets
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };
  //loads current tweets in history
  loadTweets();
});

