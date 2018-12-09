import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {InputAction} from '../actions/index';
import {Alert} from 'react-bootstrap';
import {ToggleCheckbox} from '../actions/index';
import {InputTags} from '../actions/index';
import {InputShares} from '../actions/index';
import {pulsePreview} from '../actions/index';

class VideoPlayer extends Component {

  constructor(props) {
    super(props);

    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    this.state = {
      subDomain: this.props.inputsubdomain.value,
      currentAd: {},
      tags: this.props.inputtags.value,
      shares: this.props.inputshares.value,
      nowPlaying: "",
      debug: this.props.toggle_checkbox.value,
      preview: this.props.pulse_preview.value
    };
  }

adPLayerListener() {

  }

  nowPlaying() {

    return (
      <div>test</div>
    )

  };
  forceUpdateHandler(){
    this.forceUpdate();
  };

  loadPlayer(uniqid) {

  var values = {
    subDomain: this.state.subDomain,
    tags: this.state.tags,
    shares: this.state.shares,
    debug: this.state.debug,
    preview: this.state.preview
  }

  function getQueryStringParams() {
      var params = {};
      var ps = [];
      try{
          if(window){
              if(window.top && window.top.location){
                  ps = window.top.location.search.split("&")
              } else {
                  ps = window.location.search.split("&");
              }
          }
      } catch (e){
          return ps;
      }
      if(ps && ps[0]){
          ps[0] = ps[0].slice(1);
      }
      for (var i = 0; i < ps.length; i++) {
          if (ps[i]) {
              var p = ps[i].split(/=/);
              params[p[0]] = p[1];
          }
      }
      return params;
  }

  function loadPlayers() {
      var params = getQueryStringParams();
      var readyPlayers = videojs.getPlayers();
      for(var id in readyPlayers) {
          var player = readyPlayers[id];
          player.ready(function() {

              player.pulse({
                pulseHost : "https://" + values.subDomain + ".videoplaza.tv",
                  metadata: {
                    tags: [values.tags],
                    category: values.shares,
                    linearPlaybackPositions: [ 5, 15 ],
                    customParameters: { "testParam": "1234" }
                  },
                  'contrib-ads-options': {
                      debug: values.debug
                  },
                  debug: values.debug,
                  hidePoster: player.autoplay() || params.hasOwnProperty('hideposter')
              });
          });
      }

      if (OO.Pulse) {
          console.log("Detected Pulse SDK version:", OO.Pulse.Version);

          if (OO.Pulse._instance && OO.Pulse._instance._adPlayers) {
              console.log("THERE ARE ADPLAYERS... I can smell them!!!...");

          }

      }

  }

  return document.addEventListener("DOMContentLoaded", loadPlayers)
  }

  componentWillMount() {
      this.uniqid = Date.now();;
      this.loadPlayer(this.uniqid);
  }
  componentDidMount() {

  }
  componentDidUpdate(prevProps, prevState) {

  }

VideoPlayerWindow() {
  let videoJSid = "vjsVideo" + this.uniqid;
  let mainid = "main-" + this.uniqid;
  let url = "https://pulse-demo.cdn.videoplaza.tv/resources/media/sintel_trailer_854x480.mp4?cb=" + new Date().getTime();

  const styles = {
      width: "640px",
      height: "480px"
  };

    return (
    <div>
      <video
          data-account="3110396001"
          data-player="ryoaUBpYZ"
          data-playlist-id="4901749008001"
          data-embed="default"
          data-application-id
          className="video-js"
          controls
          style={styles}>
      </video>
      <br />
      <Alert bsStyle="warning" className="alert-style">
        <strong>Player: </strong> In the future, here can be some interactive data from the Ad plugin.
      </Alert>
    </div>
  );
}

  render() {
    return (

<div>
  {this.VideoPlayerWindow()}
</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inputsubdomain: state.inputsubdomain,
    toggle_checkbox: state.toggle_checkbox,
    inputtags: state.inputtags,
    inputshares: state.inputshares,
    pulse_preview: state.pulse_preview
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    InputAction: InputAction,
    InputTags: InputTags,
    InputShares: InputShares,
    ToggleCheckbox: ToggleCheckbox,
    pulsePreview: pulsePreview
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
