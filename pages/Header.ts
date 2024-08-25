import { expect, Locator, Page } from '@playwright/test';
import { Fixture, Given, Then, When } from 'playwright-bdd/decorators';
import { test } from './PageFixtures';

export @Fixture<typeof test>(`header`) class Header {
  readonly page: Page;
  readonly appLogo: Locator;
  readonly hamburgerMenuButton: Locator;
  readonly logoutMenuEntry: Locator;
  readonly hamburgerMenuCloseButton: Locator;

  readonly cartLink: Locator;
  readonly cartItemCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appLogo = page.locator('div.app_logo');
    this.hamburgerMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutMenuEntry = page.getByRole('link', { name: 'Logout' });
    this.hamburgerMenuCloseButton = page.getByRole('button', { name: 'Close Menu' });
    this.cartLink = page.locator('a.shopping_cart_link');
    this.cartItemCount = page.locator('span.shopping_cart_badge');
  }

  async getCartItemCount (): Promise<number> {
    const itemCount = `${await this.cartItemCount.textContent()}`;

    return (itemCount !== '') ? +itemCount : 0;
  }

  @When(`the user clicks Log out from hamburger menu`)
  async doLogout (): Promise<void> {
    await this.hamburgerMenuButton.click();
    await this.logoutMenuEntry.click();
  }

  @Then('the cart item badge must show correct count of {int}')
  async shouldShowCorrectProductsCount (count: number) {
    const cartItemCount = await this.getCartItemCount();
    expect(cartItemCount).toEqual(count);
  };

  @Then('the item count badge must not be displayed on cart icon in header')
  async itemCountMustNotBeDisplayed () {
    await expect(this.cartItemCount).toHaveCount(0);
  };

  @Then('the cart item badge must not be displayed')
  async shouldNotShowCartCountBadge () {
    await expect(this.cartItemCount).toHaveCount(0);
  };

  @Given('is on the cart page')
  async userIsOnCartPage () {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/.*cart.html$/);
  };

  @When('the user clicks on the cart icon from the header')
  async userClicksOnCartIconFromHeader () {
    await this.cartLink.click();
  };
}
