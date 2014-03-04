/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var RecordController = {
  init: function() {
    ProjectList.init();
    ProjectList.load();
    $("#start").click(function(){
      RecordController.start();
      $('#take').hide();
    });
    $(window).keydown(function(e){
      switch(e.keyCode){
        case 101:
        case 13:
          RecordController.take();
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
        default:
          break;
      }
    });
    ProjectList.selected = RecordController.load;
  },

  load: function (id) {
    RecordController.project_id = id;
    $('#project-list').hide();
  },

  take: function() {
    $('#take').hide();
    $('li').hide();
    clearTimeout(RecordController.timer);
    RecordController.timer = setTimeout(function() {
      CommonController.getJSON("/api/takeNote.php?project_id="+RecordController.project_id, 
        function(result, error) {
          if (error) {
            alert(error);
            return;
          }
          var li = $(document.createElement("li"));
          var img = $(document.createElement("img"));
          img.attr("src", result["url"]);
          li.append(img);
          li.hide();
          $("#processes").append(li);
          Analyzer.analyze(result["url"]);
        });
    }, 10);
  },
  postNote: function (src) {
    var note = Analyzer.analyze(src).substring(23);
    console.log(note);
    $.post("/api/postNote.php",
      {name:"hogehoge.jpg",note:note},
      function (res) {
       console.log("posted");
       console.log(res);
      },"json");
  }
};

$(document).ready(function() {
  RecordController.init();
});
