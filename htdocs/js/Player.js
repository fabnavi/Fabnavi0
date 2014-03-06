/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var PlayController = {
  init: function() {
    PlayController.defaultInit();
    PlayController.initKeyBind();
    CalibrateController.init();

    ProjectList.load();
    ProjectList.selected = PlayController.play;
    $('#projectList').show();
    $('#contents').hide();
    if(ID != ""){
      $('#projectList').hide();
      $('#contents').hide();
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

  defaultInit : function () {
    this.cvs = document.getElementById('cvs');
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = screen.width;
    this.cvs.height = screen.height;
  },
  initKeyBind: function () {
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
          if(typeof(ListController) != "undefined")ListController.clear();
          PlayConfig.projectInit();
          CommonController.localConfig = "";
          $('#projectList').show();
          $('#contents').hide();
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

  },

  exitProject : function(){

  },

  load: function() {
    ProjectList.load();
  },

  draw: function(){
    PlayController.drawImage(document.getElementById('photo'));
  },

  drawNote:function (noteURL){
    var img = new Image();
    img.src = noteURL;
    img.onload = function(){
      PlayController.drawImage(img);
    };
  },

  drawImage:function(image){
    PlayController.ctx.drawImage(
        image,
        CommonController.localConfig.x,
        CommonController.localConfig.y,
        CommonController.localConfig.w,
        CommonController.localConfig.h,
        0,0,
        PlayController.cvs.width,
        PlayController.cvs.height);
  },

  play: function(id) {
    $('#projectList').hide();
    $('#contents').show();
    CommonController.getLocalConfig(id);
    CalibrateController.play(id);
    PlayConfig.projectInit(id).then(function(){
      PlayController.playSlide(id);
      PlayController.show(0,true);
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
    $("#contents").show();
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
    a.appendTo($('#contents'));
  },

  setPhoto: function(index) {
    PlayController.ctx.clearRect(0,0,PlayController.cvs.width,PlayController.cvs.height);
    var url = PlayConfig.imgURLs[index];
    if(typeof(ListController) != "undefined"){
      ListController.selectByName(url);
    }
    $("#photo").attr("src",url); 
    $("#counter").text((index+1)+"/"+PlayConfig.imgURLs.length);
    if(CommonController.localConfig == ""){
      CommonController.localConfig = {x:0,y:0,w:$('#photo').width(),h:$('#photo').height()};
    }
    PlayController.draw();
    for(i in PlayConfig.notes){
      if(PlayConfig.notes[i].index == PlayConfig.index)PlayController.drawNote(PlayConfig.notes[i].url);
    }
    $('#cvs').css('display','block');
    $('#photo').css('display','none');
  },

  info : function(){
    var elem = $('#panel');
    if(elem.is(":visible"))
      elem.hide();
    else 
      elem.show();
  }
}

