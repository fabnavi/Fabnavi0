var ListController　= {

  init : function () {
    this.elem = $('<div>');
    this.elem.html(
      '<table border="5">\
       <tbody id="list">\
        <tr>\
         <td>#</td>\
         <td>file name</td>\
         <td>col3</td>\
        </tr>\
       </tbody>\
      </table>');
    $("body").append(this.elem);
    this.elem.hide();
    this.show();
  },
  
  show : function (){
    this.elem.show();
  },
  
  append : function (data){
    var row = $('<tr><td class="tableIndex"></td><td>'+data+'</td><td></td></tr>'); 
    $('#list').append(row);
  },

  insert : function (data,index){

  },

  removeCell : function(index){

  }
};
