/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var CalibrateController = {
  init: function(){
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
    CalibrateController.image = document.getElementById('photo');
    CalibrateController.cvs.height = screen.height;
    CalibrateController.cvs.width = screen.width;
    $("#save").click(CalibrateController.saveConfig);

  },

  updateConfig:function(){
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
    var x = $('#x').val();
    var y = $('#y').val();
    CommonController.localConfig = {
      x:x,y:y,w:w,h:h
    };
  },

  saveConfig : function(){
    if(CommonController.localConfig != "")CommonController.setLocalConfig(PlayConfig.projectName);
  },

  valueListener: function(obj,target){
    obj.mousemove(function(e){
      target.text(obj.val());
      CalibrateController.updateConfig();
      PlayController.show(PlayConfig.index);
    }); 
    obj.on('keydown',function(e){
      target.text(obj.val());
      CalibrateController.updateConfig();
      PlayController.show(PlayConfig.index);
    }); 
  },
  update : function(){
    $('#px').text = $('#x').val();
    $('#py').text = $('#y').val();
    $('#pw').text = $('#w').val();
    $('#ph').text = $('#h').val();
      CalibrateController.updateConfig();
      PlayController.show(PlayConfig.index);

  },
  initProject: function(id) {
    if(CommonController.localConfig != ""){
      $('#x').val(CommonController.localConfig.x);
      $('#y').val(CommonController.localConfig.y);
      $('#w').val(CommonController.localConfig.w);
      $('#h').val(CommonController.localConfig.h);
    }
  }
}

