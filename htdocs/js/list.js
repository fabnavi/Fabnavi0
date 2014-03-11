var ListController　= {

  init : function () {
    this.elem = $(
        '<tbody id="list">\
        <tr>\
        <td>#</td>\
        <td>file name</td>\
        <td>col3</td>\
        </tr>\
        </tbody>');
    $("#panel").append(this.elem);
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
      this.select(e.currentTarget.id);
    }.bind(this));

    $('#list').append(row);
  },

  insert : function (id1,id2){
    var a = this.idToElem(id1);
    var b = this.idToElem(id2);
    PlayConfig.insertIndex(b.index()-1,a.index()-1);
    a.after(b);
  },

  selectedLast : function(){
    return this.selected[this.selected.length-1];
  },

  remove: function(id){
    var elem = this.idToElem(id);
    elem.remove();
    PlayConfig.removeIndex(elem.index()-1);
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
    console.log(id);
  },

  clear : function(){
    $('.data').remove(); 
  }
};
