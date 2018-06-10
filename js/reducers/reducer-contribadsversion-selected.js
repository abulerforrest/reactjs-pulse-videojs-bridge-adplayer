export default function (state={}, action) {

  let selectedVersion = null;
  let theText = null;
  if(localStorage.getItem('contribAds') !== null) {
    selectedVersion = localStorage.getItem('contribAds');
    theText = "Current contribAds version: ";
  } else {
    selectedVersion = "";
    theText = "(Using latest contribAds version)";
  }

    switch(action.type) {
      case "CONTRIBADS_SELECTED": {
        return state = {...state, "value": selectedVersion, "theText": theText}
      break;
      }
    }

    return state;
}
