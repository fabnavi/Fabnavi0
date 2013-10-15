<?php
  $project_id = $_GET["project_id"];

  $dataDirectory = getenv("DATA_DIRECTORY");
  $directory = "../".$dataDirectory."/".$project_id;

  $result = array();
  try {
    include_once("camera.php.inc");
    $resultString = takePicture();

    preg_match("/(http:.+[.]JPG)/i", $resultString, $photoMatches);
    $photoURL = $photoMatches[0];
    $result["photoURL"] = $photoURL;
    preg_match("/([^\/]+)$/i", $photoURL, $fileMatches);
    $localPath = $directory."/".$fileMatches[0];
    $result["url"] = $localPath;

    $photoContents = file_get_contents($photoURL);
    file_put_contents($localPath, $photoContents);
  } catch (Exception $e) {
    $result["error"] = $e->getMessage();
  }

  echo json_encode($result);
?>