import webapp2
import os, json
import jinja2
import youspot

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__) + '/../templates'),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class WelcomeHandler(webapp2.RequestHandler):
  def get(self):
    self.response.headers['Content-Type'] = 'text/html'
    self.response.write('Welcome! Visit /u/&lt;last.fm username> to get started.')

class ViewerHandler(webapp2.RequestHandler):
  def get(self, **kwargs):
    self.response.headers['Content-Type'] = 'text/html'
    template = JINJA_ENVIRONMENT.get_template('viewer.html')
    self.response.write(template.render({
      'username': kwargs['username']
    }))

class NowPlayingHandler(webapp2.RequestHandler):
  def get(self):
    rsp = youspot.GetNowPlaying(self.request.get('username'),
        self.request.get('last_scrobbled_track_id'))
    self.response.headers['Content-Type'] = 'application/json'
    self.response.write(json.dumps(rsp))

application = webapp2.WSGIApplication([
  webapp2.Route('/u/<username>', handler=ViewerHandler),
  webapp2.Route('/q/nowplaying', handler=NowPlayingHandler),
  webapp2.Route('/', handler=WelcomeHandler),
], debug=True)

