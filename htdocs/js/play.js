/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var PlayController = {
  init: function() {
    PlayController.current_index = -1;

    $(window).keydown(function(e) {
      switch (e.keyCode) {
        case 97 : 
        case 37 : {
          PlayController.previousWithAnimation();
          break;
        }
        case 99 : 
        case 39 : {
          PlayController.nextWithAnimation();
          break;
        }
        case 27 : {
          $("#controller").hide();
          break;
        }
        case 52 : {
          PlayController.previous();
          break;
        }
        case 54 : {
          PlayController.next();
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
    var url = "data/"+id+"/fabnavi.play.config";
    PlayController.animations = [];
    CommonController.getContents(url)
    .then(function(result) {
      var lines = result.split("\n");
      for (var i = 0, n = lines.length; i < n; i++) {
        var line = $.trim(lines[i]);
        if (line.indexOf("#") == 0 || line.length == 0) {
          continue;
        }
        var elements = line.split(" ");
        var timeElements = elements[0].split("-");
        var animation = {startIndex: parseInt(timeElements[0]), endIndex: parseInt(timeElements[1]), speed: parseInt(elements[1])};
        PlayController.animations.push(animation);
      }
    })
    .done(function() {
      CommonController.getJSON("api/getProject.php?project_id="+id, function(result, error) {
        if (error) {
          alert(error);
          return;
        }
        PlayController.current_project = result;

        var parameters = PlayController.getParametersFromQuery();
        var startIndex = 0;
        if (parameters["s"]) {
          startIndex = parseInt(parameters["s"])-1;
        }
        PlayController.show(startIndex, true);
        $("#controller").show();
      });
    });
  },

  getParametersFromQuery: function () {
    var parameters = {};
    var url = window.location.href;
    var indexOfQ = url.indexOf("?");
    if (indexOfQ >= 0) {
      var queryString = url.substring(indexOfQ + 1);
      var params = queryString.split("&");
      for (var i = 0, n = params.length; i < n; i++) {
        var param = params[i];
        var keyvalue = param.split("=");
        parameters[keyvalue[0]] = keyvalue[1];
      }
      parameters["QueryString"] = queryString;
    }
    return parameters;
  },

  previous: function() {
    if (PlayController.current_index == 0) {
      PlayController.show(PlayController.current_project.length-1, false);
    } else {
      PlayController.show(PlayController.current_index-1, false);
    }
  },

  previousWithAnimation: function() {
    if (PlayController.current_animation) {
      PlayController.current_index = PlayController.current_animation.startIndex;
      PlayController.previous();
    } else {
      PlayController.previous();
    }
  },

  next: function() {
    if (PlayController.current_index == PlayController.current_project.length-1) {
      PlayController.show(0, true);
    } else {
      PlayController.show(PlayController.current_index+1, true);
    }
  },

  nextWithAnimation: function() {
    if (PlayController.current_animation) {
      PlayController.current_index = PlayController.current_animation.endIndex;
      PlayController.next();
    } else {
      PlayController.next();
    }
  },

  show: function(index, toNEXT) {
    $("#arrow").text("");
    clearTimeout(PlayController.timerid);
    var animation = null;
    if (toNEXT == true) {
      for (var i = 0, n = PlayController.animations.length; i < n; i++) {
        if (PlayController.animations[i].startIndex == index) {
          animation = PlayController.animations[i];
          PlayController.current_index = animation.endIndex;
          PlayController.animate(index, animation.startIndex, animation.endIndex, animation.speed);
          PlayController.current_animation = animation;
          break;
        }
      }
    }
    if (!animation) {
      PlayController.current_animation = null;
      PlayController.current_index = index;
      PlayController.setPhoto(index);
    }
  },

  animate: function(index, startIndex, endIndex, speed) {
    PlayController.setPhoto(index);
    var nextIndex = index + 1;
    var nextSpeed = speed;
    if (nextIndex > endIndex) {
      nextIndex = startIndex;
      nextSpeed *= 1.5;
    }
    var text = "";
    for (var i = startIndex; i < index; i++) {
      text += "　";
    }
    for (var i = index; i < endIndex+1; i++) {
      text += "▶";
    }
    $("#arrow").text(text);
    PlayController.current_index = index;
    PlayController.timerid = setTimeout(PlayController.animate, nextSpeed, nextIndex, startIndex, endIndex, speed);
  },

  setPhoto: function(index) {
    $("#photo").attr("src", PlayController.current_project[index]);
    $("#counter").text((index+1)+"/"+PlayController.current_project.length);
  }
}

$(document).ready(function() {
  PlayController.init();
});