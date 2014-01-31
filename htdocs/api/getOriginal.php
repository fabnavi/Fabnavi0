<?php
  $project_id = $_GET["project_id"];
  $result = array();
  try {
    $dataDirectoryRelational = getenv("DATA_DIRECTORY");
    $dataDirectory = "../".$dataDirectoryRelational;
    $dataDirectoryRef = opendir($dataDirectory);
    $projectDirectory = $dataDirectory.$project_id;
    $projectDirectory .= "/original/";
    $projectDirectoryRef = opendir($projectDirectory);
    while($imageFile = readdir($projectDirectoryRef)) {
//      if (strpos($imageFile, ".") === 0) {
//        continue;
//      }
      if (!preg_match("/[.](jpe?g)|(png)$/i", $imageFile)) {
        continue;
      }
      if (is_dir($projectDirectory."/".$imageFile) == true) {
        continue;
      }
      $photoURL = $dataDirectoryRelational.$project_id."/".$imageFile;
      array_push($result, $photoURL);
    }
    closedir($projectDirectoryRef);

  } catch (Exception $e) {
    $result["error"] = $e->getMessage();
  }
  echo json_encode($result);
?>
