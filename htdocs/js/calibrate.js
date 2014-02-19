/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var CalibrateController = {
  init: function() {
    CalibrateController.current_index = -1;
    
    CalibrateController.configList={
      animation:{
        tag:'animations', 
        name:'animation',
        values:{
          startIndex:'int',
          endIndex:'int',
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
      }
    };

    $(window).keydown(function(e) {
      switch (e.keyCode) {
        case 97 : 
        case 37 : {
          CalibrateController.previousWithAnimation();
          break;
        }
        case 99 : 
        case 39 : {
          CalibrateController.nextWithAnimation();
          break;
        }
        case 81 :
        case 27 : {
          $("#controller").hide();
          break;
        }
        case 52 : {
          CalibrateController.previous();
          break;
        }
        case 54 : {
          CalibrateController.next();
          break;
        }
        case 105 : {
          window.close();
          break;
        }
        case 104 : {
          location.reload();
        }
      }
    });

    $('#x').val(0);
    $('#y').val(0);
    $('#h').val(10000);
    $('#w').val(10000);
    CalibrateController.valueListener($('#x'),$('#px'));
    CalibrateController.valueListener($('#y'),$('#py'));
    CalibrateController.valueListener($('#w'),$('#pw'));
    CalibrateController.valueListener($('#h'),$('#ph'));
    CalibrateController.cvs = document.getElementById('cvs');
    CalibrateController.ctx = CalibrateController.cvs.getContext('2d');
    CalibrateController.image = new Image();
    CalibrateController.cvs.height = $(document).height();
    CalibrateController.cvs.width = $(document).width();
    $("#close").click(function() {
      $("#controller").hide();
    });
    $("#previous").click(CalibrateController.previous);
    $("#next").click(CalibrateController.next);

    CalibrateController.load();
    if(ID != ""){
      $('#contents').hide();
      $('#controller').hide();
      $('img').hide();
      CalibrateController.play(ID)
      $('img').hide();
      window.setTimeout(function(){
        CalibrateController.previous
      },300);
    }
  },

  drawImage:function(){
    var w = $('#w').val();
    var h = $('#h').val();
    $('#w').attr('max',CalibrateController.image.naturalWidth - $('#x').val());
    $('#h').attr('max',CalibrateController.image.naturalHeight- $('#y').val());
    if(w > CalibrateController.image.naturalWidth - $('#x').val()){
      w = CalibrateController.image.naturalWidth - $('#x').val();
      $('#w').val(w);
    }
    if(h > CalibrateController.image.naturalHeight- $('#y').val()){
      h = CalibrateController.image.naturalHeight - $('#y').val();
      $('#h').val(h);
    }
    //$('#w').attr('max',CalibrateController.image.naturalWidth -$('#x'));
    //$('#h').attr('max',CalibrateController.image.naturalHeight -$('#y'));
    CalibrateController.ctx.drawImage(
      CalibrateController.image,
      $('#x').val(),
      $('#y').val(),
      w,h,
      0,0,
      CalibrateController.cvs.width,CalibrateController.cvs.height);
  },

  postConfig : function(){

  },

  valueListener: function(obj,target){
    obj.mousemove(function(e){
      target.text(obj.val());
      CalibrateController.drawImage();
    }); 
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
          CalibrateController.play(id);       
        });

        projectList.append(li);
      }
    });
  },

  configParser: function(text){
    var parser = new DOMParser();
    doc = parser.parseFromString(text, "application/xml");

    var animations = CalibrateController.getObjectsFromXML(doc,CalibrateController.configList['animation']);
    var annotations = CalibrateController.getObjectsFromXML(doc,CalibrateController.configList['annotation']);
    if(animations.length > 0)for(i in animations){
      animations[i].index--;
      CalibrateController.animations.push(animations[i]);
    }

    if(annotations.length > 0)for(i in annotations){
      annotations[i].index--;
      CalibrateController.annotations.push(annotations[i]);
    }

  }, 

  getObjectsFromXML: function(doc,conf){
    var nodes= doc.getElementsByTagName(conf.tag);
    if(nodes.length == 0){
      return {};
    }
    var objs = [];
    nodes = nodes[0].children;
    for(var i=0;i<nodes.length;i++){
      if(nodes[i].tagName == conf.name){
        var obj = {};
        for(key in conf.values){
            var v = nodes[i].getAttribute(key);
            if(v == null){
              console.log("Attribute " +key+" not found");
            }else if(conf.values[key] == 'int'){
              var r = parseInt(v,10);
              if(isNaN(r))console.log(v+" is declared as int, but NaN");
              else obj[key] = r;
            }else if(conf.values[key] == 'string'){
              obj[key] = v;
            } else {
              console.log("cannot understand the type :"+conf.values[key] + " of " + key);
            }
        }
        objs.push(obj);
      }
    }
    return objs;
  },

  play: function(id) {
    var url = "data/"+id+"/fabnavi.play.config";
    CalibrateController.animations = [];
    CalibrateController.annotations = [];
    console.log(url);
    CommonController.getContents(url)
    .then(function(result) {
      CalibrateController.configParser(result);
    })
    .done(function() {
      CommonController.getJSON("api/getProject.php?project_id="+id, function(result, error) {
        if (error) {
          alert(error);
          return;
        }
        CalibrateController.current_project = result;

        var parameters = CalibrateController.getParametersFromQuery();
        var startIndex = 0;
        if (parameters["s"]) {
          startIndex = parseInt(parameters["s"])-1;
        }
        CalibrateController.show(startIndex, true);
        $("#controller").show();
        $('img').hide();
        
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
    if (CalibrateController.current_index == 0) {
      CalibrateController.show(CalibrateController.current_project.length-1, false);
    } else {
      CalibrateController.show(CalibrateController.current_index-1, false);
    }
  },

  previousWithAnimation: function() {
    if (CalibrateController.current_animation) {
      CalibrateController.current_index = CalibrateController.current_animation.startIndex;
      CalibrateController.previous();
    } else {
      CalibrateController.previous();
    }
  },

  next: function() {
    if (CalibrateController.current_index == CalibrateController.current_project.length-1) {
      CalibrateController.show(0, true);
    } else {
      CalibrateController.show(CalibrateController.current_index+1, true);
    }
  },

  nextWithAnimation: function() {
    if (CalibrateController.current_animation) {
      CalibrateController.current_index = CalibrateController.current_animation.endIndex;
      CalibrateController.next();
    } else {
      CalibrateController.next();
    }
  },

  show: function(index, toNEXT) {
    $("#arrow").text("");
    clearTimeout(CalibrateController.timerid);
    $('.annotations').remove();
    for (var i=0; i<CalibrateController.annotations.length;i++){
      if(index == CalibrateController.annotations[i].index){
        CalibrateController.setAnnotation(
          CalibrateController.annotations[i].x,
          CalibrateController.annotations[i].y,
          CalibrateController.annotations[i].angle);
      }
    }
      CalibrateController.current_animation = null;
      CalibrateController.current_index = index;
      CalibrateController.setPhoto(index);
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
    $("#photo").attr("src", CalibrateController.current_project[index]);
    CalibrateController.image.src = CalibrateController.current_project[index];
    CalibrateController.image.onload = function(){
      $('#x').attr('max',CalibrateController.image.naturalWidth);
      $('#y').attr('max',CalibrateController.image.naturalHeight);
      CalibrateController.drawImage();
    };
    $("#counter").text((index+1)+"/"+CalibrateController.current_project.length);
  }
}

$(document).ready(function() {
  CalibrateController.init();
});
