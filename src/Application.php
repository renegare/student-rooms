<?php

namespace Student;

use Silex\Application as App;

class Application extends App {
  /**
   * {@inheritdoc}
   */
  public function __construct(array $values = array()) {
    parent::__construct($values);

    $this->get('/ping', function() {
      return 'pong!';
    });

  }
}
