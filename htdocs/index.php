<!DOCTYPE html>
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this file,
   - You can obtain one at http://mozilla.org/MPL/2.0/.  -->
<html>
  <head>
    <meta charset="utf-8">
    <title data-l10n-id="title">PlayController : FabNavi</title>
    <link rel="stylesheet" href="/css/common.css" type="text/css">
    <link rel="stylesheet" href="/css/play.css" type="text/css">
    <script>
      var ID = "<?php if(isset($_GET['id']))echo $_GET['id'] ?>"; 
    </script>
    <script type="text/javascript" src="/js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/js/common.js"></script>
    <script type="text/javascript" src="/js/Analyzer.js"></script>
    <script type="text/javascript" src="/js/Keybind.js"></script>
    <script type="text/javascript" src="/js/PlayConfig.js"></script>
    <script type="text/javascript" src="/js/ProjectList.js"></script>
    <script type="text/javascript" src="/js/Calibrator.js"></script>
    <script type="text/javascript" src="/js/Panel.js"></script>
    <script type="text/javascript" src="/js/Note.js"></script>
    <script type="text/javascript" src="/js/record.js"></script>
    <script type="text/javascript" src="/js/Player.js"></script>
    <script type="text/javascript" src="/js/list.js"></script>

    <meta name="viewport" content="width=device-width, user-scalable=no">
  </head>
  <body onload="PlayController.init()">
    <?php include('header.php.inc'); ?>
    <div id="projectList">
      <div id="buttons">
        <input type="button" id="editButton" value="Edit">
        <input type="button" id="makeButton" value="Make!">
      </div>
      <ul id="project-list"></ul>
      <li id="newProject">New Project</li>
    </div>
    <div id="contents">
      <img id="photo" width="4928" height="3715">
      <canvas id="cvs"></canvas>
      <div id="counter"></div>
      <div id="arrow">▶</div>
      <div class="help">
        x,y,w,h : スライダーを選択します<br>
        ← , → : 選択されているスライダーの値を調整します。<br>スライダーが選択されていなければ、ページを移動します。 <br>
      q : プロジェクト選択画面に戻ります <br>
      v : 設定画面を表示/非表示 <br> 
       
      </div>
      <div id="panel">
        <div id="param">
          <div class="x-slider">
            <div class="param-name">X:</div>
            <div id="px" class="indicator"></div>
            <input max="3000" min="1" type="range" id="x" step="1">
          </div>
          <div class="y-slider">
            <div class="param-name">Y:</div>
            <div id="py" class="indicator"></div>
            <input max="3000" min="1" type="range" id="y" step="1">
          </div>
          <div class="x-slider">
            <div class="param-name">W:</div>
            <div id="pw" class="indicator"></div>
            <input max="4000" min="1" type="range" id="w" step="1">
          </div>
          <div class="y-slider">
            <div class="param-name">H:</div>
            <div id="ph" class="indicator"></div>
            <input max="4000" min="1" type="range" id="h" step="1">
          </div>
        </div>
<!--        <div id="rgba-panel">
          <div>
           <div id="R" class="indicator"></div>
           <input type="range" id="Rval" min="1" max="255" step="1">
          </div>
          <div>
           <div id="G" class="indicator"></div>
           <input type="range" id="Gval" min="1" max="255" step="1">
          </div>
          <div>
           <div id="B" class="indicator"></div>
           <input type="range" id="Bval" min="1" max="255" step="1">
          </div>
          <div>
           <div id="A" class="indicator"></div>
           <input type="range" id="Aval" min="0" max="1.0" step="0.001">
          </div>
        </div>
-->
        <div id="info">
          <input type="button" value="save config" id="save">
          <input type="button" value="save PlayList" id="savePlaylist">
          <input type="button" value="delete slide" id="delete">
        </div>
        <img id="note"  alt="">
        <ul id="processes"></ul>
      </div>
    </div>
    <?php include('footer.php.inc'); ?>
  </body>
</html>
