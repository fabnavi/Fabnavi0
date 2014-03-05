var Analyzer = {
  init : function () {
    Analyzer.cvs = document.getElementById('cvs');
    Analyzer.ctx = Analyzer.cvs.getContext('2d');
    Analyzer.cvs.style.display = "block";
    Analyzer.cvs.style.transform = "rotateZ(180deg)translateY(400px)scale(2)";
  },

  analyze : function (url) {
    Analyzer.init();
    var dfd = new $.Deferred();
    this.loadImg(url).then(function(res){
//      var res = Analyzer.gen(res,180,180,170);
      var res = Analyzer.gen(res,170,170,200);
      dfd.resolve(res);

    });
    return dfd.promise();
  },
  test : function (r,g,b) {
   Analyzer.gen( Analyzer.pCvs.getContext('2d').getImageData(0,0,Analyzer.cvs.width,this.cvs.height),r,g,b);

  },
  
  gen: function (imageData,red,green,blue) {
    console.time("apple");
    for(var i=0;i<imageData.data.length;i+=4){
      var t = imageData.data[i];
      if(imageData.data[i+2] > blue&&
          imageData.data[i+1] <green && 
          imageData.data[i] < red){
            imageData.data[i+3] = 255;
            imageData.data[i+0] = 255;
            imageData.data[i+1] = 0;
            imageData.data[i+2] = 0;
          }
      else {
        imageData.data[i+3] = 0;
        imageData.data[i+2] = 0;
        imageData.data[i+1] = 0;
        imageData.data[i] = 0;
      }
    }
    console.timeEnd('apple');
    Analyzer.ctx.putImageData(imageData,0,0);
    return Analyzer.cvs.toDataURL("image/jpeg");
  },

  loadImg: function (url) {
    var dfd = new $.Deferred();
    this.img =new Image();
    this.img.src = url;
    //    Analyzer.cvs = $('<canvas>')[0];
    this.img.onload = function(){
      var cvs = $('<canvas>')[0];
      cvs.style.position = "absolute";
      cvs.style.top = "0px";
      cvs.style.left = "0px";
      cvs.width = screen.width;
      cvs.height = screen.height;
        var ctx = cvs.getContext('2d');
      ctx.drawImage(this.img,
          0,0,
          this.img.naturalWidth,this.img.naturalHeight,
          0,0,
          cvs.width,cvs.height);
      $('#contents').show();
      $('#cvs').show();
      var res = ctx.getImageData(0,0,cvs.width,cvs.height);
      Analyzer.pCvs = cvs;
      dfd.resolve(res);
    }.bind(this);
    return dfd.promise();
  },

};
