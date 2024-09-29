@cart
Feature: Cart

  Background:
    Given I am on login page
    When I try to login with "standard_user" as username and "secret_sauce" as password
    Then I must be taken to Products page
    When I add "Sauce Labs Backpack" to the cart
    Then I click on the cart icon from the header
    And I am on the cart page

  @verify_product_details
  Scenario: Test that the correct product is added to the cart
    Then price of the "Sauce Labs Backpack" in cart must match "$29.99"
    And quantity of the "Sauce Labs Backpack" in cart must match 1

  @remove_from_cart
  Scenario: Test removal of a product from the cart
    Then I remove "Sauce Labs Backpack" from the cart
    Then the item count badge must not be displayed on cart icon in header

  @continue_shopping
  Scenario: Test that clicking on 'Continue Shopping' button takes back to Products page
    When I click on the `Continue Shopping` button
    Then I must be taken to Products page

  @begin_checkout
  Scenario: Test that clicking on `Checkout` button starts checkout
    When I click on the `Checkout` button
    Then I should be on Your Information page

  @logout
  Scenario: Test that I am able to log out from the cart page
    When I click Log out from hamburger menu
    Then I must be logged out

  @cart_footer @social_media_links
  Scenario Outline: Test Social Media links in footer
    Then "<Social Media>" link in footer should be visible
    When I click "<Social Media>" link from footer
    And it should open correct "<URL>" in a new tab
    
    # title-format: <Social Media> link in footer should work
    Examples:
      | Social Media | URL                                         |
      | Twitter/X    | https://x.com/saucelabs                     |
      | Facebook     | https://www.facebook.com/saucelabs          |
      | LinkedIn     | https://www.linkedin.com/company/sauce-labs |

  @cart_footer @copyright
  Scenario: Test that the copyright text in footer is visible
    Then copyright text in footer should be visible
    And the copyright text contents should be correct
