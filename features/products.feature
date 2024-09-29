@products
Feature: Products

  Background:
    Given I am on login page
    When I try to login with "standard_user" as username and "secret_sauce" as password
    Then I must be taken to Products page

  @add_to_cart
  Scenario: Test that I am able to add a product to the cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart item badge must show correct count of 1

  @remove_from_cart
  Scenario: Test that I am able to remove a product from the cart
    When I add "Sauce Labs Bike Light" to the cart
    Then I should be able to remove "Sauce Labs Bike Light" from the cart, using the `Remove` button
    And the item count badge must not be displayed on cart icon in header

  @logout
  Scenario: Test that I am able to log out from the products page
    When I click Log out from hamburger menu
    Then I must be logged out

  @footer @social_media_links
  Scenario Outline: Test Social Media links in footer
    Then "<Social Media>" link in footer should be visible
    When I click "<Social Media>" link from footer
    Then it should open correct "<URL>" in a new tab

    # title-format: <Social Media> link in footer should work
    Examples:
      | Social Media | URL                                         |
      | Twitter/X    | https://x.com/saucelabs                     |
      | Facebook     | https://www.facebook.com/saucelabs          |
      | LinkedIn     | https://www.linkedin.com/company/sauce-labs |

  @footer @copyright
  Scenario: Test that the copyright text in footer is visible
    Then copyright text in footer should be visible
    And the copyright text contents should be correct
