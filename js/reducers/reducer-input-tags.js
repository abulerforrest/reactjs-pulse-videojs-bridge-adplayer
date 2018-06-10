export default function (state={"value": []}, action) {
    switch(action.type) {
      case "INPUT_TAGS": {
        return state = {...state, "action": action.action, "value": action.value}
      break;
      }
    }
    if(localStorage.getItem("tags") !== null) {
      return state = {...state, "action": "tags", "value": localStorage.getItem("tags")}
    } else return state = {...state, "action": "tags", "value": []}
}
