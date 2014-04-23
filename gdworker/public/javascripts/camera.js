var URLCHECKER = /\http.*%21%21%21%21%21/;
function main(){
  var buttons = $('.api');
  console.log(buttons);
  for(i in buttons){
    var b = buttons[i];
    b.onclick = function(e){
      var url = e.originalTarget.attributes.href.value;
      $.get(url,{},function(res){
        document.getElementById('log').innerHTML += res + "<br>";
        parseResult(res);
      });

    };
  }
}

function parseResult(res) {
  var url = URLCHECKER.exec(res);
  if(url){
    var img = document.createElement("img");
    img.src = url[0];
    console.log(img);
    document.getElementById('log').appendChild(img);
  }
}
