<?php

function openCamera() {
  return execute("startRecMode", array(), 1);
}

function takePicture() {
  return execute("actTakePicture", array(), 2);
}

function dbg($data){
  date_default_timezone_set("Asia/Tokeyo");
  error_log(date("[Y/m/d H:i:s]").rtrim(print_r($data, true))."\n",3,'/var/tmp/app.log');

 return $data; 
}

function execute($method, $params, $id) {
  if(getenv("CAMERA") == 'NEX5R'){
    $host = "192.168.122.1";
    $port = 8080;
  } else if(getenv("CAMERA") == 'QX10'){
    $host = "10.0.0.1";
    $port = 10000;
  }
  $command = array();
  $command["method"] = $method;
  $command["params"] = $params;
  $command["id"] = $id;
  $command["version"] = "1.0";
  $commandJSON = json_encode($command);
  $contentLength = strlen($commandJSON);

  $fp = fsockopen($host, $port, $errno, $errstr, 30);
  if (!$fp) {
    throw new Exception("Could not access to the camera");
  } 
  socket_set_timeout($fp, 2);
  fputs($fp, "POST /sony/camera HTTP/1.1\r\nContent-Length: ".$contentLength."\r\n\r\n".$commandJSON);
  dbg("url");
  dbg( "POST /sony/camera HTTP/1.1\r\nContent-Length: ".$contentLength."\r\n\r\n".$commandJSON);
  $resultString = "";
  while (!feof($fp)) {
    $resultString .= fgets($fp, 128);
  }
  $stat = socket_get_status($fp);
  fclose ($fp);
  if ($stat["timed_out"]) { 
    throw new Exception("timeout");
  }

  return $resultString;
}
?>
