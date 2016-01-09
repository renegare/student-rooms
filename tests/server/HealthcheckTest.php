<?php

require_once __DIR__ . '/TestCase.php';

class HealthcheckTest extends TestCase {
  public function testAccessible()
  {
    $client = $this->createClient();
    $client->request('GET', '/ping');
    $res = $client->getResponse();
    $this->assertTrue($res->isOk());
    $this->assertEquals($res->getContent(), 'pong!');
  }
}
