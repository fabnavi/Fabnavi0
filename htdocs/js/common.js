/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

var CommonController = {
  localConfig:"",


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
  },

  getContents: function(url) {
    var parameter = {url: url, type:"GET"};

    var deferred = new $.Deferred();

    parameter.cache = false;

    parameter.success = function(result) {
      deferred.resolve(result);
    };

    parameter.error = function(xhr, textStatus, errorThrown) {
      deferred.reject(xhr);
    };

    $.ajax(parameter);
    return deferred.promise();
  },

  setLocalData: function(key,jsonData){
    var d = jsonData.toSource();
    console.log(d);
    localStorage.setItem(key,d);
  },

  getLocalData: function(key){
    var data = localStorage.getItem(key);
    if(data == null)return false;
    //    console.log(data);
    return eval(data);
  },

  getLocalConfig: function(id){
    console.log("getLocalConfig");
    var res = CommonController.getLocalData(id);
    if(!res){
      CommonController.localConfig = "";
      console.log("can't load localConfig");
    } else {
      CommonController.localConfig = res;
      console.log("Loaded localConfig");
    }

    //CommonController.localConfig ={x:"1669", y:"2151", w:"2190", h:"1122"};
  },

  setLocalConfig: function(id){
    if(CommonController.localConfig == ""){
      alert("there is no config");
      return false;
    }
    CommonController.setLocalData(id,CommonController.localConfig);
  }
}
