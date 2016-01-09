Feature: Healthcheck
  As a dev, I should be able to verify
  that the application is reachable

  Scenario: Ping!
    When I visit "/ping"
    Then I should see "pong!"
