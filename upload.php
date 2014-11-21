<?php 
require 'vendor/autoload.php';

$config = new \Flow\Config();
$config->setTempDir('./chunks_temp_folder');
$file = new \Flow\File($config);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($file->checkChunk()) {
        header("HTTP/1.1 200 Ok");
    } else {
        header("HTTP/1.1 404 Not Found");
        return ;
    }
} else {
  if ($file->validateChunk()) {
      $file->saveChunk();
  } else {
      // error, invalid chunk upload request, retry
      header("HTTP/1.1 400 Bad Request");
      return ;
  }
}
if ($file->validateFile() && $file->save('./final_file_name')) {
    // File upload was completed
} else {
    // This is not a final chunk, continue to upload
}
?>