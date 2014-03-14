var Keys = {
  playerKeyBind: function () {
    window.onkeydown = function(e) {
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 81 :
        case 27 : {
          if(typeof(ListController) != "undefined")ListController.clear();
          PlayConfig.initProject();
          CommonController.localConfig = "";
          $('#projectList').show();
          $('#contents').hide();
          document.title = "Play: FabNavi";
          break;
        }
        case 37 :
        case 97 : {
          PlayController.previous();
          break;
        }
        case 39 :
        case 99 : {
          PlayController.next();
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
          PlayController.previous();
          break;
        }
        case 54 : {
          PlayController.next();
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
      }
    };

  }
};
