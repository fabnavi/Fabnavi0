/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var RecordController = {

  newProject : function() {
    $("#start").hide();
    $('#projectList').hide();
    PlayConfig.init();
    CommonController.getJSON("/project/new", function(result, error) {
      if (error) {
        alert(error);
        return;
      }
      PlayConfig.projectName = result["id"];
    });
  },

  shoot: function() {
    //    document.body.style.backgroundColor = "rgba("+Panel.R.innerHTML+","+Panel.G.innerHTML+","+Panel.B.innerHTML+","+Panel.A.innerHTML+")";
    $('#shoot').hide();
    $('#projectList').hide();
    $('#contents').hide();
    clearTimeout(RecordController.timer);
    RecordController.timer = setTimeout(function() {
      CommonController.getJSON("/project/takePicture?project_id="+PlayConfig.projectName, function(result, error) {
        if (error) {
          alert(error);
          return;
        }
        var li = $(document.createElement("li"));
        var img = $(document.createElement("img"));
        img.attr("src", result["url"]);
        PlayConfig.imgURLs.splice(PlayConfig.index+1,0,result["url"]);
        RecordController.updateList();
        PlayConfig.postConfig();
        PlayController.next();
        window.setTimeout(function(){
          CalibrateController.update();
        },2000);

        $('#shoot').show();
        $('#contents').show();
      });
    }, 10);
  },
  updateList: function () {
    ListController.clear();
    for(key in PlayConfig.imgURLs){
      ListController.append(PlayConfig.imgURLs[key]);
    }
  }
};

