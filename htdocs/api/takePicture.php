<?php
  
  $CAMERA = getenv('CAMERA');
  $project_id = $_GET["project_id"];
  error_reporting(E_ERROR);
  $dataDirectory = getenv("DATA_DIRECTORY");
  $directory = "../".$dataDirectory."/".$project_id;

  $result = array();
  try {
    include_once("camera.php.inc");
    $resultString = takePicture();
    dbg('take picture result string');
    dbg($resultString);
    if($CAMERA == 'QX10'){
      preg_match('/http:(.*)%21/', $resultString, $photoMatches);
    } else if ('NEX5R'){
      preg_match("/(http:.+[.]JPG)/i", $resultString, $photoMatches);
    }
    $photoURL = $photoMatches[0];
    $result["photoURL"] = dbg($photoURL);
    if($CAMERA == 'QX10'){
      preg_match("/pict(.*).JPG/i", $photoURL, $fileMatches);
    }else if ($CAMERA == 'NEX5R'){
      preg_match("/([^\/]+)$/i", $photoURL, $fileMatches);
    }
    $localPath = $directory."/".$fileMatches[0].".jpg";
    $result["url"] = $localPath;
    $originalFilePath = $directory."/original/".$fileMatches[0].".jpg";

    $photoContents = file_get_contents($photoURL);
    dbg('file put seccess?');
    dbg(file_put_contents($originalFilePath, $photoContents));
    //file_put_contents($localPath,$photoContents);
    //rotate and crop
    $degree = floatval(getenv("PHOTO_ROTATE"));
    $width = intval(getenv("PHOTO_CROP_W"));
    $height = intval(getenv("PHOTO_CROP_H"));
    $x = intval(getenv("PHOTO_CROP_X"));
    $y = intval(getenv("PHOTO_CROP_Y"));
    $source = imagecreatefromjpeg($originalFilePath);
    //$rotated = imagerotate($source, $degree, 1);
    //$image = imagerotate($source, $degree, 1);
    //$image = imagecreatetruecolor($width, $height);
    //imagecopyresized($image, $rotated, 0, 0, $x, $y, $width, $height, $width, $height);
    //imagecopyresized($image,$rotated, 0, 0, 539, 558, $width, $height, 670, 435);
    imagejpeg($source, $localPath);

    imagedestroy($source);
//    imagedestroy($rotated);
//    imagedestroy($image);
  } catch (Exception $e) {
    //$result["error"] = $e->getMessage();

  }

  echo json_encode($result);
?>
