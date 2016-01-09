<?php

use Silex\WebTestCase;
use Student\Application;

class HealthcheckTest extends WebTestCase {
  public function testAccessible()
  {
    $client = $this->createClient();
    $client->request('GET', '/ping');
    $res = $client->getResponse();
    $this->assertTrue($res->isOk());
    $this->assertEquals($res->getContent(), 'pong!');
  }

  /**
   * {@inheritdoc}
   */
  public function createApplication() {
    $app = new Application;
    return $app;
  }
}
