#!/usr/bin/python

import pylast
from apiclient import discovery

DATA = {
    'LastfmApiKey': 'a380eab11f9c1fc7ad5aafd55070d02a',
    'LastfmApiSecret': '9c84ebeaa770894e8ed4801528a4b53a',
    'GoogleApiKey': 'AIzaSyDobYcrDqGVuQomPqX6d4L-BhI1e76My20',
    'GoogleApiSecret': '1SJSwwJvHjIzDMoSl2METexW',
    }

def GetNowPlaying(username, last_scrobbled_track_id):
  rsp = {'username': username}
  scrobble_data = _GetScrobbleData(username)
  if not scrobble_data:
    pass
  elif 'track_id' not in scrobble_data:
    pass
  else:
    rsp['scrobble_data'] = scrobble_data
    if last_scrobbled_track_id != scrobble_data['track_id']:
      youtube_data = _GetYoutubeData(scrobble_data['song_title'],
          scrobble_data['artist_name'])
      rsp['youtube_data'] = youtube_data
  return rsp

def _GetScrobbleData(username):
  lastfm_network = pylast.LastFMNetwork(api_key = DATA['LastfmApiKey'],
      api_secret = DATA['LastfmApiSecret'])
  lastfm_user = pylast.User(username, lastfm_network)
  track = lastfm_user.get_now_playing()
  if not track: return None
  return {
      'track_id': track.get_id(),
      'song_title': track.get_title(),
      'artist_name': track.get_artist().get_name(),
      }

def _GetYoutubeData(song_title, artist_name):
  query = '%s %s' % (song_title, artist_name)
  svc = discovery.build('youtube', 'v3', developerKey=DATA['GoogleApiKey'])
  rsp = svc.search().list(part='id,snippet', order='viewCount', q=query,
      safeSearch='none', type='video', videoEmbeddable='true').execute()
  video = rsp['items'][0]
  return {
      'video_title': video['snippet']['title'],
      'video_id': video['id']['videoId'],
      }



