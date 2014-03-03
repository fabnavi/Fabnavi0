var Analyzer = {
  init : function () {
    this.analyze(this.loadImg('data/lego/board/photo1.jpg'));
);
    
  },
  analyze: function (imgData) {
    console.time("apple");
    for(var i=0;i<imageData.data.length;i+=4){
      var t = imageData.data[i];
      imageData.data[i] = 0;
      imageData.data[i+1] = 0;
      if(imageData.data[i+2] > 140 && 
          imageData.data[i+1] <130 && 
          imageData.data[i] < 130){
            //if(i>500&&i<1000)console.log(imageData.data[i],imageData.data[i+1],imageData.data[i+2]);
            imageData.data[i+3] = 255;
            imageData.data[i+0] = 255;
          }
      else {
        imageData.data[i+3] = 0;
        imageData.data[i+2] = 0;
      }
    }
    console.timeEnd('apple');
    this.ctx.putImageData(imageData,0,0);
    return this.ctx.toDataURL("image/jpeg");
  },

  loadImg: function (url) {
    this.img = new Image();
    this.img.src = url;
    this.cvs = $('<canvas>')[0];
    this.cvs.style.position = "absolute";
    this.cvs.style.top = "0px";
    this.cvs.style.left = "0px";
    this.cvs.width = screen.width;
    this.cvs.height = screen.height;
    this.ctx = this.cvs.getContext('2d');
    this.ctx.drawImage(this.img,
        0,0,
        this.img.naturalWidth,this.img.naturalHeight,
        0,0,
        this.cvs.width,this.cvs.height);
    return this.ctx.getImageData(0,0,this.cvs.width,this.cvs.height);
  },

};
