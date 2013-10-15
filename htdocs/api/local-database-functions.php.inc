<?php
function openConnection() { 
  $url = parse_url(getenv("DATABASE_URL"));
  $server = $url["host"];
  $username = $url["user"];
  $password = $url["pass"];
  $db = substr($url["path"],1);
  $dsn = "mysql:dbname=".$db.";host=".$server;
  $connection = new PDO($dsn, $username, $password);
  return $connection;
}

function closeConnection($connection) { 
}

?>