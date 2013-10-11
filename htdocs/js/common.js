/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

var CommonController = {
  getParametersFromQuery: function() {
    var parameters = {};
    var url = window.location.href;
    var indexOfQ = url.indexOf("?");
    if (indexOfQ >= 0) {
      var queryString = url.substring(indexOfQ+1);
      var params = queryString.split("&");
      for (var i = 0, n = params.length; i < n; i++) {
        var param = params[i];
        var keyvalue = param.split("=");
        parameters[keyvalue[0]] = keyvalue[1];
      }
      parameters["QueryString"] = queryString;
    }
    return parameters;
  },

  getJSON: function(url, callback) {
    $.getJSON(url, function(result) {
      if (result["error"]) {
        callback(null, result["error"]);
      } else {
        callback(result);
      }
    })
    .error(function(xhr, textStatus, errorThrown) {
      callback(null, textStatus+":"+xhr.responseText);
    })
  }
}