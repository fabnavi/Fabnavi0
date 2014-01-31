<?php
  $project_id = $_GET["project_id"];
  error_reporting(E_ERROR);
  $dataDirectory = getenv("DATA_DIRECTORY");
  $directory = "../".$dataDirectory."/".$project_id;

  $result = array();
  try {
    include_once("camera.php.inc");
    $resultString = takePicture();
    dbg($resultString);
    preg_match('/http:(.*)%21/', $resultString, $photoMatches);
    $photoURL = $photoMatches[0];
//    $photoURL = substr($photoURL,strlen($photoURL)-2);
    $result["photoURL"] = dbg($photoURL);
    preg_match("/pict(.*).JPG/i", $photoURL, $fileMatches);
    $localPath = $directory."/".$fileMatches[0].".jpg";
    $result["url"] = $localPath;
    $originalFilePath = $directory."/original/".$fileMatches[0].".jpg";

    $photoContents = file_get_contents($photoURL);
    file_put_contents($originalFilePath, $photoContents);
    //file_put_contents($localPath,$photoContents);
    dbg('original: '.$originalFilePath);
    dbg('local: '.($localPath));
    dbg('photo: '.$photoURL);
    //rotate and crop
    $degree = floatval(getenv("PHOTO_ROTATE"));
    $width = intval(getenv("PHOTO_CROP_W"));
    $height = intval(getenv("PHOTO_CROP_H"));
    $x = intval(getenv("PHOTO_CROP_X"));
    $y = intval(getenv("PHOTO_CROP_Y"));
    $source = imagecreatefromjpeg($originalFilePath);
    $rotated = imagerotate($source, $degree, 1);
    $image = imagecreatetruecolor($width, $height);
    imagecopyresized($image, $rotated, 0, 0, $x, $y, $width, $height, $width, $height);
    //imagecopyresized($image,$rotated, 0, 0, 539, 558, $width, $height, 670, 435);
    imagejpeg($image, $localPath);

    imagedestroy($source);
    imagedestroy($rotated);
    imagedestroy($image);
  } catch (Exception $e) {
    //$result["error"] = $e->getMessage();

  }

  echo json_encode($result);
?>
