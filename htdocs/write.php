<!DOCTYPE html>
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this file,
   - You can obtain one at http://mozilla.org/MPL/2.0/.  -->
<html>
  <head>
    <meta charset="utf-8">
    <title data-l10n-id="title">RecordController : FabNavi</title>
    <link rel="stylesheet" href="/css/common.css" type="text/css">
    <link rel="stylesheet" href="/css/play.css" type="text/css">
    <script type="text/javascript" src="/js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/js/common.js"></script>
    <script type="text/javascript" src="/js/ProjectList.js"></script>
    <script type="text/javascript" src="/js/Analyzer.js"></script>
    <script type="text/javascript" src="/js/Calibrator.js"></script>
    <script type="text/javascript" src="/js/PlayConfig.js"></script>
    <script type="text/javascript" src="/js/Player.js"></script>
    <script type="text/javascript" src="/js/Note.js"></script>
    <meta name="viewport" content="width=device-width, user-scalable=no">
  </head>
  <body>
    <?php include('header.php.inc'); ?>
    <div id="projectList"></div>
    <div id="contents">
      <button id="take">take a picture</button>
      <img id="photo" alt="">
      <canvas id="cvs"></canvas>
      <img id="note"  alt="">
      <ul id="processes"></ul>
    </div>
    <?php include('footer.php.inc'); ?>
  </body>
</html>
