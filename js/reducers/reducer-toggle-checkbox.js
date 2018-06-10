export default function (state={"value": false }, action) {

let returnVal = false;

    switch(action.type) {
      case "TOGGLE_CHECKBOX": {
        return state = {...state, "action": action.type, "value": returnVal}
      break;
      }
    }
    if(localStorage.getItem('pulse_debug') === "true") {
      returnVal = true;
      return state = {...state, "action": "pulse_debug", "value": returnVal}
    } else if (localStorage.getItem('pulse_debug') === "false") {
      return state;
    } else {
      return state;
    }
}
