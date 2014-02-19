/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var PlayController = {
  init: function () {
    PlayController.current_index = -1;
    PlayController.pointX = -1;
    PlayController.pointY = -1;
    PlayController.newAnnotations = []; //{index: ,x: y: w: h:, angle
    PlayController.configList = {
      animation: {
        tag: 'animations',
        name: 'animation',
        values: {
          startIndex: 'int',
          endIndex: 'int',
          duration: 'int'
        }
      },
      annotation: {
        tag: 'annotations',
        name: 'annotation',
        values: {
          index: 'int',
          image: 'string',
          x: 'int',
          y: 'int',
          w: 'int',
          h: 'int',
          angle: 'int'
        }
      }
    };


    $(window).keydown(function (e) {
      switch (e.keyCode) {
        case 97:
        case 37:
          {
            PlayController.previousWithAnimation();
            break;
          }
        case 99:
        case 39:
          {
            PlayController.nextWithAnimation();
            break;
          }
        case 27:
          {
            $("#controller").hide();
            break;
          }
        case 52:
          {
            PlayController.previous();
            break;
          }
        case 54:
          {
            PlayController.next();
            break;
          }
      }
    });

    $("#close").click(function () {
      $("#controller").hide();
    });
    $("#previous").click(PlayController.previous);
    $("#next").click(PlayController.next);

    PlayController.load();
    $('#photo').click(function (e) {
      PlayController.makeAnnotation(e)
    });
    PlayController.updateAnnotationsTable();
  },

  makeAnnotation: function (e) {
    if (PlayController.pointX == -1 && PlayController.pointY == -1) {
      PlayController.pointX = e.pageX;
      PlayController.pointY = e.pageY;
    } else {
      var x = PlayController.pointX - e.pageX;
      var y = PlayController.pointY - e.pageY;
      var angle = Math.atan(y / x) * 180 / Math.PI - 90;

      if (x > 0) angle -= 180;

      PlayController.setAnnotation(PlayController.pointX, PlayController.pointY, angle);
      var a = {
        index: PlayController.current_index + 1,
        image: "annotations/arrow.svg",
        x: PlayController.pointX,
        y: PlayController.pointY,
        angle: angle,
        w: 500,
        h: 500,
        id: PlayController.id
      };
      PlayController.newAnnotations.push(a);
      PlayController.pointX = -1;
      PlayController.pointY = -1;
    }
  },

  postAnnotations: function () {
    $.ajax({
      type: "POST",
    url: "api/newAnnotation.php",
    data: {
      data: PlayController.newAnnotations
    }
    });
  },

  load: function () {
    CommonController.getJSON("api/getProjectList.php", function (result, error) {
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

  configParser: function (text) {
    var parser = new DOMParser();
    doc = parser.parseFromString(text, "application/xml");

    var animations = PlayController.getObjectsFromXML(doc, PlayController.configList['animation']);
    var annotations = PlayController.getObjectsFromXML(doc, PlayController.configList['annotation']);
    if (animations.length > 0)
      for (i in animations) {
        animations[i].index--;
        PlayController.animations.push(animations[i]);
      }

    if (annotations.length > 0)
      for (i in annotations) {
        annotations[i].index--;
        PlayController.annotations.push(annotations[i]);
      }

  },

  getObjectsFromXML: function (doc, conf) {
    var nodes = doc.getElementsByTagName(conf.tag);
    if (nodes.length == 0) {
      return {};
    }
    var objs = [];
    nodes = nodes[0].children;
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].tagName == conf.name) {
        var obj = {};
        for (key in conf.values) {
          var v = nodes[i].getAttribute(key);
          if (v == null) {
            console.log("Attribute " + key + " not found");
          } else if (conf.values[key] == 'int') {
            var r = parseInt(v, 10);
            if (isNaN(r)) console.log(v + " is declared as int, but NaN");
            else obj[key] = r;
          } else if (conf.values[key] == 'string') {
            obj[key] = v;
          } else {
            console.log("cannot understand the type :" + conf.values[key] + " of " + key);
          }
        }
        objs.push(obj);
      }
    }
    return objs;
  },

  play: function (e) {
    var target = $(e.currentTarget);
    var id = target.attr("id");
    PlayController.id = id;
    var url = "data/" + id + "/fabnavi.play.config";
    PlayController.animations = [];
    PlayController.annotations = [];
    CommonController.getContents(url)
      .then(function (result) {
        PlayController.configParser(result);
      })
    .done(function () {
      CommonController.getJSON("api/getProject.php?project_id=" + id, function (result, error) {
        if (error) {
          alert(error);
          return;
        }
        PlayController.current_project = result;

        var parameters = PlayController.getParametersFromQuery();
        var startIndex = 0;
        if (parameters["s"]) {
          startIndex = parseInt(parameters["s"]) - 1;
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

  previous: function () {
    if (PlayController.current_index == 0) {
      PlayController.show(PlayController.current_project.length - 1, false);
    } else {
      PlayController.show(PlayController.current_index - 1, false);
    }
  },

  previousWithAnimation: function () {
    if (PlayController.current_animation) {
      PlayController.current_index = PlayController.current_animation.startIndex;
      PlayController.previous();
    } else {
      PlayController.previous();
    }
  },

  next: function () {
    if (PlayController.current_index == PlayController.current_project.length - 1) {
      PlayController.show(0, true);
    } else {
      PlayController.show(PlayController.current_index + 1, true);
    }
  },

  nextWithAnimation: function () {
    if (PlayController.current_animation) {
      PlayController.current_index = PlayController.current_animation.endIndex;
      PlayController.next();
    } else {
      PlayController.next();
    }
  },

  show: function (index, toNEXT) {
    $("#arrow").text("");
    /*clearTimeout(PlayController.timerid);
      var animation = null;
      if (toNEXT == true) {
      for (var i = 0, n = PlayController.animations.length; i < n; i++) {
      if (PlayController.animations[i].startIndex == index) {
      animation = PlayController.animations[i];
      PlayController.current_index = animation.endIndex;
      PlayController.animate(index, animation.startIndex, animation.endIndex, animation.duration);
      PlayController.current_animation = animation;
      break;
      }
      }
      }*/
    $('.annotations').remove();
    for (var i = 0; i < PlayController.annotations.length; i++) {
      if (index == PlayController.annotations[i].index) {
        PlayController.setAnnotation(
            PlayController.annotations[i].x,
            PlayController.annotations[i].y,
            PlayController.annotations[i].angle);
      }
    }
    for (var i = 0; i < PlayController.newAnnotations.length; i++) {
      if (index + 1 == PlayController.newAnnotations[i].index) {
        PlayController.setAnnotation(
            PlayController.newAnnotations[i].x,
            PlayController.newAnnotations[i].y,
            PlayController.newAnnotations[i].angle);
      }
    }
    PlayController.current_animation = null;
    PlayController.current_index = index;
    PlayController.setPhoto(index);
  },

  setAnnotation: function (x, y, angle) {
    var a = $('<img>', {
      class: 'annotations'
    });
    a.attr('src', 'annotations/arrow.svg');
    a.css({
      "left": -250 + x + "px", //padding of coordinate image pointed 
      "top": -50 + y + "px", //TODO : get from configXML in htdocs/annotations
      "transform-origin": "250px 50px", //pointed coordinate
      "transform": "rotate(" + angle + "deg)"
    });
    a.click(function (e) {
      PlayController.makeAnnotation(e)
    });
    a.appendTo($('#controller'));
  },

  updateAnnotationsTable: function(){
    var table = $('#annotationsTable')[0];
    for(var i=0; i<PlayController.newAnnotations.length;i++){
      var a = PlayController.newAnnotations[i];
      var row = $("<tr/>");
      row.innerHTML = "<td>"+a['index']+"</td><td>"+
        a['image']+"</td><td>"+
        a['x']+"</td><td>"+
        a['y']+"</td><td>"+
        a['angle']+"</td>";
      row[0].appendTo(table);
    }

  },

  /*
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
     */
  setPhoto: function (index) {
    $("#photo").attr("src", PlayController.current_project[index]);
    $("#counter").text((index + 1) + "/" + PlayController.current_project.length);
  }
  }

        $(document).ready(function () {
          PlayController.init();
        });
