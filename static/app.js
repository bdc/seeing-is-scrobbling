
$(document).ready(function() {
  setInterval(Check, 1800);
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
    $("#youtube").attr('width', new_w);
    $("#youtube").attr('height', new_h);
    $("#youtube embed").attr('width', new_w);
    $("#youtube embed").attr('height', new_h);
  }
  $(window).resize(SetPlayerSize);

  function Check() {
    $.ajax({
      type: "GET",
      url: "/q/nowplaying",
      dataType: "json",
      data: {
        username: $("#username").html(),
        last_scrobbled_track_id: $("#last_scrobbled_track_id").val()
      },
    }).done(function(rsp) {
      if(rsp.debug) {
        $("#debug").html(rsp.debug);
      }
      if(rsp.scrobble_data && rsp.scrobble_data.track_id) {
        new_track_id = rsp.scrobble_data.track_id;
        if(new_track_id !== $("#last_scrobbled_track_id").val()) {
          if(rsp.youtube_data && rsp.youtube_data.video_id) {
            $("#nowplaying").text(rsp.youtube_data.video_title);
            $("#last_scrobbled_track_id").val(new_track_id);
            SetPlayerSize();
            // https://developers.google.com/youtube/js_api_reference
            $("#youtubeplayer")[0].loadVideoById(rsp.youtube_data.video_id, 6,
                'hd720');
            $("#youtubeplayer")[0].mute();
          }
        }
      }
      else {
        $("#nowplaying").text("Nothing is playing.");
      }
    });
  }

  Check();
});

function onYouTubePlayerReady()
{
  $("#youtubeplayer")[0].mute();
}


