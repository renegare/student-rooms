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
      return $this['twig']->render('property.twig', [
        'name' => 'Larch House',
        'address' => 'Cambridge Court, L7 7EE',
        'images' => [
          'http://www.unite-students.com/scaled/binaries/159/699/lv_lh_ext_9988.jpg',
          'http://www.unite-students.com/scaled/binaries/731/35/lv_lh_kit.jpg',
          'http://www.unite-students.com/scaled/binaries/545/1021/lv_lh_p11br_4005.jpg' ],
        'description' => ['Larch House is part of our Student Village, at the heart of Liverpool’s university district. Just a couple of minutes’ walk to Liverpool John Moores and University of Liverpool campuses, the property is in the perfect location to make the most of your time in the city.', 'Each of the properties in the Student Village has its own style and character, so there’s something to suit all tastes. Larch House has a bar and convenience store in the building, and is highly popular with students from Liverpool John Moores University (LJMU), University of Liverpool, Liverpool Institute of Performing Arts (LIPA) and Edge Hill University. The property is just 15 minutes’ walk from Liverpool city centre. The property has a range of en-suite rooms with shared kitchen and living areas, perfect for sharing with friends or meeting new people. There are also three types of studios available, for more independent student living. This characterful property is Grade II listed, so every room is unique.', 'As with all our Liverpool student village accommodation, Larch House offers Wi-Fi, contents insurance and all utility bills included in the price, so there are no unexpected costs to worry about.'],
        'roomTypes' =>  [
          [
            'name' => 'Classic non-en-suite',
            'price' => 'From £95',
            'description' => ['Non-en-suite rooms feature a separate shared bathroom and have a comfortable single bed, your own desk and Wi-Fi connected work space. A typical room is 3m x 3m.', 'Photography is representative - room layout, contents and furnishings may vary.'],
            'images' => [
              'http://www.unite-students.com/scaled/binaries/261/622/lv_lh_brm_0002.jpg',
              'http://www.unite-students.com/scaled/binaries/59/186/lv_lh_cnonrm_4000.jpg']],
          [
            'name' => 'Basic non-en-suite',
            'price' => 'From £109',
            'description' => ['Basic non-ensuite rooms have single beds. Rooms are approximately 3m x 3m and are centrally heated with a separate shared bathroom.', 'Photography is representative - room layout, contents and furnishings may vary.'],
            'images' => [
              'http://www.unite-students.com/scaled/binaries/399/699/liverpool_larch_nonensuite.jpg']],
          [
            'name' => 'Premium range 1 non-en-suite',
            'price' => 'From £130',
            'description' => ['Non-en-suite rooms feature a separate shared bathroom and have a comfortable single bed, your own desk and Wi-Fi connected work space. These rooms are slightly larger than the Classic room with a typical room measuring 3m x 4m.', ' Photography is representative - room layout, contents and furnishings may vary.'],
            'images' => [
              'http://www.unite-students.com/scaled/binaries/32/695/lv_lh_cnonrm_3983.jpg']],
          [
            'name' => 'Premium range 1 one bedroom flat',
            'price' => 'sold out',
            'description' => ['You’ll have the luxury of independent living in our one bedroom flat. The apartment comes with a private hallway and separate living area, kitchen and bathroom. The bedroom has a double bed and generous study area.', 'Photography is representative - room layout, contents and furnishings may vary.'],
            'images' => [
              'http://www.unite-students.com/scaled/binaries/831/429/lv_lh_p11br_4014.jpg' ]]
        ],

        'facilities' => [
          ['name' => 'Wi-Fi'],
          ['name' => 'Bills included'],
          ['name' => 'Cleaning'],
          ['name' => 'Laundry'],
          ['name' => 'Bike storage'],
          ['name' => 'Car parking'],
          ['name' => 'Common room'],
          ['name' => 'Storage space'],
          ['name' => 'Fully fitted'],
          ['name' => 'Furnished'],
          ['name' => 'Personal touches'],
          ['name' => 'Convenience'],
          ['name' => 'Security'],
          ['name' => 'Maintenance'],
          ['name' => 'Emergency'],
          ['name' => 'Advice'],
          ['name' => 'Insurance']
        ]
      ]);
    });
  }
}
