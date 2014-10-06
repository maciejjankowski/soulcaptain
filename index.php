<?php
require 'lib/rb.php';

use Slim\Slim;
require 'lib/Slim/Slim.php';
\Slim\Slim::registerAutoloader();

// ini_set("error_log", "appLog.txt");
ini_set("log_errors", "1");
ini_set("html_errors", 0);
ini_set("display_errors","1");
error_reporting(E_ALL | E_STRICT);

date_default_timezone_set("Europe/Warsaw");
setlocale(LC_ALL, "pl_PL");

$ustawienia = parse_ini_file( 'conf/ustawienia.txt' );

$app = new Slim(array('debug'=>false));

$app->error(function (\Exception $e) use ($app) {
    echo($e);
});

// $app->contentType('application/json;charset=utf-8');

// var_dump(array($ustawienia['dbname'], $ustawienia['dbuser'], $ustawienia['dbpass']));

R::setup($ustawienia['dbname'], $ustawienia['dbuser'],$ustawienia['dbpass']);
// =========================================================================================================
function guid(){
    if (function_exists('com_create_guid')){
        return com_create_guid();
    }else{
        mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        $charid = strtolower(md5(uniqid(rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid = //chr(123) .// "{"
                substr($charid, 0, 8)
                .$hyphen
                .substr($charid, 8, 4).$hyphen
                .substr($charid,12, 4).$hyphen
                .substr($charid,16, 4).$hyphen
                .substr($charid,20,12);
                // .chr(125);// "}"
        return $uuid;
    }
}


$app->get('/new', function () use ($app){
  $response = $app->response();
  // $response->header('Access-Control-Allow-Origin', '*');
  $response->write( "super jest" );  // json_encode( $a->export(), JSON_PRETTY_PRINT )
});

$app->get('/new/:id', function ($id) use ($app){
  $response = $app->response();
  // $response->header('Access-Control-Allow-Origin', '*');
  $response->write( "super jest: " . $id );  // json_encode( $a->export(), JSON_PRETTY_PRINT )
});

$app->get('/', function () use ($app){
  $guid = guid();
  // $response = $app->response();
  // $response->write( '<a href="index.php/new/'. $guid . '">' . $guid . '</a>');  // json_encode( $a->export(), JSON_PRETTY_PRINT )

  $app->redirect('index.php/new/' . $guid);
});


$app->run();

?>












