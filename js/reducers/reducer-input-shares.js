export default function (state={"value": []}, action) {

    switch(action.type) {
      case "INPUT_SHARES": {
        return state = {...state, "action": action.action, "value": action.value}
      break;
      }
    }
    if(localStorage.getItem("shares") !== null) {
      return state = {...state, "action": "shares", "value": localStorage.getItem("shares")}
    } else return state = {...state, "action": "shares", "value": []}
}
