/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var RecordController = {

  newProject : function() {
    $("#start").hide();
    $('#projectList').hide();
    PlayConfig.init();
    CommonController.getJSON("/api/startProject.php", function(result, error) {
      if (error) {
        alert(error);
        return;
      }
      PlayConfig.projectName = result["id"];
      $("#shoot").click(RecordController.shoot);
    });
  },

  shoot: function() {
    $('#shoot').hide();
    $('li').hide();
    clearTimeout(RecordController.timer);
    RecordController.timer = setTimeout(function() {
      CommonController.getJSON("/api/takePicture.php?project_id="+PlayConfig.projectName, function(result, error) {
        if (error) {
          alert(error);
          return;
        }
        var li = $(document.createElement("li"));
        var img = $(document.createElement("img"));
        img.attr("src", result["url"]);
        PlayConfig.imgURLs.splice(PlayConfig.index+1,0,result["url"]);
        li.append(img);
        li.hide();
        $("#processes").append(li);
        PlayConfig.index++;
      });
    }, 10);
    PlayConfig.postConfig();
  }
};

