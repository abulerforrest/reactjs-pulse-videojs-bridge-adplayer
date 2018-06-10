export default function (state={}, action) {

    switch(action.type) {
      case "RELOAD_PAGE_WITH_PARAMS": {
        return location.href = action.value.url;
      break;
      }
    }
    return state;
}
