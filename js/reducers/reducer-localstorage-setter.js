export default function (state={"value": []}, payload) {

  const action = payload.action;
  const value = payload.value;


function setLocalstorageItem(state, payload) {
  var saved = null;
  var i = 0;

  if(Array.isArray(action) == true) {
    payload.action.map(function (num) {
      localStorage.setItem(num, payload.value[i]);
      saved = localStorage.getItem(num);
      console.log("Did save version '" + saved + "' for " + num + " to localStorage :)");
      i++;
    });
  } else {
      if(Array.isArray(value) == true) {
        localStorage[payload.action] = value;
        console.log(value);
      } else {
        localStorage.setItem(payload.action, payload.value);
      }
  }
    return state = {...state, value: saved}
}
  switch(payload.type) {
    case "LOCALSTORAGE_SETTER": {
      return setLocalstorageItem(state, payload);
    break;
  }

  }
    return state;
}
