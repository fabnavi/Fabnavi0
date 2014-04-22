var Panel = {
  init : function () {
    Panel.r = document.getElementById("Rval");
    Panel.g = document.getElementById("Gval");
    Panel.b = document.getElementById("Bval");
    Panel.a = document.getElementById("Aval");
    Panel.R = document.getElementById("R");
    Panel.G = document.getElementById("G");
    Panel.B = document.getElementById("B");
    Panel.A = document.getElementById("A");
    Panel.valueListener(Panel.r,Panel.R);
    Panel.valueListener(Panel.g,Panel.G);
    Panel.valueListener(Panel.b,Panel.B);
    Panel.valueListener(Panel.a,Panel.A);
  },

  valueListener: function(obj,target){
    obj.onmousemove = function(e){
      target.innerHTML = obj.value;
    }; 
  },

  draw:function () {

  }



};
