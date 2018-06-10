export default function (state={}, payload) {

const action = payload.action;
const value = payload.value;
const theText = "Current version: ";

function announcer(action) {
  return theText + value;
}

  switch(payload.type) {
    case "SELECTBOX_ACTION": {
      state = {...state, value: payload.value}
      break;
    }
}
    return state;
};
