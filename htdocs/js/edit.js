/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
var EditController= {
  init: function () {
    this.pointX = -1;
    this.pointY = -1;
    this.newAnnotations = []; //{index: ,x: y: w: h:, angle

    $('#photo').click(function (e) {
      this.makeAnnotation(e)
    });
    this.updateAnnotationsTable();
  },

  makeAnnotation: function (e) {
    if (this.pointX == -1 && this.pointY == -1) {
      this.pointX = e.pageX;
      this.pointY = e.pageY;
    } else {
      var x = this.pointX - e.pageX;
      var y = this.pointY - e.pageY;
      var angle = Math.atan(y / x) * 180 / Math.PI - 90;

      if (x > 0) angle -= 180;

      this.setAnnotation(this.pointX, this.pointY, angle);
      var a = {
        index: this.current_index + 1,
        image: "annotations/arrow.svg",
        x: this.pointX,
        y: this.pointY,
        angle: angle,
        w: 500,
        h: 500,
        id: this.id
      };
      this.newAnnotations.push(a);
      this.pointX = -1;
      this.pointY = -1;
    }
  },

  setAnnotation: function (x, y, angle) {
    var a = $('<img>', {
      class: 'annotations'
    });
    a.attr('src', 'annotations/arrow.svg');
    a.css({
      "left": -250 + x + "px", //padding of coordinate image pointed 
      "top": -50 + y + "px", //TODO : get from configXML in htdocs/annotations
      "transform-origin": "250px 50px", //pointed coordinate
      "transform": "rotate(" + angle + "deg)"
    });
    a.click(function (e) {
      this.makeAnnotation(e)
    });
    a.appendTo($('#controller'));
  },

  updateAnnotationsTable: function(){
    var table = $('#annotationsTable')[0];
    for(var i=0; i<this.newAnnotations.length;i++){
      var a = this.newAnnotations[i];
      var row = $("<tr/>");
      row.innerHTML = "<td>"+a['index']+"</td><td>"+
        a['image']+"</td><td>"+
        a['x']+"</td><td>"+
        a['y']+"</td><td>"+
        a['angle']+"</td>";
      row[0].appendTo(table);
    }

  },

  setPhoto: function (index) {
    $("#photo").attr("src", this.current_project[index]);
    $("#counter").text((index + 1) + "/" + this.current_project.length);
  }
}

$(document).ready(function () {
  EditController.init();
});
