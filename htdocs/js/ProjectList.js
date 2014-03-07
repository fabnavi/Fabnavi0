var ProjectList = {
  init : function () {

  },

  load :function () {
    ProjectList.selectedId = "";
    console.log("project list loader initializer");
    CommonController.getJSON("api/getProjectList.php", function(result, error) {
      if (error) {
        alert(error);
        return;
      }
      var projectList = $("#projectList");
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
          $('li').removeClass('selectedItem');
          e.currentTarget.className = 'selectedItem';
          ProjectList.selectedId = e.currentTarget.id;
        });
        li.dblclick(function(e){
          PlayController.play(e.currentTarget.id);
        });
        projectList.append(li);

      }
      document.getElementById('makeButton').onclick = function(){ 
        if(ProjectList.selectedId){
          PlayController.play(ProjectList.selectedId);
        }
      }

      document.getElementById('editButton').onclick = function(){ 
        if(ProjectList.selectedId){
         console.log("clicked edit");
        }
      }
    });
  },

  selected: function(id){
    console.log("Not implemented yet. "+id + " was selected."); 
  }

};
