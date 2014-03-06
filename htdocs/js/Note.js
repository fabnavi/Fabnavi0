/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var RecordController = {
  init: function() {
    ProjectList.init();
    PlayController.defaultInit();
    PlayController.initKeyBind();
    ProjectList.load();
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
    document.getElementById('take').onclick = RecordController.take;
    ProjectList.selected = RecordController.load;
  },

  load: function (id) {
    console.log("project selected");
    RecordController.project_id = id;
    $('#project-list').hide();
    PlayController.play(id);
  },

  take: function() {
    $('#take').hide();
    $('li').hide();
    $('#controller').hide();
    document.body.style.backgroundColor = "#bfbfbf";
    clearTimeout(RecordController.timer);
    RecordController.timer = setTimeout(function() {
      CommonController.getJSON("/api/takeNote.php?project_id="+RecordController.project_id, 
        function(result, error) {
          if (error) {
            alert(error);
            return;
          }
          RecordController.postNote(result["url"].substring(3));
          $('#take').show();
          $('#controller').show();
        });
    }, 10);
  },

  postNote: function (src) {
    Analyzer.analyze(src).then(function (note) {
      var img = new Image();
      img.src = note;
      img.onload = function(){
       console.log("note loaded");
//        PlayController.ctx.globalAlpha = 0.6;
//        PlayController.ctx.globalCompositeOperatio = "lighter";
        PlayController.drawImage(img);
      }
      note = note.substring(22);
      var s = src.split('.');
      var t = s[0].split('/');
      var path = t[0]+"/"+t[1]+"/note-"+t[2]+".png";
      $.post("/api/postNote.php",
        {name:path,note:note},
        function (res) {
          console.log(res);
        },"json");
    });
    console.log("promise");
  }
};

$(document).ready(function() {
  RecordController.init();
});
