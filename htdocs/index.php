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
    <script type="text/javascript" src="/js/Keybind.js"></script>
    <script type="text/javascript" src="/js/PlayConfig.js"></script>
    <script type="text/javascript" src="/js/ProjectList.js"></script>
    <script type="text/javascript" src="/js/Calibrator.js"></script>
    <script type="text/javascript" src="/js/Analyzer.js"></script>
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
      <ul id="project-list"></ul>
      <div id="buttons">
        <input type="button" id="editButton" value="Edit">
        <input type="button" id="makeButton" value="Make!">
      </div>
      <li id="newProject">New Project</li>
    </div>
    <div id="contents">
      <img id="photo" width="4928" height="3715">
      <canvas id="cvs"></canvas>
      <div id="counter"></div>
      <div id="arrow">▶</div>
      <div id="panel">
        <div class="param">
              <div id="px"></div>
              <input max="3000" min="1" type="range" id="x" step="1">
              <div id="py"></div>
              <input max="3000" min="-100" type="range" id="y" step="1">
              <div id="pw"></div>
              <input max="4000" min="1" type="range" id="w" step="1">
              <div id="ph"></div>
              <input max="4000" min="1" type="range" id="h" step="1">
        </div>
          <div >
           <div id="R"></div>
           <input type="range" id="Rval" min="1" max="255" step="1">
           <div id="G"></div>
           <input type="range" id="Gval" min="1" max="255" step="1">
           <div id="B"></div>
           <input type="range" id="Bval" min="1" max="255" step="1">
           <div id="A"></div>
           <input type="range" id="Aval" min="0" max="1.0" step="0.001">
          </div>
        <div id="info">
        </div>
        <input type="button" value="save config" id="save">
        <input type="button" value="save PlayList" id="savePlaylist">
        <input type="button" value="delete slide" id="delete">
        <img id="note"  alt="">
        <ul id="processes"></ul>
      </div>
    </div>
    <?php include('footer.php.inc'); ?>
  </body>
</html>
