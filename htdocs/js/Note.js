/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
function delayHello()
{
  var d = new $.Deferred;
  setTimeout(function(){
    console.log('Hello!');
    d.resolve();
  }, 1000);
  return d.promise();
}
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
    $('#contents').hide();
    document.body.style.backgroundColor = "#dfdfdf";
    clearTimeout(RecordController.timer);
    RecordController.timer = setTimeout(function() {
      CommonController.getJSON("/api/takeNote.php?project_id="+RecordController.project_id, 
        function(result, error) {
          if (error) {
            alert(error);
            return;
          }
          window.setTimeout(function(){
            var li = $(document.createElement("li"));
            var img = $(document.createElement("img"));
            img.attr("src", result["url"]);
            li.append(img);
            li.hide();
            $("#processes").append(li);
            RecordController.postNote(result["url"].substring(3));
          },1000);
        });
    }, 10);
  },
  postNote: function (src) {
    Analyzer.analyze(src).then(function (note) {
      note = note.substring(23);
      console.log(src);
      $.post("/api/postNote.php",
        {name:src,note:note},
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
