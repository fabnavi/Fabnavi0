/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with PlayConfig file,
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

  fastDraw:false,

  init : function(id){
    PlayConfig.index = -1;
    PlayConfig.imgURLs = [];
    PlayConfig.annotations = [];
    PlayConfig.animations = [];
    PlayConfig.index = 0;
    PlayConfig.projectName = id;
    PlayConfig.notes = [];
    $('#savePlaylist').click(PlayConfig.postConfig);
    //    Panel.init();
  },

  initProject: function(id){
    PlayConfig.init(id);
    var d = new $.Deferred();
    var url = "data/"+id+"/fabnavi.play.config";
    CommonController.getContents(url)
      .then(function(result) {
        PlayConfig.parse(result);
      })
    .then(function() {
      if(PlayConfig.imgURLs.length == 0){
        CommonController.getJSON("project/getProject?project_id="+id,
          function(result, error) {
            if (error) {
              alert(error);
              return;
            }
            console.log("********");
            PlayConfig.imgURLs = result;
            d.resolve();
            PlayConfig.postConfig();
          }); 
      }else{
        d.resolve();
      }

    });
    return d.promise();
  },

  parse: function(xml){ //called once when project loaded

    var parser = new DOMParser();
    doc = parser.parseFromString(xml, "application/xml");
    PlayConfig.xml = xml;
    var animations = PlayConfig.getObjectsFromXML(doc,PlayConfig.configList['animation']);
    var annotations = PlayConfig.getObjectsFromXML(doc,PlayConfig.configList['annotation']);
    var imgurls = PlayConfig.getObjectsFromXML(doc,PlayConfig.configList['imgurls']);
    var notes = PlayConfig.getObjectsFromXML(doc,PlayConfig.configList['notes']);
    if(animations.length > 0)for(i in animations){
      animations[i].index--;
      PlayConfig.animations.push(animations[i]);
    }

    if(annotations.length > 0)for(i in annotations){
      annotations[i].index--;
      PlayConfig.annotations.push(annotations[i]);
    }

    if(notes.length > 0)for(i in notes){
      //      notes[i].index--;
      PlayConfig.notes.push(notes[i]);
    }

    for(i in imgurls){
      PlayConfig.imgURLs.push(imgurls[i].url);
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

    for(i in PlayConfig.annotations){
      annotations.appendChild(PlayConfig.createAnnotationElem(PlayConfig.annotations[i]));
    }

    for(i in PlayConfig.notes){
      notes.appendChild(PlayConfig.createNoteElem(PlayConfig.notes[i]));
    }

    for(i in PlayConfig.animations){
      animations.appendChild(PlayConfig.createAnimationElem(PlayConfig.animations[i]));
    }
    for(i in PlayConfig.imgURLs){ 
      imgURLs.appendChild(PlayConfig.createImgURLElem(i,PlayConfig.imgURLs[i]));
    } 
    doc.appendChild(notes);
    doc.appendChild(annotations);
    doc.appendChild(animations);
    doc.appendChild(imgURLs);
    PlayConfig.xml = serializer.serializeToString(doc);
  },

  insertIndex: function(src,dst){
    var srcImg = PlayConfig.imgURLs[src];
    PlayConfig.imgURLs.splice(src,1);
    if (src > dst){
      dst++;
    }
    PlayConfig.imgURLs.splice(dst,0,srcImg);
  },

  removeIndex: function(index){
    PlayConfig.imgURLs.splice(index,1);
  },

  postConfig: function(){
    PlayConfig.setXMLFromObjects();
    $.post("project/postConfig",
        {project_id:PlayConfig.projectName,data:PlayConfig.xml},
        function(){},
        "json");
  }
};
