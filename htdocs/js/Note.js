/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var Note = {
  shoot: function() {
    $('#shoot').hide();
    $('li').hide();
    $('#contents').hide();
    document.body.style.backgroundColor = "#000000";
    setTimeout(function() {
      CommonController.getJSON("/api/takeNote.php?project_id="+PlayConfig.projectName, 
        function(result, error) {
          if (error) {
            alert(error);
            return;
          }
          Note.postNote(result["url"].substring(3));
          $('#shoot').show();
          $('#contents').show();
        });
    }, 10);
  },

  postNote: function (src) {
    Analyzer.analyze(src).then(function (note) {
      var img = new Image();
      img.src = note;
      img.onload = function(){
        PlayController.drawImage(img);
        setTimeout(function() { img = null; }, 100);
      }
      note = note.substring(22);
      var s = src.split('.');
      var t = s[0].split('/');
      var path = t[0]+"/"+t[1]+"/note-"+t[2]+".png";
      PlayConfig.notes.push({url:path,index:PlayConfig.index});
      $.post("/api/postNote.php",
        {name:path,note:note},
        function (res) {
          console.log(res);
        },"json");
      PlayConfig.postConfig();
    });
  },
  drawScanLine : function () {

  }
};

