# Student Application

## Prerequisites

```
PHP v5.5+
node v4+
Selenium server standalone v2.48+
Firefox (latest)
```

## Installation

```
# this will also run "npm i" to install node deps
composer install
```

## Start Server (locally)
```
PORT=3000 composer start
```

## Testing

```
# run all tests
composer test

# run php unit tests
composer test:server
```

## Approach

I took the approach of coding this task as I would a real project. I set up some browser driven tests using ```cucumberjs```, and unit tests using ```phpunit```. I also intended to write client side unit tests using ```jasmine``` to test ```flightjs``` components.

## (Intended) Architecture of the Application

Given the desired approach, there would have been two separate components / interfaces to this application:

* Web application that renders the property from a predefined JSON file (aka datastore). This would be based on the ```silex``` PHP micro-framework (which uses Symfony HTTPFoundation Components)
* CLI application (using Symfony Console Component) that scrapes the property data and saves it to a JSON file. This application would have been built using an adapter pattern, where the domain of the *url to scrape* would be mapped to a class that knows how to scrape that type of page. Example interface:

```
./property scrape http://www.unite-students.com/liverpool > property.json
```

The intension behind this structure is to decouple capabilities and provide a not so difficult way to extend this application to handle additional properties


## Retrospectively

This is not a real project :(. Spent 8hrs in total setting a good way to test the hell out of the application, but never got round to completing it.

I guess TDD is not always the way when time is limited.
