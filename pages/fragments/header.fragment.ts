import { expect, Locator, Page } from "@playwright/test";
import { Fixture, Then, When } from "playwright-bdd/decorators";
import { test } from "../fixtures/page.fixtures";

export
@Fixture<typeof test>("header")
class Header {
  readonly page: Page;
  readonly hamburgerMenuButton: Locator;
  readonly logoutMenuEntry: Locator;
  readonly hamburgerMenuCloseButton: Locator;

  readonly cartLink: Locator;
  readonly cartItemCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hamburgerMenuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutMenuEntry = page.getByRole("link", { name: "Logout" });
    this.hamburgerMenuCloseButton = page.getByRole("button", { name: "Close Menu" });
    this.cartLink = page.locator("a.shopping_cart_link");
    this.cartItemCount = page.locator("span.shopping_cart_badge");
  }

  async getCartItemCount(): Promise<number> {
    const itemCount = `${await this.cartItemCount.textContent()}`;

    return itemCount !== "" ? +itemCount : 0;
  }

  @When("I click Log out from hamburger menu")
  async doLogout(): Promise<void> {
    await this.hamburgerMenuButton.click();
    await this.logoutMenuEntry.click();
  }

  @Then("the cart item badge must show correct count of {int}")
  async shouldShowCorrectProductsCount(count: number): Promise<void> {
    const cartItemCount = await this.getCartItemCount();
    expect(cartItemCount).toEqual(count);
  }

  @Then("the item count badge must not be displayed on cart icon in header")
  async itemCountMustNotBeDisplayed(): Promise<void> {
    await expect(this.cartItemCount).toHaveCount(0);
  }

  @Then("I click on the cart icon from the header")
  async userClicksOnCartIconFromHeader(): Promise<void> {
    await this.cartLink.click();
  }
}
