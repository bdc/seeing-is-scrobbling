seeing-is-scrobbling
====================

Uh what?
--------

Our experience listening to music changes dramatically when we add visuals. This tool aims to do just that: supplement the audio experience with a relevant video.

Seeing-is-Scrobbling will search for the most relevant Youtube video that matches what you're listening to, so that you can watch it while listening.

How?
----

To use this, you'll need to be scrobbling.[1] Your music application sends data to the Last.fm scrobbling service, which is published on the web. Seeing-is-Scrobbling reads from Last.fm's scrobbling data.

Nearly every internet-connected music application already has scrobbling attached, you just need to enable it and point it at your Last.fm account.

Hint: In Mac Spotify, you can do this by going to Spotify-&gt;Preferences, and select 'Scrobble to Last.fm'.

[1] http://en.wikipedia.org/wiki/Scrobbling


Advantages
----------

When you use Seeing-is-Scrobbling, you are using two separate processes to hear and see your music. This means you can use it with any music application that scrobbles - you don't have to make a playlist on Youtube to see videos! Also, if your video skips (perhaps due to a bandwidth squeeze), your audio is unaffected. Since the scrobbling connection goes over the web, you can listen and watch on different devices - for example, open Spotify on a device connected to your speakers, and open Seeing-is-Scrobbling on a device with a large screen (such as your TV, using a wired connection or chromecast).

Disadvantages
-------------

While the aim is to provide a relevant visual experience, it's not perfect.

Bad syncing is the principal disadvantage of using this. The audio and video are almost certainly not going to be perfectly synced. In some cases, the audio and video versions of the songs are different lengths, when one contains an intro and an outro, making this quite noticeable.

Sometimes the most relevant video is difficult to identify. At this time, the video with the most views is selected as most relevant, which works in 95% of cases.

Improvements
------------

Easy:

* Provide a nicer welcome screen that allows the user to enter their last.fm username.
* Allow a user to configure preferred settings, such as stream quality.

Hard:

* Reliable syncing between audio and video.

Feedback
--------
adambildersee@gmail.com



