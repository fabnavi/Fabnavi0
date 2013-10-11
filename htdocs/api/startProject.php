<?php
  date_default_timezone_set("Asia/Tokyo");

  include('local-database-functions.php.inc');
  $connection = openConnection();

  $result = array();
  try {
    $datetime =  date("Y-m-d H:i:s", time());
    $query4insert = "INSERT INTO projects(created,updated) VALUES (?,?)";
    $statement4insert = $connection->prepare($query4insert);
    $statement4insert->execute(array($datetime, $datetime));

    $query4select = "SELECT id FROM projects WHERE created=?";
    $statement4select = $connection->prepare($query4select);
    $statement4select->execute(array($datetime));
    if ($row = $statement4select->fetch(PDO::FETCH_ASSOC)) {
      $result["id"] = $row["id"];
    } else {
      $result["error"] = "NO DATA FOUND";
    }
    $statement4select->closeCursor();
  } catch (Exception $e) {
    $result["error"] = $e->getMessage();
  }

  closeConnection($connection);

  echo json_encode($result);
?>