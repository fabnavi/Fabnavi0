/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var RecordController = {
  init: function() {
    $("#start").click(function(){
      RecordController.start();
      $('#take').hide();
    });
    $(window).keydown(function(e){
      switch(e.keyCode){
        case 101:
        case 13:
          if($('#start').is(':visible')){
            RecordController.start();
            $('#take').hide();
          } else {
            RecordController.take();
          }
          break;
        case 104:
          if($('li').is(':visible')){
            $('li').hide();
            $('#take').hide();      
          } else { 
            $('li').show();
            $('#take').show();      
          }
          break;
        case 105:
        case 32:
          if(RecordController.project_id != "undefined")window.open('/play.php?id='+RecordController.project_id,'new tab');
          break;
        default:
          break;
      }
    });
  },

  start: function() {
    $("#start").hide();
    PlayConfig.init();
    CommonController.getJSON("/api/startProject.php", function(result, error) {
      if (error) {
        alert(error);
        return;
      }
      RecordController.project_id = result["id"];
      $("#take").click(RecordController.take);
    });
  },

  take: function() {
    $('#take').hide();
    $('li').hide();
    clearTimeout(RecordController.timer);
    RecordController.timer = setTimeout(function() {
      CommonController.getJSON("/api/takePicture.php?project_id="+RecordController.project_id, function(result, error) {
        if (error) {
          alert(error);
          return;
        }
        var li = $(document.createElement("li"));
        var img = $(document.createElement("img"));
        img.attr("src", result["url"]);
        PlayConfig.imgURLs[PlayConfig.index] = result["url"];
        li.append(img);
        li.hide();
        $("#processes").append(li);
        PlayConfig.index++;
      });
    }, 10);
    PlayConfig.postConfig();
  }
};

$(document).ready(function() {
  RecordController.init();
});
