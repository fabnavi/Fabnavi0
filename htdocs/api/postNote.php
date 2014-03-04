<?php
file_put_contents("../data/test/".$_POST['name'],base64_decode($_POST['note']));

echo "success";

?>
