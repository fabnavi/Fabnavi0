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
    if(animations.length > 0)for(i in animations){
      animations[i].index--;
      CommonController.animations.push(animations[i]);
    }

    if(annotations.length > 0)for(i in annotations){
      annotations[i].index--;
      CommonController.annotations.push(annotations[i]);
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

  createAnnotationElem: function(index,image,x,y,angle,w,h){
    var elem = document.createElement('annotation');
    elem.setAttribute('index',index);
    elem.setAttribute('image',image);
    elem.setAttribute('x',x);
    elem.setAttribute('y',y);
    elem.setAttribute('angle',angle);
    elem.setAttribute('w',w);
    elem.setAttribute('h',h);
    return elem;
  },

  createAnimationElem: function(startIndex,endIndex,duration){
   var elem = document.createElement('animation');
    elem.setAttribute('startIndex',startIndex);
    elem.setAttribute('endIndex',endIndex);
    elem.setAttribute('duration',duration);
    return elem;
  },

  setXMLFromObjects: function(){
    var serializer = new XMLSerializer();
    var doc = document.createElement('playSetting');
    var annotations = document.createElement('annotations');
    var animations = document.createElement('animations');
    
    doc.appendChild(annotations);
    doc.appendChild(animations);
    console.log(serializer.serializeToString(doc));
  },

  addAnnotation: function(){


  },

  addAnimation : function(){

  },

  postConfig: function(){
    $.post("/api/postConfig.php",
          {project:CommonController.projectName,data:this.xml},
          function(){console.log("posted");},
          "json");
  }
};
