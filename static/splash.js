var youtubePlayers = {'A': null, 'B': null, 'active': null, 'inactive': null};
var PREVIEW_CHANGE_MILLISECONDS = 7000;

$(document).ready(function() {

  $('#huh').click(function() {
    alert('huh!');
  });
  $('#username').focus().keypress(function(e) {
    if (e.which == 13) {
      location.href = 'u/' + $('#username').val();
    }
  });
  var previewInterval = setInterval(
    ChangePlayerPreview, PREVIEW_CHANGE_MILLISECONDS);
  SetPlayerSize();

  function SetPlayerSize() {
    max_w = window.innerWidth;
    max_h = window.innerHeight;
    player_ratio = 640/390;
    if(max_w / player_ratio > max_h)
    {
      new_h = max_h;
      new_w = max_h * player_ratio;
    }
    else
    {
      new_w = max_w;
      new_h = max_w / player_ratio;
    }
    margin_l = (max_w - new_w) / 2;
    margin_t = (max_h - new_h) / 2;
    $('.player embed').attr('width', new_w).attr('height', new_h);
    $('.player').css('margin-left', margin_l + 'px');
    $('.player, .framed').css('margin-top', margin_t + 'px');
  }
  $(window).resize(SetPlayerSize);


});

var playerPreviewVideos_ = [
  {v: 'QK8mJJJvaes', t: 40}, /* Macklemore Thrift Shop */
  {v: 'CFWX0hWCbng', t: 202}, /* Ke$ha Blow */
  {v: 'ktvTqknDobU', t: 162}, /* Imagine Dragons Radioactive */
  {v: 'w8KQmps-Sog', t: 122}, /* Muse Uprising */
  {v: 'KQ6zr6kCPj8', t: 223}, /* LMFAO Party Rock */
  {v: 'YJVmu6yttiw', t: 102}, /* Skrillex Bangarang */
  {v: 'sOnqjkJTMaA', t: 542}, /* Michael Jackson Thriller */
  {v: 'PQHPYelqr0E', t: 157}, /* Weezer Pork and Beans */
  {v: 'EVBsypHzF3U', t: 379}, /* Lady Gaga Telephone */
  {v: 'Whv1tLqKZig', t:40}, /* Hollerado Americanarama */
  {v: '12zJw9varYE', t:42}, /* OK Go WTF */
  ];
function ChangePlayerPreview() {
  var activePlayer = youtubePlayers[youtubePlayers['active']];
  if (!activePlayer) {
    return;
  }
  // get the actively playing video id
  var videoUrl = activePlayer.getVideoUrl();
  var r = /\bv=([\w-]+)/.exec(videoUrl);
  var nowPlayingV = r ? r[1] : null;
  var nextV = null;
  // select a new video that is different
  while (true) {
    var nextV = playerPreviewVideos_[
        Math.floor(Math.random()*playerPreviewVideos_.length)];
    if (nextV.v !== nowPlayingV) {
      break;
    }
  }
  // load the new video
  var inactivePlayer = youtubePlayers[youtubePlayers['inactive']];
  inactivePlayer.loadVideoById(nextV.v, nextV.t, 'hd720');
}

function onYouTubePlayerReady(playerId)
{
  player = $('#youtubeplayer_' + playerId)[0];
  player.mute();
  player.addEventListener(
      'onStateChange', 'onPlayer' + playerId + 'StateChange');
  youtubePlayers[playerId] = player;
  if (!youtubePlayers['active']) {
    youtubePlayers['active'] = playerId;
  }
  else {
    youtubePlayers['inactive'] = playerId;
    ChangePlayerPreview();
  }
}

function onPlayerStateChange(playerId, state) {
  var otherPlayerId = (playerId === 'A' ? 'B' : 'A');
  if (youtubePlayers['inactive'] === playerId &&
      state === YT.PlayerState.PLAYING) {
    var thisPlayer = youtubePlayers[playerId];
    var otherPlayer = youtubePlayers[otherPlayerId];
    $(otherPlayer).closest('div').fadeTo(1000, 0, function() {
      otherPlayer.pauseVideo();
    });//, otherPlayer.pauseVideo);
    $(thisPlayer).closest('div').fadeTo(1000, 1);
    youtubePlayers['active'] = playerId;
    youtubePlayers['inactive'] = otherPlayerId;
  }
}

function onPlayerAStateChange(state) {
  onPlayerStateChange('A', state);
}

function onPlayerBStateChange(state) {
  onPlayerStateChange('B', state);
}



