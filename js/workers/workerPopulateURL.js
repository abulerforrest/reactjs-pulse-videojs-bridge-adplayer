// incorporating some logic to populate the URL
import { getAllUrlParams } from './workerGetAllUrlParams';

export function PopulateURL(params, values) {

  let theParams = params;
  let theValues = values;

  let needsupdate = false;
  let PopulateURL = "";
  let Param = null;
  let Value = null;
  let i = 0;

  const amountOfCurrentParams = Object.keys(getAllUrlParams()).length;

  // populate the url with current params/values
  for (var key in theParams) {

    var theParamsKey = theParams[key];

    Param = theParams[key];
    Value = theValues[key];

    PopulateURL = PopulateURL + Param + "=" + Value;

    if(key < theParams.length -1) {
      PopulateURL = PopulateURL + "&";
    }

  }

if(theParams !== undefined) {
  if(amountOfCurrentParams !== theParams.length) {
    needsupdate = true;
  }
}

Object.keys(getAllUrlParams()).forEach(function(key) {

// if values are an object make in to a comma separated string
if(typeof theValues[i] === 'object') {
  theValues[i] = theValues[i].join(', ').replace(/\s+/g, '');
}

if(getAllUrlParams()[key] !== "undefined" && theValues[i] !== "undefined") {

  let array = ["pulseDebug", "tags", "subDomain", "shares", "pulse_preview"];

    if(getAllUrlParams()[key] !== theValues[i] && !array.includes(key)) {
        needsupdate = true;
    }
    if(key == "tags" || key == "shares") {
      if(getAllUrlParams()[key] !== "") {
        var letters = /^[A-Za-z,0-9]+$/;
        if(!getAllUrlParams()[key].match(letters)) {
          needsupdate = true;
        }
      }
    }
}
i++;
});

var obj = {
  url:  "?" + PopulateURL,
  needsupdate: needsupdate
};
return obj;
}
