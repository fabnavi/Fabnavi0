/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var RecordController = {
  init: function() {
    $("#start").click(RecordController.start);
  },

  start: function() {
    $("#start").hide();
    CommonController.getJSON("/api/startProject.php", function(result, error) {
      if (error) {
        alert(error);
        return;
      }
      RecordController.project_id = result["id"];
      $("#take").show();
      $("#take").click(RecordController.take);
      $(window).keydown(RecordController.take);
    });
  },

  take: function() {
    CommonController.getJSON("/api/takePicture.php", function(result, error) {
      if (error) {
        alert(error);
        return;
      }
    });
  }
};

$(document).ready(function() {
  RecordController.init();
});