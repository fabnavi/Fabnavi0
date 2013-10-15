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
    $originalFilePath = $directory."/original/".$fileMatches[0];

    $photoContents = file_get_contents($photoURL);
    file_put_contents($originalFilePath, $photoContents);

    //rotate and crop
    $degree = floatval(getenv("PHOTO_ROTATE"));
    $width = intval(getenv("PHOTO_CROP_W"));
    $height = intval(getenv("PHOTO_CROP_H"));
    $x = intval(getenv("PHOTO_CROP_X"));
    $y = intval(getenv("PHOTO_CROP_Y"));
    $source = imagecreatefromjpeg($originalFilePath);
    $rotated = imagerotate($source, $degree, 0);
    $image = imagecreatetruecolor($width, $height);
    imagecopyresized($image, $rotated, 0, 0, $x, $y, $width, $height, $width, $height);
    imagejpeg($image, $localPath);

    imagedestroy($source);
    imagedestroy($rotated);
    imagedestroy($image);
  } catch (Exception $e) {
    $result["error"] = $e->getMessage();
  }

  echo json_encode($result);
?>