<?php
    //Adpated from the postAcceptor.php file example from the documentation https://www.tiny.cloud/docs/tinymce/6/php-upload-handler/
	$accepted_origins = array('http://localhost:3000');

	$imageFolder = dirname(__FILE__).'/' . 'images/';

    //handle same-origin requests, which won't set or be valid unliess configured to allow origins
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        if (in_array($_SERVER['HTTP_ORIGIN'], $accepted_origins)) {
            header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
     } else {
        header("HTTP/1.1 403 Origin Denied");
      return;
     }
    }
    //Prevent uploads on an OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        header("Access-Control-Allow-Methods: POST, OPTIONS");
    return;
    }
    //sanitize and verify images before they arrive on the server
    reset ($_FILES);
        $temp = current($_FILES);
    if (is_uploaded_file($temp['tmp_name'])){
        if (preg_match("/([^\w\s\d\-_~,;:\[\]\(\).])|([\.]{2,})/", $temp['name'])) {
            header("HTTP/1.1 400 Invalid file name.");
        return;
        }

    if (!in_array(strtolower(pathinfo($temp['name'], PATHINFO_EXTENSION)), array("gif", "jpg", "png"))) {
            header("HTTP/1.1 400 Invalid extension.");
        return;
      }
    //Configure the script to accept an image upload if there is an accepted origin, or if there was no origin
        $filetowrite = $imageFolder . $temp['name'];
        move_uploaded_file($temp['tmp_name'], $filetowrite);

        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? "https://" : "http://";
        $localAddress = 'localhost:3000/images/';
        $baseurl = $protocol . $localAddress; //$_SERVER["HTTP_HOST"] . rtrim(dirname($_SERVER['REQUEST_URI']), "/") . "/";

    //Send the required JSON object that has 'location' as a property back to TinyMCE
	echo json_encode(array('location' => $baseurl . $temp['name'])); //was $filetowrite
        } else {
    header("HTTP/1.1 500 Server Error");
  }
?>