
<?php 

function dbg($data) {
  date_default_timezone_set("Asia/Tokyo");
  error_log(date("[Y/m/d H:i:s]") . rtrim(print_r($data, true)) . "\n", 3, '/var/tmp/app.log');
} 

if(isset($_POST['project']))dbg("no project name");
$dir = "../data/".$_POST['project']."/fabnavi.play.config";
$histdir = "../data/".$_POST['project']."/".date("Y-m-d-H-i-s").".config";

if(file_exists($dir)){
   rename($dir,$histdir);
  touch($dir);
  file_put_contents($dir,$_POST['data']);
} else {
  dbg("the file ".$dir." does'nt exist");
}
?>
