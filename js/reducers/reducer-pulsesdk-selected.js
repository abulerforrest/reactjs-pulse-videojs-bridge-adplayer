export default function (state={}, action) {

  let selectedVersion = null;
  let theText = null;
  if(localStorage.getItem('pulseSDK') !== null) {
    selectedVersion = localStorage.getItem('pulseSDK');
    theText = "Current PulseSDK version: ";
  } else {
    selectedVersion = "";
    theText = "(Using latest PulseSDK version)";
  }

    switch(action.type) {
      case "PULSESDK_SELECTED": {
        return state = {...state, "value": selectedVersion, "theText": theText}
      break;
      }
    }

    return state;
}
