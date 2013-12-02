#!/usr/bin/python

import pylast
import sis_api_keys
from apiclient import discovery

DATA = sis_api_keys.DATA

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
  # Fetches by relevance and find the one with the most views.
  # Can't order by most views because youtube will serve something really
  # popular and likely unrelated.
  req = svc.search().list(part='id,snippet', order='relevance',
      q=query, safeSearch='none', type='video', videoEmbeddable='true')
  rsp = req.execute()
  video_ids = [item['id']['videoId'] for item in rsp['items']]
  best_video = _GetMostViewedYoutubeVideo(video_ids)
  return {
      'video_title': best_video['snippet']['title'],
      'video_id': best_video['id'],
      }

def _GetMostViewedYoutubeVideo(video_ids):
  svc = discovery.build('youtube', 'v3', developerKey=DATA['GoogleApiKey'])
  req = svc.videos().list(part='id,snippet,statistics',id=','.join(video_ids))
  rsp = req.execute()
  max_views = 0
  best_video = None
  for item in rsp['items']:
    if int(item['statistics']['viewCount']) > max_views:
      best_video = item
      max_views = int(item['statistics']['viewCount'])
  return best_video



