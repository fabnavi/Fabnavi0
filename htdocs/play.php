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
    <script type="text/javascript" src="/js/PlayConfig.js"></script>
    <script type="text/javascript" src="/js/ProjectList.js"></script>
    <script type="text/javascript" src="/js/Calibrator.js"></script>
    <script type="text/javascript" src="/js/Player.js"></script>
    <script type="text/javascript" src="/js/list.js"></script>

    <meta name="viewport" content="width=device-width, user-scalable=no">
  </head>
  <body onload="PlayController.init()">
    <?php include('header.php.inc'); ?>
    <div id="contents">
      <ul id="project-list"></ul>
    </div>
    <div id="controller">
      <img id="photo" width="4928" height="3715">
      <canvas id="cvs"></canvas>
      <div id="counter"></div>
      <div id="arrow">▶</div>
      <div id="panel">
        <input type="button" value="save annotations">
      <div class="param">
              <div id="px"></div>
              <input max="3000" min="1" type="range" id="x">
              <div id="py"></div>
              <input max="3000" min="1" type="range" id="y">
              <div id="pw"></div>
              <input max="4000" min="1" type="range" id="w">
              <div id="ph"></div>
              <input max="4000" min="1" type="range" id="h">
      </div>
      <div id="info">
      </div>
      <input type="button" value="save config" id="save">
      </div>
    </div>
    <?php include('footer.php.inc'); ?>
  </body>
</html>
