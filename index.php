<?php //dynamically fetch params
$PULSE_SDK_VERSION = null;
$VIDEO_JS_VERSION = null;
$CONTRIB_ADS_VERSION = null;
//defaults
$defaultSDK = "latest";
$defaultVIDEOJS = "6.4.0";
$defaultCONTRIBADS = "5.0.4-0";
$sdklink = "resources";
$service = "vp";

if(isset($_GET['pulseSDK']) && isset($_GET['videoJS']) && isset($_GET['contribAds'])) {

  $PULSE_SDK_VERSION = "pulse-sdk-html5-" . $_GET['pulseSDK'];
  $VIDEO_JS_VERSION = $_GET['videoJS'];
  $CONTRIB_ADS_VERSION = $_GET['contribAds'];

    switch ($PULSE_SDK_VERSION) {
      case "pulse-sdk-html5-latest": $PULSE_SDK_VERSION = "pulse-sdk-html5/2.1/". $defaultSDK;
      $sdklink = "proxy";
      $service = "service";
      break;
      default: $PULSE_SDK_VERSION = "pulse-sdk-html5/2.1/" . "pulse-sdk-html5-" . $_GET['pulseSDK'];
    }
    switch ($VIDEO_JS_VERSION) {
      case "latest": $VIDEO_JS_VERSION = $defaultVIDEOJS;
      break;
      default: $VIDEO_JS_VERSION = $_GET['videoJS'];
    }
    switch ($CONTRIB_ADS_VERSION) {
      case "latest": $CONTRIB_ADS_VERSION = $defaultCONTRIBADS;
      break;
      default: $CONTRIB_ADS_VERSION = $_GET['contribAds'];
    }
}
?>

<html>
<head>
    <title>VideoJS Pulse ad player bridge</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/<?php echo $CONTRIB_ADS_VERSION; ?>/videojs-contrib-ads.min.css">
<link rel="stylesheet" href="css/style.min.css" />
</head>
<body>
  <div id="root"></div>
  <script src="js/bundle.min.js"></script>
    <!-- Scripts: Pulse SDK, Ad Player skin, Brightcove player source, videojs-contrib-ads, this plugin -->
    <script src="http://<?php echo $service; ?>.videoplaza.tv/<?php echo $sdklink; ?>/<?php echo $PULSE_SDK_VERSION; ?>.min.js"></script>
    <script src="https://service.videoplaza.tv/proxy/pulse-sdk-html5-skin/base.min.js"></script>
    <script src="https://players.brightcove.net/3110396001/ryoaUBpYZ_default/index.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/<?php echo $CONTRIB_ADS_VERSION; ?>/videojs-contrib-ads.min.js"></script>
    <script src="https://vp.videoplaza.tv/resources/pulse-sdk-html5-bridges/videojs/videojs.pulse-2.0.13.min.js"></script>
</body>
</html>