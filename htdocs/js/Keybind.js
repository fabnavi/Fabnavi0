var Keys = {

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
          Note.shoot();
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
