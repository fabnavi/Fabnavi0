var ListController　= {

  init : function () {
    this.elem = $('<div>');
    this.elem.html(
        '<table border="5" width="300">\
        <tbody id="list">\
        <tr>\
        <td>#</td>\
        <td>file name</td>\
        <td>col3</td>\
        </tr>\
        </tbody>\
        </table>');
    $("#controller").append(this.elem);
    this.selected = [];
    this.show();
  },

  show : function (){
  },

  append : function (data){
    var a = data.split('/');
    var str = a[a.length-1];
    var row = $('<tr draggable="true" class="data" id="'+str.split('.')[0]+'"><td draggable="true" class="tableIndex"></td><td draggable="true">'+str+'</td><td></td></tr>'); 

    
    row.on('mousemove',function(e){
      if(e.buttons > 0){
        var el = this.idToElem(this.selectedLast());
        var h = e.clientY - el[0].offsetTop-10;
        console.log(h);
        el.css("transform","translate(-20px,"+h+"px)");
      } 
    }.bind(this));

    row.on('mouseup',function(e){
     if(this.selectedLast() == e.currentTarget.id){ // clicked
      this.select(e.currentTarget.id);
      this.rowClicked(e);
      this.selected = [e.currentTarget.id];
     } else { //dragged
      this.insert(e.currentTarget.id,this.selectedLast());
      e.currentTarget.style.transform = "";
      document.getElementById(this.selectedLast()).style.transform = "";
     }
    }.bind(this));

    row.on('mouseenter',function(e){
      this.idToElem(e.currentTarget.id).css("transform","translateX(20px)");
    }.bind(this));

    row.on('mouseleave',function(e){
      this.idToElem(e.currentTarget.id).css("transform","translateX(0px)");
    }.bind(this));

    row.on('mousedown',function(e){
      this.selected.push(e.currentTarget.id);
      this.idToElem(e.currentTarget.id).css("transform","translateX(-20px)");
    }.bind(this));

    $('#list').append(row);
  },

  exchange : function (id1, id2){

  },

  insert : function (id1,id2){
    this.idToElem(id1).after(this.idToElem(id2));
     
  },
  selectedLast : function(){
    return this.selected[this.selected.length-1];
  },

  remove: function(id){
    this.idToElem(id).remove();
  },

  selectByIndex: function(index){

  },

  idToElem: function(id){
    return $('#'+id);
  },

  selectByName: function(data){
    var a = data.split('/');
    var str = a[a.length-1];
    var name = str.split('.')[0];
    this.select(name);
  },

  rowClicked: function(){
    console.log("this method is not implemented");
  },

  select: function(id){
    var target = this.idToElem(id);
    $('.data').css('background-color','transparent');
    target.css('background-color','rgba(200,0,0,0.7)');
  },

  clear : function(){
    $('.data').remove(); 
  }
};
