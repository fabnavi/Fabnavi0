/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with PlayConfig file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

var Keys = {
  /*
   * Key.isActive() はx,y,w,hの Key が選択されているとき、ページを送らないように
   * するために必要です。
   *
   */
  playerKeyBind: function () {
    window.onkeydown = function(e) {
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 81 :
        case 27 : {
          ListController.clear();
          PlayConfig.initProject();
          CommonController.localConfig = "";
          $('#projectList').show();
          $('#contents').hide();
          document.title = "Play: FabNavi";
          break;
        }
        case 37 :
        case 97 : {
          if(!Keys.isActive())PlayController.previous();
          break;
        }
        case 39 :
        case 99 : {
          if(!Keys.isActive())PlayController.next();
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
        case 13: {
//        Note.shoot();
          break;
        }
        case 86 : {
          PlayController.info();
          break;
        }
        // Common Key Bind
        case 88:{
          document.getElementById('x').focus();
          break;
        }
        case 89:{
          document.getElementById('y').focus();
          break;
        }
        case 87:{
          document.getElementById('w').focus();
          break;
        }
        case 72:{
          document.getElementById('h').focus();
          break;
        }
        case 191 : {
          $('.help').fadeIn(1000);
          window.setTimeout(function () {
            $('.help').fadeOut(3000);
          },10000);
          break;
        }
        case 219:{
          if(e.ctrlKey)document.activeElement.blur();
          break;
        }
      }
    };

  },

  recorderKeyBind: function () {
    window.onkeydown = function(e) {
      switch (e.keyCode) {
        case 81 :
        case 27 : {
          location.reload();
          break;
        }
        case 52 : {
          if(!Keys.isActive())PlayController.previous();
          break;
        }
        case 54 : {
          if(!Keys.isActive())PlayController.next();
          break;
        }
        case 13: {
          RecordController.shoot();
          break;
        }
        case 86 : {
          PlayController.info();
          break;
        }
        // Common Key Bind
        case 88:{
          document.getElementById('x').focus();
          break;
        }
        case 89:{
          document.getElementById('y').focus();
          break;
        }
        case 87:{
          document.getElementById('w').focus();
          break;
        }
        case 72:{
          document.getElementById('h').focus();
          break;
        }
        case 219:{
          if(e.ctrlKey)document.activeElement.blur();
          break;
        }
      }
    };

  },

  isActive: function(){
    var id = document.activeElement.id;
    var i = ['x','y','w','h'].indexOf(id);
    if(i == -1)return false;
    else return true;
  }
};
