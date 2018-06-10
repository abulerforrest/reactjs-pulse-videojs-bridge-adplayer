// define initial state for this reducer
let initialState = {action:'subDomain', value: ''}

// check if localStorage already is set, if not set it
if(localStorage.getItem('subDomain') == null) {
  localStorage.setItem('subDomain', '')
}
// listen for actions
export default function (state=initialState, action) {

    switch(action.type) {
      case "INPUT_SUBDOMAIN": {
        return state = {...state, "action": action.type, "value": action.value}
      break;
      }
      default: return state = {...state, "action": action.type, "value": localStorage.getItem('subDomain')}
    }
}
