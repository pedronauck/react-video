/** @jsx React.DOM */

(function() {
  var Video = ReactVideo;
  var $youtubeBtn = document.querySelector('.cover-button-item[data-from="youtube"]');
  var $vimeoBtn = document.querySelector('.cover-button-item[data-from="vimeo"]');
  var mountNode = document.querySelector('#cover-video');

  React.render(<Video from='youtube' videoId='gZD0ahZHgBM' />, mountNode);

  $youtubeBtn.addEventListener('click', function(ev) {
    $youtubeBtn.classList.add('is-active');
    $vimeoBtn.classList.remove('is-active');

    React.unmountComponentAtNode(mountNode);
    React.render(<Video from='youtube' videoId='gZD0ahZHgBM' />, mountNode);
    ev.preventDefault();
  });

  $vimeoBtn.addEventListener('click', function(ev) {
    $vimeoBtn.classList.add('is-active');
    $youtubeBtn.classList.remove('is-active');

    React.unmountComponentAtNode(mountNode);
    React.render(<Video from='vimeo' videoId='63836620' />, mountNode);
    ev.preventDefault();
  });
})();
