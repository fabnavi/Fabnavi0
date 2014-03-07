<?php
  $project_id = $_GET["project_id"];
  error_reporting(E_ERROR);
  $dataDirectory = getenv("DATA_DIRECTORY");
  $directory = "../".$dataDirectory.$project_id;

  $result = array();
  try {
    include_once("camera.php.inc");
    $resultString = takePicture();
    preg_match('/http:(.*)%21/', $resultString, $photoMatches);
    $photoURL = $photoMatches[0];
//    $photoURL = substr($photoURL,strlen($photoURL)-2);
    $result["photoURL"] = $photoURL;
    preg_match("/pict(.*).JPG/i", $photoURL, $fileMatches);
    $localPath = $directory."/".$fileMatches[0].".jpg";
    $result["url"] = $localPath;
    $originalFilePath = $directory."/original/".$fileMatches[0].".jpg";
    $photoContents = file_get_contents($photoURL);
    file_put_contents("$originalFilePath", $photoContents);
    file_put_contents("$localPath", $photoContents);
  } catch (Exception $e) {
    $result["error"] = $e->getMessage();

  }

  echo json_encode($result);
?>
