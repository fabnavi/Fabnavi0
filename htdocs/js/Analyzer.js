var Analyzer = {
  init : function () {

  },
  analyze : function (url) {
    var dfd = new $.Deferred();
    this.loadImg(url).then(function(res){
      console.log("start analyze");
      var res = Analyzer.gen(res);
      dfd.resolve(res);

    });
    return dfd.promise();
  },
  gen: function (imageData) {
    console.time("apple");
    console.log("analyzing...");
    var maxblue = 0;
    for(var i=0;i<imageData.data.length;i+=4){
      var t = imageData.data[i];
      if(imageData.data[i+2] > maxblue)maxblue = imageData.data[i+2];
      imageData.data[i] = 0;
      imageData.data[i+1] = 0;
      if(imageData.data[i+2] > 140 && 
          imageData.data[i+1] <130 && 
          imageData.data[i] < 130){
            imageData.data[i+3] = 255;
            imageData.data[i+0] = 255;
          }
      else {
        imageData.data[i+3] = 0;
        imageData.data[i+2] = 0;
      }
    }
    console.timeEnd('apple');
    console.log("blue val = "+maxblue);
    this.ctx.putImageData(imageData,0,0);
    return this.cvs.toDataURL("image/jpeg");
  },

  loadImg: function (url) {
    var dfd = new $.Deferred();
    this.img =new Image();
    this.img.src = url;
    //    this.cvs = $('<canvas>')[0];
    this.img.onload = function(){
      console.log("loaded");
      this.cvs = document.getElementById('cvs');
      this.cvs.style.position = "absolute";
      this.cvs.style.top = "0px";
      this.cvs.style.left = "0px";
      this.cvs.width = screen.width;
      this.cvs.height = screen.height;
      this.ctx = this.cvs.getContext('2d');
      console.log(this.img);
      this.ctx.drawImage(this.img,
          0,0,
          this.img.naturalWidth,this.img.naturalHeight,
          0,0,
          this.cvs.width,this.cvs.height);
      $('#contents').show();
      $('#cvs').show();
      var res = this.ctx.getImageData(0,0,this.cvs.width,this.cvs.height);
      dfd.resolve(res);
    }.bind(this);
    return dfd.promise();
  },

};
