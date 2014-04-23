function main(){
  var buttons = $('.api');
  console.log(buttons);
  for(i in buttons){
    var b = buttons[i];
    b.onclick = function(e){
      var url = e.originalTarget.attributes.href.value;
      $.get(url,{},function(res){
        console.log(res);
        document.getElementById('log').innerHTML += res + "<br>";
      });

    };
  }

}
