<!DOCTYPE html>
<!-- This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this file,
   - You can obtain one at http://mozilla.org/MPL/2.0/.  -->
<html>
  <head>
    <meta charset="utf-8">
    <title data-l10n-id="title">Annotations Editor: FabNavi</title>
    <link rel="stylesheet" href="/css/common.css" type="text/css">
    <link rel="stylesheet" href="/css/play.css" type="text/css">
    <script type="text/javascript" src="/js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/js/common.js"></script>
    <script type="text/javascript" src="/js/Editor.js"></script>
    <script type="text/javascript" src="/js/PlayConfig.js"></script>
    <script type="text/javascript" src="/js/Player.js"></script>
    <meta name="viewport" content="width=device-width, user-scalable=no">
  </head>
  <body>
    <?php include('header.php.inc'); ?>
    <div id="contents">
      <ul id="project-list"></ul>
    </div>
    <div id="controller">
      <img id="photo">
      <canvas id="cvs"></canvas>
      <div id="counter"></div>
      <div id="arrow">▶</div>
      <div class="listView" style="border:4px solid red;float:left; position:absolute;top:500px;left:100px;">
        <table>
                <tbody id="annotationsTable">
                </tbody>
        </table>
      </div>
      <div id="panel">
        <input type="button" value="save annotations">
      </div>
    </div>
    <?php include('footer.php.inc'); ?>
  </body>
</html>
