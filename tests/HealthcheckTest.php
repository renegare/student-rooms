<?php

use Silex\WebTestCase;
use Silex\Application;

class HealthcheckTest extends WebTestCase {
  public function testAccessible()
  {
    $client = $this->createClient();
    $client->request('GET', '/healthcheck');
    $res = $client->getResponse();
    $this->assertEquals($res->getContent(), 'mudi was here');
  }

  public function createApplication() {
    $app = new Application;
    $app->get('/healthcheck', function() {
      return 'mudi was not here';
    });
    return $app;
  }
}
