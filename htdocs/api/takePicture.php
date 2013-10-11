<?php
  $project_id = $_GET["project_id"];

//  include('local-database-functions.php.inc');
  $host = "192.168.122.1";
  $port = 8080;

  //take a picture command
  $command = array();
  $command["method"] = "actTakePicture";
  $command["params"] = array();
  $command["id"] = 10;
  $command["version"] = "1.0";
  $commandJSON = json_encode($command);
  $contentLength = strlen($commandJSON);

  $fp = fsockopen($host, $port, $errno, $errstr, 30);
  if (!$fp) {
    echo "接続できません<br>\n";
  } else {
    // 読み書きのタイムアウト設定
    socket_set_timeout($fp, 2);
    fputs ($fp, "POST /sony/camera HTTP/1.1\r\nContent-Length: ".$contentLength."\r\n\r\n".$commandJSON);
    while (!feof($fp)) {
      echo fgets ($fp,128);
    }
    // ソケットがタイムアウトしたかどうか調べる
    $stat = socket_get_status($fp);
    if ($stat["timed_out"]) { echo "timeout"; }
    // ソケットを閉じる
    fclose ($fp);
  }

  /*
  $result = array();
  try {
    $result["itemlist"] = getItemList($owner, $tag);
  } catch (Exception $e) {
    $result["error"] = $e->getMessage();
  }
  */
//  echo json_encode($result);
?>