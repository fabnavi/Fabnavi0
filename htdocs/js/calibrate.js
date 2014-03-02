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
    CalibrateController.image = new Image();
    CalibrateController.cvs.height = $(document).height();
    CalibrateController.cvs.width = $(document).width();

    $("#save").click(CalibrateController.saveConfig);

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
    var x = $('#x').val();
    var y = $('#y').val();
    CalibrateController.ctx.drawImage(
        CalibrateController.image,
        x,y,
        w,h,
        0,0,
        CalibrateController.cvs.width,CalibrateController.cvs.height);
    CommonController.localConfig = {
      x:x,y:y,w:w,h:h
    };

  },

  saveConfig : function(){
    if(CommonController.localConfig != "")CommonController.setLocalConfig(CalibrateController.id);
  },

  valueListener: function(obj,target){
    obj.mousemove(function(e){
      target.text(obj.val());
      CalibrateController.drawImage();
    }); 
  },


  play: function(id) {
    CalibrateController.id = id;

    if(CommonController.localConfig != ""){
      $('#x').val(CommonController.localConfig.x);
      $('#y').val(CommonController.localConfig.y);
      $('#w').val(CommonController.localConfig.w);
      $('#h').val(CommonController.localConfig.h);
    }
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
  CalibrateController.init();
});
