export default function (state=[], action) {

 var arr = [];
  for (var key in action.value) {
    arr.push(action.value[key]);
  }

    switch(action.type) {
      case "STARTER": {
        return state = {...state, "value": arr[0], "needsupdate": arr[1]}
      break;
      }
    }
    return state;
}
