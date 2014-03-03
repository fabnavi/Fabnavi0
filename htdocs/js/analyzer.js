var Analyzer = {
  init : function () {
   this.loadImg('data/lego/board/photo1.jpg');
   this.analyze();

  },
  analyze: function () {
    this.cvs = document.getElementById('analyzer'); 
    this.cvs.style.position = "absolute";
    this.cvs.style.top = "0px";
    this.cvs.style.left = "0px";
    this.cvs.width = screen.width/2;
    this.cvs.height = screen.height/2;
    this.ctx = this.cvs.getContext('2d');
    this.ctx.drawImage(this.img,
      0,0,
      this.img.naturalWidth,this.img.naturalHeight,
      0,0,
      this.cvs.width,this.cvs.height);
    RESULT = this.ctx.getImageData(0,0,this.cvs.width,this.cvs.height);
    for(i in RESULT.data){
      var t = RESULT.data[i];
      if(i%4 == 2){
        RESULT.data[i] = 255;
      }else{
        RESULT.data[i] = 155;
      }
      
      /*
      if(t > 150){
        RESULT.data[i] = 155;
      }else {
        RESULT.data[i] = 0;
      }
      */
    }
    console.log("finished");
    this.ctx.putImageData(RESULT,0,0);
  },
  
  loadImg: function (url) {
    this.img = new Image();
    this.img.src = url;
    $('#controller').show();
    $('#analyzer').show();
    $('#contents').hide();
    $('#photo').hide();
    //document.getElementById('photo').src = url;
  },
  
  postImg: function (img) {
    
  },

  generateImg: function (array) {
   
  }

};
