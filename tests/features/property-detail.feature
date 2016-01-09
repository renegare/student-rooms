@wip
Feature: Property Details
  As a user, I should see the top listed
  property at http://www.unite-students.com/liverpool
  displayed

  Scenario: Display Property Details
    When I visit "/"
    Then I should see the property page in 5s
    And displayed info should match top listed property on "http://www.unite-students.com/liverpool"
