import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ChangeSDKVersion} from '../actions/index';
import {ChangeVideoJSVersion} from '../actions/index';
import {PulseSDKSelectedAction} from '../actions/index';
import {VideojsSelectedAction} from '../actions/index';
import {ContribadsSelectedAction} from '../actions/index';
import {SelectBoxAction} from '../actions/index';
import {Starter} from '../actions/index';
import {SaveAllSettings} from '../actions/index';
import {ReloadPageWithParams} from '../actions/index';
import {InputSubdomain} from '../actions/index';
import {pulsePreview} from '../actions/index';
import {ToggleCheckbox} from '../actions/index';
import {InputTags} from '../actions/index';
import {InputShares} from '../actions/index';
import {Form, FormControl, FormGroup, Button, TextInput, Tab, Tabs, Checkbox} from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
// functions
import { getAllUrlParams } from '../workers/workerGetAllUrlParams';

class Header extends Component {

  constructor(props) {
      super(props);

      // populate input values from url params
      var fetchedparams = getAllUrlParams();
      this.populateInputProps(fetchedparams);

      // prepare tags and shares values from props
      let tags = this.props.inputtags.value;
      let shares = this.props.inputshares.value;

      if (tags !== null && tags.length > 0) {
        tags = tags.split(',');
      }

      if (shares !== null && shares.length > 0) {
        shares = shares.split(',');
      }

        if(tags == "") {
          tags = [];
        }

        if(shares == "") {
          shares = [];
        }
      // set default state values
      this.handleCheckboxToggle = this.handleCheckboxToggle.bind(this);
      this.state = {
        sdkversions: props.sdkversions,
        checkboxChecked: this.props.toggle_checkbox.value,
        showSubmitButton: "",
        tags: tags,
        shares: shares,
        subDomainClass: 'subDomain',
        pulseDebug: 'checked'
      }
  }

  gather_all_data(allValuesArray = [], allItemsArray = []) {

    allValuesArray[0] = this.refs.pulseSDK.value;
    allValuesArray[1] = this.refs.videoJS.value;
    allValuesArray[2] = this.refs.contribAds.value;
    allValuesArray[3] = this.refs.subDomain.props.value;
    allValuesArray[4] = this.refs.pulse_preview.props.value;
    allValuesArray[5] = this.refs.pulseDebug.props.value;
    allValuesArray[6] = this.refs.tags.props.value;
    allValuesArray[7] = this.refs.shares.props.value;

    allItemsArray[0] = "pulseSDK";
    allItemsArray[1] = "videoJS";
    allItemsArray[2] = "contribAds";
    allItemsArray[3] = "subDomain";
    allItemsArray[4] = "pulse_preview";
    allItemsArray[5] = "pulseDebug";
    allItemsArray[6] = "tags";
    allItemsArray[7] = "shares";

    return {
     allValuesArray,
     allItemsArray
    }

  };

  populateInputs(fetchedparams) {

    for (var k1 in fetchedparams) {
      if(k1 == "pulse_preview") {
          this.setState({ pulse_preview: fetchedparams[k1] });
      } else if(k1 == "pulseDebug") {
        if(fetchedparams[k1] == "true") {
          this.setState({ checkboxChecked: true });
        } else if(fetchedparams[k1] == "false") {
          this.setState({ checkboxChecked: false });
        } else if(fetchedparams[k1] == "") {
          this.setState({ checkboxChecked: false });
        } else {
          this.setState({ checkboxChecked: false });
        }
      } else if(k1 == "tags") {
        if(fetchedparams[k1] !== "") {
          this.setState({tags:fetchedparams[k1].split(',')})
        } else this.setState({tags:[]})
      } else if(k1 == "shares") {
        if(fetchedparams[k1] !== "") {
          this.setState({shares:fetchedparams[k1].split(',')})
        } else this.setState({shares:[]})
      }
    }
}

populateInputProps(fetchedparams) {

  for (var k1 in fetchedparams) {
    if(k1 == "subDomain") {
     this.props.InputSubdomain(fetchedparams[k1], "subDomain");
    } else if(k1 == "pulseSDK") {
      this.props.pulsesdkselected.value = fetchedparams[k1];
      this.props.SelectBoxAction(fetchedparams[k1], "pulseSDK");
    } else if(k1 == "videoJS") {
      this.props.videojsversionselected.value = fetchedparams[k1];
      this.props.SelectBoxAction(fetchedparams[k1], "videoJS");
    } else if(k1 == "contribAds") {
      this.props.contribadsselected.value = fetchedparams[k1];
      this.props.SelectBoxAction(fetchedparams[k1], "contribAds");
    } else if(k1 == "pulse_preview") {
      this.props.pulsePreview(fetchedparams[k1], "pulse_preview");
    } else if(k1 == "pulseDebug") {
      if(fetchedparams[k1] == "true") {
        this.props.ToggleCheckbox(fetchedparams[k1], "pulse_debug");
      } else if(fetchedparams[k1] == "false") {
        this.props.ToggleCheckbox(fetchedparams[k1], "pulse_debug");
      } else if(fetchedparams[k1] == "") {
        this.props.ToggleCheckbox(fetchedparams[k1], "pulse_debug");
      } else {
        this.props.ToggleCheckbox(fetchedparams[k1], "pulse_debug");
      }
    } else if(k1 == "tags") {
      this.props.InputTags(fetchedparams[k1], "tags");
    } else if(k1 == "shares") {
      this.props.InputShares(fetchedparams[k1], "shares");
  }
}
}
  handleCheckboxToggle(evt) {
    this.setState({ checkboxChecked: evt.target.checked });
    this.props.ToggleCheckbox(!this.state.checkboxChecked, "pulse_debug");
  }
  handleChangeTags(tagInput) {

    this.setState({tags:tagInput})
    this.props.InputTags(tagInput, "tags");
    // show submit button
    this.setState({ showSubmitButton: this.parseSubmitButton() })
  }
  handleChangeShares(shareInput) {

    this.setState({shares:shareInput})
    this.props.InputShares(shareInput, "shares");
    // show submit button
    this.setState({ showSubmitButton: this.parseSubmitButton() })
  }
  // prevent reload on <Enter>
  onKeyPress(event) {
      if (event.which === 13 /* Enter */) {
        event.preventDefault();
      }
  }
  // parse submitButton
  parseSubmitButton() {
        return (
            <Button type="submit">
               Save
            </Button>
        )
  }
  // when select box is selected
  SelectedBox(value, action) {
    this.props.SelectBoxAction(value, action);
    // show the submitButton
    this.setState({ showSubmitButton: this.parseSubmitButton() })
  }
  // before component is updated
  componentWillUpdate(prevProps, nextProps) {

  }
  // when component has been mounted
  componentDidMount() {

    var fetchedparams = getAllUrlParams();
    this.populateInputs(fetchedparams);

      // gather data from all inputs/selectboxes
      var allData = this.gather_all_data();

      // run 'starter' (To initially check if the URL includes all values)
      this.props.Starter(allData.allValuesArray, allData.allItemsArray);

      if(this.props.inputsubdomain.value == null) {
         this.setState({subDomainClass: "subDomainWarning"})
      }
  }
// initiate a reload of the page if necessary (If the URL doesn't match input values)
reloadIfNeeded() {
    let result = "[Status: OK]";
    let timeout = 1800;
    // if needsupdate == true reload page
    if(this.props.starter.value !== "" && this.props.starter.needsupdate == true) {
      if (localStorage.getItem('contribAds') !== null) {
      let value = this.props.starter.value;
      result = "(Entered value isn't matching options that are available - Doing a quick reload in " + timeout + " milliseconds..)";
      setTimeout(function () {
          location.href = value;
      }, timeout);
    }
    return result;
    }
}

contribadsSelectListModule() {
   const contribAdsVersionLocalStorage = localStorage.getItem('contribAds');
   var contribAdsVersionsSelected = contribAdsVersionLocalStorage;

   return this.props.contribadsversions.map((contribadsversion) => {
     return (
      <option id={contribadsversion.id} key={contribadsversion.id} value={contribadsversion.version}>{contribadsversion.version}</option>
    );
  });
}

videojsSelectListModule() {
   const VideojsVersionLocalStorage = localStorage.getItem('videoJS');
   var videojsversionsSelected = VideojsVersionLocalStorage;

  return this.props.videojsversions.map((videojsversion) => {
    return (
      <option id={videojsversion.id} key={videojsversion.id} value={videojsversion.version}>{videojsversion.version}</option>
    );
  });
}

sdkSelectListModule() {
  const PulseSDKVersionLocalStorage = localStorage.getItem('pulseSDK');
    if(PulseSDKVersionLocalStorage !== null) {
       var sdkVersionSelected = PulseSDKVersionLocalStorage;
    }

  var selected = null;

  return this.state.sdkversions.map((sdkversion) => {
    return (
      <option id={sdkversion.id} key={sdkversion.version} value={sdkversion.version}>{sdkversion.version}</option>
    );
  });
}
// when saving settings
saveAllSettings(e) {
  e.preventDefault()

  var allData = this.gather_all_data();
  this.props.ReloadPageWithParams(allData.allValuesArray, allData.allItemsArray);

  return false;
}
  render() {
    return (
<div id="HeaderMain">
        {this.reloadIfNeeded()}
        <Form onKeyPress={this.onKeyPress} onSubmit={this.saveAllSettings.bind(this)} onChange={() => this.setState({ showSubmitButton: this.parseSubmitButton() })}>
        <FormGroup>
        <Tabs defaultActiveKey={1} id="theTabs">
  <Tab eventKey={1} title="Config">
<br />
            <table className="horizontal-table">
              <tbody>
              <tr>
                <th>
                  <div id="CurrentSDK_Module">
                    <p>
                        {this.props.pulsesdkselected.theText} {this.props.pulsesdkselected.value}
                    </p>
                    <p>
                    <select id="PulseSDKSelector" ref="pulseSDK" onChange={() => this.SelectedBox(PulseSDKSelector.value, "pulseSDK", PulseSDKSelector.value)} defaultValue={this.props.pulsesdkselected.value}>
                      {this.sdkSelectListModule()}
                    </select>
                    </p>
                    </div>
                </th>
                <th>
                  <div id="CurrentVideoJS_Module">
                    <p>
                      {this.props.videojsversionselected.theText} {this.props.videojsversionselected.value}
                    </p>
                  <p>
                  <select id="videojsSelector" ref="videoJS" onChange={() => this.SelectedBox(videojsSelector.value, "videoJS")} defaultValue={this.props.videojsversionselected.value}>
                    {this.videojsSelectListModule()}
                  </select>
                  </p>
                </div>
                </th>
                <th>
                  <div id="CurrentContribAds_Module">
                    <p>
                      {this.props.contribadsselected.theText} {this.props.contribadsselected.value}
                    </p>
                  <p>
                  <select id="contribAdsSelector" ref="contribAds" onChange={() => this.SelectedBox(contribAdsSelector.value, "contribAds")} defaultValue={this.props.contribadsselected.value}>
                    {this.contribadsSelectListModule()}
                  </select>
                  </p>
                </div>
                </th>
              </tr>
            </tbody>
          </table>
          <table className="horizontal-table">
              <tbody>
              <tr>
                <th>
      <p className="theLabel">Subdomain:</p>
      <div id="subDomain_Module">
        <FormControl className="{this.state.subDomainClass}" type="text" value={this.props.inputsubdomain.value} id="subDomain" ref="subDomain" inputRef={(ref) => { this.subDomain = ref; }} placeholder="Subdomain" onChange={() => this.props.InputSubdomain(subDomain.value, "subDomain")} />.videoplaza.tv
        </div>
      </th>
      <th>
        <p className="theLabel">Preview (Ad/goal/camapaign):</p>
        <div id="pulsePreview_Module">
          <FormControl className="pulse_preview" type="text" value={this.props.pulse_preview.value} id="pulse_preview" ref="pulse_preview" inputRef={(ref) => { this.pulse_preview = ref; }} placeholder="Pulse Preview" onChange={() => this.props.pulsePreview(pulse_preview.value, "pulse_preview")} />
        </div>
      </th>
      <th>
        <p className="theLabel">Debug mode?</p>
        <div id="pulseDebug_Module">
          	<FormGroup>
          <Checkbox
            className="debugMode"
            id="pulse_debug"
            checked={this.state.checkboxChecked}
            onChange={this.handleCheckboxToggle}
            value={this.props.toggle_checkbox.value}
            ref="pulseDebug"
            inputRef={(ref) => { this.pulse_debug = ref; }}
            >
          </Checkbox>
        </FormGroup>
        </div>
      </th>
    </tr>
  </tbody>
  </table>
  </Tab>
  <Tab eventKey={2} title="Targeting"><br />
  <p className="theLabel">Tags:</p>
  <TagsInput
         ref="tags"
         id="inputTags"
         className="inputTags"
         value={this.state.tags}
        onChange={::this.handleChangeTags}
        onChangeInput={::this.handleChangeTags}
       />
       <br />
       <p className="theLabel">Categories/Shares:</p>
       <TagsInput
              ref="shares"
              id="inputShares"
              className="inputShares"
              value={this.state.shares}
              onChange={::this.handleChangeShares}
              onChangeInput={::this.handleChangeShares}
            />
  </Tab>
  </Tabs>
        </FormGroup>
        {this.state.showSubmitButton}
      </Form>
          </div>
      );
    }
  }
  function mapStateToProps(state) {
    return {
      sdkversions: state.sdkversions,
      videojsversions: state.videojsversions,
      selectboxAction: state.selectboxAction,
      pulsesdkselected: state.pulsesdkselected,
      contribadsselected: state.contribadsselected,
      videojsversionselected: state.videojsversionselected,
      contribadsversions: state.contribadsversions,
      starter: state.starter,
      inputsubdomain: state.inputsubdomain,
      pulse_preview: state.pulse_preview,
      toggle_checkbox: state.toggle_checkbox,
      inputtags: state.inputtags,
      inputshares: state.inputshares
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    SelectBoxAction: SelectBoxAction,
    PulseSDKSelectedAction: PulseSDKSelectedAction,
    VideojsSelectedAction: VideojsSelectedAction,
    ContribadsSelectedAction: ContribadsSelectedAction,
    Starter: Starter,
    ReloadPageWithParams: ReloadPageWithParams,
    InputSubdomain: InputSubdomain,
    pulsePreview: pulsePreview,
    InputTags: InputTags,
    InputShares: InputShares,
    ToggleCheckbox: ToggleCheckbox
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
