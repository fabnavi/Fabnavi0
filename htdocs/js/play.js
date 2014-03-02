/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var PlayController = {
  init: function() {
    ConfigController.index = -1;
    ConfigController.init();
    ConfigController.configList={
      animation:{
        tag:'animations', 
        name:'animation',
        values:{
          startindex:'int',
          endindex:'int',
          duration:'int'
        }
      },
      annotation:{
        tag:'annotations',
        name:'annotation',
        values:{
          index:'int',
          image:'string',
          x:'int',
          y:'int',
          w:'int',
          h:'int',
          angle:'int'
        }    
      },
      imgurls:{
       tag:'imgurls',
       name:'imgurl',
       values:{
        index:'int',
        url:'string'
       }
      }
    };

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
        case 81 :
        case 27 : {
          $("#controller").hide();
          ListController.clear();
          ConfigController.projectInit();
          document.title = "Calibration : FabNavi";
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
        case 32 :
        case 105 : {
          window.close();
          break;
        }
        case 104 : {
          location.reload();
          break;
        }
        case 86 : {
          CalibrateController.info();
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
    if(ID != ""){
      $('#contents').hide();
      $('#controller').hide();
      $('img').hide();
      PlayController.play(ID)
        $('img').hide();
      window.setTimeout(function(){
        PlayController.previous
        $('img').show();
      },300);
    }
    ListController.init();

    ListController.rowClicked = function(e){
      for(i in ConfigController.imgURLs){
        if(ConfigController.imgURLs[i].indexOf(e.currentTarget.id) != -1){
          PlayController.setPhoto(i);
          ConfigController.index = i;
          break;
        }
      }
    };
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
        li.click(function(e){
          var target = $(e.currentTarget);
          var id = target.attr("id");
          PlayController.play(id);       
        });

        projectList.append(li);
      }
    });
  },

  play: function(id) {
    var url = "data/"+id+"/fabnavi.play.config";
    ConfigController.projectInit(id);
    CommonController.getContents(url)
      .then(function(result) {
        ConfigController.parse(result);
      })
    .done(function() {
      CommonController.getJSON("api/getProject.php?project_id="+id, function(result, error) {
        if (error) {
          alert(error);
          return;
        }
//        ConfigController.imgURLs = result;

        for(i in ConfigController.imgURLs){
          ListController.append(ConfigController.imgURLs[i]);
        }

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
    if (ConfigController.index == 0) {
      PlayController.show(ConfigController.imgURLs.length-1, false);
    } else {
      PlayController.show(ConfigController.index-1, false);
    }
  },

  previousWithAnimation: function() {
    if (PlayController.current_animation) {
      ConfigController.index = PlayController.current_animation.startIndex;
      PlayController.previous();
    } else {
      PlayController.previous();
    }
  },

  next: function() {
    if (ConfigController.index == ConfigController.imgURLs.length-1) {
      PlayController.show(0, true);
    } else {
      PlayController.show(Number(ConfigController.index)+1, true);
    }
  },

  nextWithAnimation: function() {
    if (PlayController.current_animation) {
      ConfigController.index = PlayController.current_animation.endIndex;
      PlayController.next();
    } else {
      PlayController.next();
    }
  },

  show: function(index, toNEXT) {
    $("#arrow").text("");
    clearTimeout(PlayController.timerid);
    $('.annotations').remove();
    for (var i=0; i<ConfigController.annotations.length;i++){
      if(index == ConfigController.annotations[i].index){
        PlayController.setAnnotation(
            ConfigController.annotations[i].x,
            ConfigController.annotations[i].y,
            ConfigController.annotations[i].angle);
      }
    }
    //if (!animation) {
    PlayController.current_animation = null;
    ConfigController.index = index;
    console.log(index);
    PlayController.setPhoto(index);
    //}
  },

  setAnnotation: function(x,y,angle){
    var a = $('<img>',{class:'annotations'});
    a.attr('src','annotations/arrow.svg'); 
    a.css({
      "left":-200+x+"px", //padding of coordinate image pointed 
      "top":-50+y+"px", //TODO : get from configXML in htdocs/annotations
      "transform-origin":"200px 50px", //pointed coordinate
      "transform":"rotate("+angle+"deg)"
    });
    a.appendTo($('#controller'));
  },

  setPhoto: function(index) {
    ListController.selectByName(ConfigController.imgURLs[index]);
    $("#photo").attr("src", ConfigController.imgURLs[index]);
    $("#counter").text((index+1)+"/"+ConfigController.imgURLs.length);
  }
}

$(document).ready(function() {
  PlayController.init();
});
