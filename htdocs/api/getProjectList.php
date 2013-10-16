<?php
  $result = array();
  try {
    $dataDirectoryRelational = getenv("DATA_DIRECTORY");
    $dataDirectory = "../".$dataDirectoryRelational;
    $dataDirectoryRef = opendir($dataDirectory);
    while($projectDirectory = readdir($dataDirectoryRef)) {
      if (strpos($projectDirectory, ".") === 0) {
        continue;
      }
      $projectID = $projectDirectory;
      $projectDirectory = $dataDirectory.$projectDirectory;
      if (is_dir($projectDirectory) == false) {
        continue;
      }

      $projectDirectoryRef = opendir($projectDirectory);
      $lastImageFile = null;
      while($imageFile = readdir($projectDirectoryRef)) {
        if (strpos($imageFile, ".") === 0) {
          continue;
        }
        if (is_dir($projectDirectory."/".$imageFile) == true) {
          continue;
        }
        $lastImageFile = $imageFile;
      }
      closedir($projectDirectoryRef);
      if ($lastImageFile) {
        $project = array();
        $project["id"] = $projectID;
        $project["thumbnail"] = $dataDirectoryRelational.$projectID."/".$lastImageFile;
        array_push($result, $project);
      }
    }
    closedir($dataDirectoryRef);


  } catch (Exception $e) {
    $result["error"] = $e->getMessage();
  }
  echo json_encode($result);
?>