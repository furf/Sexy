<?php

$file = $_REQUEST['file'];

$ext = substr(strrchr($file, '.'), 1);

if ($ext !== 'php') {
  $data = file_get_contents($file);
}

$delay = isset($_REQUEST['delay']) ? $_REQUEST['delay'] : 0;

if (isset($_REQUEST['random'])) {
  $delay = rand(0, $delay * 100) / 100;
}

sleep($delay);

switch ($ext) {
  case '404':
    header("HTTP/1.0 404 Not Found");
    header("Status: 404 Not Found");
    $_SERVER['REDIRECT_STATUS'] = 404;
    break;
  case 'css':
    header('Content-type:text/css');
    echo $data;
    break;
  case 'html':
    header('Content-type:text/html');
    echo $data;
    break;
  case 'js':
    header('Content-type:application/javascript');
    echo $data;
    break;
  case 'json':
    header('Content-type:application/json');
    echo $data;
    break;
  case 'php':
    header('Content-type:application/javascript');
    require_once($file);
    break;
  case 'txt':
    header('Content-type:text/plain');
    echo $data;
    break;
  case 'xml':
    header('Content-type:application/xml');
    echo $data;
    break;
}
