import {combineReducers} from 'redux';
import ReducerSDKVersion from './reducer-sdkversion';
import ReducerVideoJSVersion from './reducer-videojsversion';
import ContribAdsVersion from './reducer-contribadsversion';
import ContribAdsSelected from './reducer-contribadsversion-selected';
import ReducerReloadPageWithParams from './reducer-reload-page-with-params';
import LocalStorageSetter from './reducer-localstorage-setter';
import ReducerSelectboxAction from './reducer-selectbox-action';
import Starter from './reducer-starter';
import PulseSDKSelected from './reducer-pulsesdk-selected';
import VideojsSelected from './reducer-videojsversion-selected';
import SaveAllSettings from './reducer-saveallsettings';
import InputSubdomain from './reducer-input-subdomain';
import pulsePreview from './reducer-pulse-preview';
import InputTags from './reducer-input-tags';
import InputShares from './reducer-input-shares';
import ToggleCheckbox from './reducer-toggle-checkbox';

const allReducers = combineReducers({
  sdkversions: ReducerSDKVersion,
  videojsversions: ReducerVideoJSVersion,
  contribadsversions: ContribAdsVersion,
  reloadpagewithparams: ReducerReloadPageWithParams,
  localstorageSetter: LocalStorageSetter,
  selectboxAction: ReducerSelectboxAction,
  starter: Starter,
  saveallsettings: SaveAllSettings,
  pulsesdkselected: PulseSDKSelected,
  videojsversionselected: VideojsSelected,
  contribadsselected: ContribAdsSelected,
  inputsubdomain: InputSubdomain,
  pulse_preview: pulsePreview,
  inputtags: InputTags,
  inputshares: InputShares,
  toggle_checkbox: ToggleCheckbox
});

export default allReducers;
