<?php

use Silex\WebTestCase;
use Student\Application;

class TestCase extends WebTestCase {
  /**
   * {@inheritdoc}
   */
  public function createApplication() {
    $app = new Application;
    return $app;
  }
}
