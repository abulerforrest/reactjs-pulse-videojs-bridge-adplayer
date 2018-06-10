import { PopulateURL } from '../workers/workerPopulateURL';

export const SelectBoxAction = (payload, action) => {
  return function (dispatch) {
      dispatch(FireSelectBoxAction(payload, action));
      dispatch(LocalStorageSetter(payload, action));
      dispatch(PulseSDKSelectedAction(payload, action));
      dispatch(VideojsSelectedAction(payload, action));
      dispatch(ContribadsSelectedAction(payload, action));
  };
}

export const ToggleCheckbox = (payload, action) => {
  return function (dispatch) {
      dispatch(FireToggleCheckbox(payload, action));
      dispatch(LocalStorageSetter(payload, action));
  };
}
export const InputSubdomain = (payload, action) => {
  return function (dispatch) {
      dispatch(FireInputSubdomain(payload, action));
      dispatch(LocalStorageSetter(payload, action));
  };
}
export const InputTags = (payload, action) => {
  return function (dispatch) {
      dispatch(FireInputTags(payload, action));
      dispatch(LocalStorageSetter(payload, action));
  };
}
export const InputShares = (payload, action) => {
  return function (dispatch) {
      dispatch(FireInputShares(payload, action));
      dispatch(LocalStorageSetter(payload, action));
  };
}
export const pulsePreview = (payload, action) => {
  return function (dispatch) {
      dispatch(FirepulsePreview(payload, action));
      dispatch(LocalStorageSetter(payload, action));
  };
}
export const FireToggleCheckbox = (payload, action) => {
  return {
    type: "TOGGLE_CHECKBOX",
    action: action,
    value: payload
  };
}
export const FireInputSubdomain = (payload, action) => {
  return {
    type: "INPUT_SUBDOMAIN",
    action: action,
    value: payload
  };
}
export const FireInputTags = (payload, action) => {
  return {
    type: "INPUT_TAGS",
    action: action,
    value: payload
  };
}
export const FireInputShares = (payload, action) => {
  return {
    type: "INPUT_SHARES",
    action: action,
    value: payload
  };
}
export const FirepulsePreview = (payload, action) => {
  return {
    type: "INPUT_PULSEPREVIEW",
    action: action,
    value: payload
  };
}
export const Starter = (payload, action) => {
  return {
    type: "STARTER",
    action: action,
    value: PopulateURL(action, payload)
  };
}
function FireSelectBoxAction(payload, action, previouslySelected) {
  return {
    type: "SELECTBOX_ACTION",
    value: payload,
    action: action,
    prevselected: previouslySelected
  };
}
export const PulseSDKSelectedAction = (payload, action) => {
  return {
    type: "PULSESDK_SELECTED",
    value: payload,
    action: action
  };
}
export const VideojsSelectedAction = (payload, action) => {
  return {
    type: "VIDEOJS_SELECTED",
    value: payload,
    action: action
  };
}
export const ContribadsSelectedAction = (payload, action) => {
  return {
    type: "CONTRIBADS_SELECTED",
    value: payload,
    action: action
  };
}
export const ReloadPageWithParams = (payload, action) => {
  return function (dispatch) {
      dispatch(LocalStorageSetter(payload, action));
      dispatch(FireReloadPageWithParams(payload, action));
  };
}
export function FireReloadPageWithParams(payload, action) {
  return {
    type: "RELOAD_PAGE_WITH_PARAMS",
    action: payload,
    value: PopulateURL(action, payload)
  };
}
function LocalStorageSetter(payload, action) {
  return {
    type: "LOCALSTORAGE_SETTER",
    value: payload,
    action: action
  }
};
