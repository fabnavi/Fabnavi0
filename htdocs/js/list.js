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
    var str = a[a.length-1];
    var row = $('<tr class="data" id="'+str.split('.')[0]+'"><td class="tableIndex"></td><td>'+str+'</td><td></td></tr>'); 
    
    $('#list').append(row);
  },

  exchange : function ( index1, index2){


  },

  insert : function (data,index){

  },

  remove: function(index){

  },

  selectByIndex: function(index){
    
  },

  selectByName: function(data){
    $('.data').css('background-color','transparent');
    var a = data.split('/');
    var str = a[a.length-1];
    var name = str.split('.')[0];
    $('#'+name).css('background-color','rgba(200,0,0,0.7)');
  },

  clear : function(){
    $('.data').remove(); 
  }
};
