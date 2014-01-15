<?php
  date_default_timezone_set("Asia/Tokyo");

  include_once("camera.php.inc");
  openCamera();

  $result = array();
  try {
    $id = time();
    $dataDirectory = getenv("DATA_DIRECTORY");
    $directory = "../".$dataDirectory."/".$id;
    if (mkdir($directory)) {
      touch("../".$dataDirectory."/".$id."/fabnavi.play.config");
    } else {
      throw new Exception("Could not make a directory[".$directory."]");
    }
    $directory = "../".$dataDirectory."/".$id."/original";
    if (mkdir($directory)) {
      $result["id"] = $id;
    } else {
      throw new Exception("Could not make a directory[".$directory."]");
    }
  } catch (Exception $e) {
    $result["error"] = $e->getMessage();
  }
  echo json_encode($result);
?>
