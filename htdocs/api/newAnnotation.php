<?php 

  function dbg($data) {
    date_default_timezone_set("Asia/Tokyo");
    error_log(date("[Y/m/d H:i:s]") . rtrim(print_r($data, true)) . "\n", 3, '/var/tmp/app.log');
  } 
  $a= $_POST['data'];
  dbg("posted");
  $str = "";
  for($i=0; $i<count($a); $i++){
    $str .= "<annotation index=\"".$a[$i]['index']."\" image=\"".$a[$i]['image']."\" x=\"".$a[$i]['x']."\" y=\"".$a[$i]['y']."\" angle=\"".$a[$i]['angle']."\" w=\"".$a[$i]['w']."\" h=\"".$a[$i]['h']."\" />\n";
    //dbg($str);
  }
  if(isset($_POST['project']))dbg("no project name");
  $dir = "../data/".$a[0]['id']."/fabnavi.play.config";
   
  dbg("writable : ".is_writable($dir));
  $fp = fopen($dir,"r+");
  $dp = null; 
  $bs = "";
  $bp = 0;
  while(!feof($fp)){
    $bp = ftell($fp);
    $peek = fgets($fp);
    if(preg_match('/.*<\/annotations>/',$peek) || $dp != null){
      dbg(":::".$peek);
      if($dp == null)$dp = $bp;
      $bs .= $peek;
    }else dbg($peek);
    dbg($dp);
  }
  dbg($str.$bs);
  dbg(fseek($fp,$dp));
  fwrite($fp,$str.$bs);
  fclose($fp);
?>
