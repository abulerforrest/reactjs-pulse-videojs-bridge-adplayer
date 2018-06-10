export default function (state={}, action) {

    switch(action.type) {
      case "SAVEALLSETTINGS": {
        return state = {...state, "value": action.value.url, "needsupdate": action.value.needsupdate}
      break;
      }
    }
    return state;
}
