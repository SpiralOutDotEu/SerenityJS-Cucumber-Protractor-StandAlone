Feature: Search on Google
  'When I go to the Google search page, and search for an item,
  I expect to see some reference to that item in the result summary.'

  Scenario: Google search
    Given that I have gone to the Google page
    When I search for "cats"
    Then "cats" should be mentioned in the results