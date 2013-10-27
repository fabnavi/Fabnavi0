/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var PlayController = {
  init: function() {
    $(window).keydown(function(e) {
      switch (e.keyCode) {
        case 97 : 
        case 37 : {
          PlayController.previous();
          break;
        }
        case 99 : 
        case 39 : {
          PlayController.next();
          break;
        }
        case 27 : {
          $("#controller").hide();
          break;
        }
      }
    });

    $("#close").click(function() {
      $("#controller").hide();
    });
    $("#previous").click(PlayController.previous);
    $("#next").click(PlayController.next);

    PlayController.load();
  },

  load: function() {
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
        li.click(PlayController.play);

        projectList.append(li);
      }
    });
  },

  play: function(e) {
    var target = $(e.currentTarget);
    var id = target.attr("id");
    CommonController.getJSON("api/getProject.php?project_id="+id, function(result, error) {
      if (error) {
        alert(error);
        return;
      }
      PlayController.current_project = result;
      PlayController.show(0);
      $("#controller").show();
    });
  },

  previous: function() {
    if (PlayController.current_index == 0) {
      PlayController.show(PlayController.current_project.length-1);
    } else {
      PlayController.show(PlayController.current_index-1);
    }
  },

  next: function() {
    if (PlayController.current_index == PlayController.current_project.length-1) {
      PlayController.show(0);
    } else {
      PlayController.show(PlayController.current_index+1);
    }
  },

  show: function(index) {
    PlayController.current_index = index;
    $("#photo").attr("src", PlayController.current_project[index]);
    $("#counter").text((index+1)+"/"+PlayController.current_project.length);
  }
}

$(document).ready(function() {
  PlayController.init();
});