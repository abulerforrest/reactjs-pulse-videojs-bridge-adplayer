export default function (state={}, action) {

  let selectedVersion = null;
  let theText = null;
  if(localStorage.getItem('videoJS') !== null) {
    selectedVersion = localStorage.getItem('videoJS');
    theText = "Current videoJS version: ";
  } else {
    selectedVersion = "";
    theText = "(Using latest videoJS version)";
  }

    switch(action.type) {
      case "PULSESDK_SELECTED": {
        return state = {...state, "value": selectedVersion, "theText": theText}
      break;
      }
    }

    return state;
}
