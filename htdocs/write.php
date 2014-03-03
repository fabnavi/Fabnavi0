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
    <script type="text/javascript" src="/js/configController.js"></script>
    <script type="text/javascript" src="/js/list.js"></script>
    <script type="text/javascript" src="/js/analyzer.js"></script>
    <script type="text/javascript" src="/js/play.js"></script>
    <meta name="viewport" content="width=device-width, user-scalable=no">
  </head>
  <body 
    <?php include('header.php.inc'); ?>
    <div id="contents">
      <ul id="project-list"></ul>
    </div>
    <div id="controller">
      <img id="photo" >
      <canvas id="cvs"></canvas>
      <canvas id="analyzer"></canvas>
      <div id="counter"></div>
      <div id="arrow">▶</div>
      <div id="panel">
        <input type="button" value="save annotations">
      </div>
    </div>
    <?php include('footer.php.inc'); ?>
  </body>
</html>
