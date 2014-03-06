/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var PlayConfig = {
  configList:{
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
    },
    notes:{
      tag:'notes',
      name:'note',
      values:{
        index:'int',
        url:'string'
      }
    }
  },

  init : function(){
    console.log("config controller initialized");
    PlayConfig.index = -1;
  },
  projectInit: function(id){
    this.imgURLs = [];
    this.annotations = [];
    this.animations = [];
    this.index = 0;
    this.projectName = id;
    this.notes = [];
  },

  parse: function(xml){ //called once when project loaded

    var parser = new DOMParser();
    doc = parser.parseFromString(xml, "application/xml");
    this.xml = xml;
    var animations = this.getObjectsFromXML(doc,this.configList['animation']);
    var annotations = this.getObjectsFromXML(doc,this.configList['annotation']);
    var imgurls = this.getObjectsFromXML(doc,this.configList['imgurls']);
    var notes = this.getObjectsFromXML(doc,this.configList['notes']);
    if(animations.length > 0)for(i in animations){
      animations[i].index--;
      this.animations.push(animations[i]);
    }

    if(annotations.length > 0)for(i in annotations){
      annotations[i].index--;
      this.annotations.push(annotations[i]);
    }

    if(notes.length > 0)for(i in notes){
      notes[i].index--;
      this.notes.push(notes[i]);
    }

    for(i in imgurls){
      this.imgURLs.push(imgurls[i].url);
    }
    console.log("load and parsed");
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

  createNoteElem: function(obj){
    var elem = document.createElement('note');
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
    var notes = document.createElement('notes');

    for(i in this.annotations){
      annotations.appendChild(this.createAnnotationElem(this.annotations[i]));
    }

    for(i in this.notes){
      notes.appendChild(this.createNoteElem(this.notes[i]));
    }

    for(i in this.animations){
      animations.appendChild(this.createAnimationElem(this.animations[i]));
    }
    for(i in this.imgURLs){ 
      imgURLs.appendChild(this.createImgURLElem(i,this.imgURLs[i]));
    } 
    doc.appendChild(notes);
    doc.appendChild(annotations);
    doc.appendChild(animations);
    doc.appendChild(imgURLs);
    this.xml = serializer.serializeToString(doc);
    console.log(this.xml);
  },

  insertIndex: function(src,dst){
    var srcImg = this.imgURLs[src];
    this.imgURLs.splice(src,1);
    if (src > dst){
      dst++;
    }
    this.imgURLs.splice(dst,0,srcImg);
    console.log(this.imgURLs);
  },

  removeIndex: function(index){
    this.imgURLs.splice(index,1);
  },


  addAnimation : function(){

  },

  postConfig: function(){
    this.setXMLFromObjects();
    $.post("/api/postConfig.php",
        {project:this.projectName,data:this.xml},
        function(){console.log("posted");},
        "json");
  }
};
