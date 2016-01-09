<?php

namespace Student;

use Silex\Application as App;
use Silex\Provider\TwigServiceProvider;

class Application extends App {
  /**
   * {@inheritdoc}
   */
  public function __construct(array $values = array()) {
    parent::__construct($values);
    $this['debug'] = true;
    $this->register(new TwigServiceProvider(), array(
        'twig.path' => __DIR__.'/../tmpl'
    ));

    $this->get('/ping', function() {
      return 'pong!';
    });

    $this->get('/', function () {
      return $this['twig']->render('property.twig');
    });
  }
}
