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
      this.animations.push(animations[i]);
    }

    if(annotations.length > 0)for(i in annotations){
      annotations[i].index--;
      this.annotations.push(annotations[i]);
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
  addAnnotation: function(){


  },

  addAnimation : function(){

  },

  postConfig: function(){
    $.post("/api/postConfig.php",
          {project:PlayController.project_id,data:xml},
          function(){console.log("posted");},
          "json");
  }






};
