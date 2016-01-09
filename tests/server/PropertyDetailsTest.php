<?php

require_once __DIR__ . '/TestCase.php';

class PropertyDetailsTest extends TestCase {
  public function testPageIsRendered()
  {
    $client = $this->createClient();
    $crawler = $client->request('GET', '/');
    $res = $client->getResponse();
    $this->assertTrue($res->isOk());
    $expectedElements = [
      'nav#main',
      '#property-name',
      '#address',
      '#image',
      '#description',
      '#ratings',
      '#contact',
      '#room-quantity',
      '#room-types',
      '#facilities'
    ];
    foreach($expectedElements as $element) {
      $this->assertCount(1, $crawler->filter($element), "Expected element \"$element\" exists on the page.");
    }
  }
}
