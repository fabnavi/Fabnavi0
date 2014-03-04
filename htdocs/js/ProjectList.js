var ProjectList = {
  init : function () {
    
  },

  load :function () {
   console.log("project list loader initializer");
    CommonController.getJSON("api/getProjectList.php", function(result, error) {
      if (error) {
        alert(error);
        return;
      }
      var projectList = $("#project-list");
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
          var target = $(e.currentTarget);
          var id = target.attr("id");
          ProjectList.selected(id);
        });

        projectList.append(li);
      }
    });
  },
  selected: function(id){
    console.log("Not implemented yet. "+id + " was selected."); 
  }

};