// define initial state for this reducer
let initialState = {action:'pulse_preview', value: ''}

// check if localStorage already is set, if not set it
if(localStorage.getItem('pulse_preview') == null) {
  localStorage.setItem('pulse_preview', '')
}
// listen for actions
export default function (state=initialState, action) {

    switch(action.type) {
      case "INPUT_PULSEPREVIEW": {
        return state = {...state, "action": action.type, "value": action.value}
      break;
      }
      default: return state = {...state, "action": action.type, "value": localStorage.getItem('pulse_preview')}
    }
}
