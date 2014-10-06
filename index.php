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

$app->contentType('application/json;charset=utf-8');

R::setup($ustawienia['dbname'], $ustawienia['dbuser'],$ustawienia['dbpass']);
// =========================================================================================================
$app->get('/', function () use ($app){
  $app->redirect('/new/' + random);
});

$app->get('/new/:id', function ($id) use ($app){
  $response = $app->response();
  $response->header('Access-Control-Allow-Origin', '*');
  $response->write( "super jest: " . $id );  // json_encode( $a->export(), JSON_PRETTY_PRINT )
});

?>












