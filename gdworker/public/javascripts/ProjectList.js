
R = 255;
G = 255;
B = 0;
A = 1.0;
var ProjectList = {
  init : function () {

  },

  load :function () {
    ProjectList.selectedId = "";
    CommonController.getJSON("project/getList", function(result, error) {
      if (error) {
        alert(error);
        return;
      }
      var projectList = $("#projectList");
      document.getElementById('newProject').ondblclick = function(){
        PlayConfig.fastDraw = true;
        Keys.recorderKeyBind();
        RecordController.newProject();
        PlayController.info();
      };
      document.getElementById('newProject').click(function(e){
        ProjectList.select(e.currentTarget);
      });
      for (var i = 0, n = result.length; i < n; i++) {
        var project = result[i];
        var id = project.id;
        var thumbnail = project.thumbnail;

        var image = $(document.createElement("img"));
        image.attr("src", thumbnail);
        image.addClass("thumbnail");

        var li = $(document.createElement("li"));
        li.append(image);
        li.attr("id", id);
        li.click(function(e){
          ProjectList.select(e.currentTarget);
        });
        li.dblclick(function(e){
          PlayConfig.fastDraw = true;
          Keys.playerKeyBind();
          PlayController.play(e.currentTarget.id);
        });
        var title = $('<div>');
        title.text(id);
        li.append(title);

        projectList.append(li);

      }

      document.getElementById('makeButton').onclick = function(){ 
        if(ProjectList.selectedId){
          PlayConfig.fastDraw = false;
          Keys.playerKeyBind();
          PlayController.play(ProjectList.selectedId);
        }
      }

      document.getElementById('editButton').onclick = function(){ 
        if(ProjectList.selectedId){
          PlayConfig.fastDraw = true;
          Keys.recorderKeyBind();
          var id = ProjectList.selectedId;
          PlayController.play(id);
          PlayController.info();
        }
      }
    });
    ProjectList.select($('li')[0]);
    Keys.projectListKeyBind();
  },

  select : function (target) {
    if(target.tagName != "LI")return 0;
    $('li').removeClass('selectedItem');
    target.className = 'selectedItem';
    ProjectList.selectedId = target.id;
  },

  prev : function () {
    if(ProjectList.selectedId == "")return 0;
    var s = $('#'+ProjectList.selectedId)[0].previousElementSibling;
    if(s == null)return 0;
    ProjectList.select(s); 
  },

  next : function () {
    if(ProjectList.selectedId == ""){
      ProjectList.select($("li")[0]);
      return 0;
    }
    var s = $('#'+ProjectList.selectedId)[0].nextElementSibling;
    if(s == null)return 0;
    ProjectList.select(s); 
  },

  play : function () {
    if(ProjectList.selectedId == "")return 0;
    if(ProjectList.selectedId == "newProject"){
     /* 
     PlayConfig.fastDraw = true;
      Keys.recorderKeyBind();
      RecordController.newProject();
      PlayController.info();
      */
      return 0;
    }
    Keys.playerKeyBind();
    PlayController.play(ProjectList.selectedId);
  },

  selected: function(id){
    console.log("Not implemented yet. "+id + " was selected."); 
  }
};
