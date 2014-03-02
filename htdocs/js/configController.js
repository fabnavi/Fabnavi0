/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var ConfigController = {

  init : function(){
    console.log("config controller initialized");
  },

  parse: function(xml){ //called once when project loaded

    var parser = new DOMParser();
    doc = parser.parseFromString(xml, "application/xml");
    this.xml = xml;
    var animations = this.getObjectsFromXML(doc,this.configList['animation']);
    var annotations = this.getObjectsFromXML(doc,this.configList['annotation']);
    var imgurls = this.getObjectsFromXML(doc,this.configList['imgurls']);
    if(animations.length > 0)for(i in animations){
      animations[i].index--;
      CommonController.animations.push(animations[i]);
    }

    if(annotations.length > 0)for(i in annotations){
      annotations[i].index--;
      CommonController.annotations.push(annotations[i]);
    }
    for(i in imgurls){
      CommonController.imgURLs.push(imgurls[i].url);
    }
  },

  getObjectsFromXML: function(xml,conf){
    var nodes= xml.getElementsByTagName(conf.tag);
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

  createAnnotationElem: function(obj){
    var elem = document.createElement('annotation');
    for (key in obj){
      elem.setAttribute(key,obj[key]);
    }
    return elem;
  },

  createAnimationElem: function(obj){
    var elem = document.createElement('animation');
    for (key in obj){
      elem.setAttribute(key,obj[key]);
    }
    return elem;
  },

  createImgURLElem: function(i,url){
    var elem = document.createElement('imgurl');
    elem.setAttribute('index',i);
    elem.setAttribute('url',url);
    return elem;
  },

  setXMLFromObjects: function(){
    var serializer = new XMLSerializer();
    var doc = document.createElement('playSetting');
    var annotations = document.createElement('annotations');
    var animations = document.createElement('animations');
    var imgURLs = document.createElement('imgurls');

    for(i in CommonController.annotations){
      annotations.appendChild(this.createAnnotationElem(CommonController.annotations[i]));
    }

    for(i in CommonController.animations){
      animations.appendChild(this.createAnimationElem(CommonController.animations[i]));
    }
    for(i in CommonController.imgURLs){ 
      imgURLs.appendChild(this.createImgURLElem(i,CommonController.imgURLs[i]));
    } 
    doc.appendChild(annotations);
    doc.appendChild(animations);
    doc.appendChild(imgURLs);
    this.xml = serializer.serializeToString(doc);
    console.log(this.xml);
  },

  insertIndex: function(src,dst){
    var srcImg = CommonController.imgURLs[src];
    CommonController.imgURLs.splice(src,1);
    if (src > dst){
      dst++;
    }
    CommonController.imgURLs.splice(dst,0,srcImg);
    console.log(CommonController.imgURLs);
  },

  removeIndex: function(index){
    CommonController.imgURLs.splice(index,1);
  },

  addAnnotation: function(){


  },

  addAnimation : function(){

  },

  postConfig: function(){
    this.setXMLFromObjects();
    $.post("/api/postConfig.php",
        {project:CommonController.projectName,data:this.xml},
        function(){console.log("posted");},
        "json");
  }
};
