/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var PlayController = {
  init: function() {
    PlayConfig.init();
      PlayConfig.selected = PlayController.play;

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
          if(typeof(ListController) != "undefined")ListController.clear();
          PlayConfig.projectInit();
          CommonController.localConfig = "";
          document.title = "Play: FabNavi";
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
          PlayController.info();
          break;
        }
      }
    });

    this.cvs = document.getElementById('cvs');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = screen.width;
    this.cvs.height = screen.height;

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
      console.log(ID);
      PlayController.play(ID);
        $('img').hide();
      window.setTimeout(function(){
        PlayController.previous
        $('img').show();
      },300);
    }
    if(typeof(ListController) != "undefined")ListController.init();

    if(typeof(ListController) != "undefined")ListController.rowClicked = function(e){
      for(i in PlayConfig.imgURLs){
        if(PlayConfig.imgURLs[i].indexOf(e.currentTarget.id) != -1){
          PlayController.setPhoto(i);
          PlayConfig.index = i;
          break;
        }
      }
    };
  },

  load: function() {
    ProjectList.load();
  },

  drawImage:function(){
/*    this.cvs.style.width = screen.width + "px";
    this.cvs.style.height= screen.height + "px";
    this.cvs.width = CommonController.localConfig.w;
    this.cvs.height= CommonController.localConfig.h;*/
    this.ctx.drawImage(
        document.getElementById('photo'),
        CommonController.localConfig.x,
        CommonController.localConfig.y,
        CommonController.localConfig.w,
        CommonController.localConfig.h,
         0,0,
        CommonController.localConfig.w,
        CommonController.localConfig.h);
//640,480);//         this.cvs.width,
//        this.cvs.height);
  },


  play: function(id) {
    var url = "data/"+id+"/fabnavi.play.config";
    PlayConfig.projectInit(id);
    CommonController.getLocalConfig(id);
    CommonController.getContents(url)
      .then(function(result) {
        PlayConfig.parse(result);
      })
    .done(function() {
      if(PlayConfig.imgURLs.length == 0){
        CommonController.getJSON("api/getProject.php?project_id="+id, function(result, error) {
          if (error) {
            alert(error);
            return;
          }
          PlayConfig.imgURLs = result;
          PlayController.playSlide(id);
        }); 
      } else {
        PlayController.playSlide(id);
      }
    });
  },

  playSlide : function(id){
    for(i in PlayConfig.imgURLs){
      if(typeof(ListController) != "undefined")ListController.append(PlayConfig.imgURLs[i]);
    }
    document.title = "Play: " +id;

    var parameters = PlayController.getParametersFromQuery();
    var startIndex = 0;
    if (parameters["s"]) {
      startIndex = parseInt(parameters["s"])-1;
    }
    PlayController.show(startIndex, true);
    $("#controller").show();
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
    if (PlayConfig.index == 0) {
      PlayController.show(PlayConfig.imgURLs.length-1, false);
    } else {
      PlayController.show(PlayConfig.index-1, false);
    }
  },

  previousWithAnimation: function() {
    if (PlayController.current_animation) {
      PlayConfig.index = PlayController.current_animation.startIndex;
      PlayController.previous();
    } else {
      PlayController.previous();
    }
  },

  next: function() {
    if (PlayConfig.index == PlayConfig.imgURLs.length-1) {
      PlayController.show(0, true);
    } else {
      PlayController.show(Number(PlayConfig.index)+1, true);
    }
  },

  nextWithAnimation: function() {
    if (PlayController.current_animation) {
      PlayConfig.index = PlayController.current_animation.endIndex;
      PlayController.next();
    } else {
      PlayController.next();
    }
  },

  show: function(index, toNEXT) {
    $("#arrow").text("");
    clearTimeout(PlayController.timerid);
    //---------Annotations
    $('.annotations').remove();
    for (var i=0; i<PlayConfig.annotations.length;i++){
      if(index == PlayConfig.annotations[i].index){
        PlayController.setAnnotation(
            PlayConfig.annotations[i].x,
            PlayConfig.annotations[i].y,
            PlayConfig.annotations[i].angle);
      }
    }
    PlayController.current_animation = null;
    PlayConfig.index = index;
    console.log(index);
    PlayController.setPhoto(index);
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
    if(typeof(ListController) != "undefined"){
      ListController.selectByName(PlayConfig.imgURLs[index]);
    }
    $("#photo").attr("src", PlayConfig.imgURLs[index]);
    $("#counter").text((index+1)+"/"+PlayConfig.imgURLs.length);
    if(CommonController.localConfig != ""){
      PlayController.drawImage();
      $('#cvs').css('display','block');
      $('#photo').css('display','none');
    } else {
      $('#photo').css('display','block');
      $('#cvs').css('display','none');
    }
  },

  info : function(){
    var elem = $('#panel');
    if(elem.is(":visible"))
      elem.hide();
    else 
      elem.show();
  }
}

$(document).ready(function() {
  PlayController.init();
});
