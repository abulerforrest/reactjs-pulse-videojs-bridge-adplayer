<h1>Video JS Ooyala Pulse bridge adplayer (v0.1)</h1>

This is a simple Ooyala Pulse [VideoJS bridge] integration which I ported from my earlier simple PHP integration - into React JS.

<b>Previous PHP hacked version:</b><br />
http://alexdev.se/ooyala-tests/ts/videojs/?subdomain=ts-alex&tag=TrainingsPulseAd&contribSDK=5.0.4-0&category=&pulse_preview=&pulse_debug

<b>The React JS production version build:</b><br />
http://alexdev.se/ooyala-tools/videojs-pulsebridge-player/

(Example link with parameters: http://alexdev.se/ooyala-tools/videojs-pulsebridge-player/?pulseSDK=2.1.17.24.1&videoJS=latest&contribAds=latest&subDomain=ts-alex&pulse_preview=&pulseDebug=true&tags=TrainingsPulseAd&shares=Hello,World)

<b>Purpose</b><br />
I initially created the tool for troubleshooting purposes, to be able to target a specific ad in an untampered integration and to be able to set specific options. Then I ported it to React JS for learning purposes (To get started on coding with React JS).

This is not a finished, tool, however it is useful and has some basic options.

If you clone this project to continue it - make sure to have Node JS installed on your machine and run "npm install" in the root directory to get all the needed packages.

<b>Features</b>
<ul>
<li>Local storage - It remembers/populates all parameters/settings</li>
<li>URL - is sharable</li>
<li>Pulse debug - Control debug mode on/off</li>
<li>Subdomain - Enter subdomain (For the Ooyala Pulse account)</li>
<li>Preview - Force preview a specific ad, goal, campaign by entering its ID</li>
<li>Pulse SDK - Select between/test with several Pulse SDK versions</li>
<li>Contrib Ads - Select between/test with several Contrib Ads versions</li>
<li>Targeting - Enter several tags or categories</li>
</ul>
