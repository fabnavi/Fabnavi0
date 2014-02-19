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
    this.show();
  },
  
  show : function (){
  },
  
  append : function (data){
    var a = data.split('/');
    var row = $('<tr class="data"><td class="tableIndex"></td><td>'+a[a.length-1]+'</td><td></td></tr>'); 
    
    $('#list').append(row);
  },

  exchange : function ( index1, index2){


  },

  insert : function (data,index){

  },

  remove: function(index){

  },

  clear : function(){
    $('.data').remove(); 
  }
};
