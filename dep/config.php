<?php

session_start();
require_once('Facebook/autoload.php');

$FBObject = new \Facebook\Facebook([
    'app_id' => '651661811958720',
    'app_secret' => '13cd688f69cff0b743721105027841d5',
    'default_graph_version' => 'v2.10'

]);

$handler = $FBObject -> getRedirectLoginHelper();
?>