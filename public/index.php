<?php

date_default_timezone_set('Europe/London');

require __DIR__ . '/../vendor/autoload.php';

$app = new Student\Application;

$app->run();
