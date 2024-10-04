import { expect, Locator, Page } from "@playwright/test";
import { Fixture, Given, Then, When } from "playwright-bdd/decorators";
import { test } from "./fixtures/page.fixtures";

export
@Fixture<typeof test>("cartPage")
class CartPage {
  readonly page: Page;
  readonly cartHeading: Locator;
  readonly allProductsInCart: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartHeading = page.getByText("Your Cart");
    this.allProductsInCart = page.locator("div.cart_item");
    this.continueShoppingButton = page.getByRole("button", { name: "Go back CONTINUE SHOPPING" });
    this.checkoutButton = page.getByRole("button", { name: "CHECKOUT" });
  }

  async goto(): Promise<void> {
    await this.page.goto("/cart.html");
  }

  async doContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async doCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async getProductQuantity(productName: string): Promise<number> {
    const product: Locator = this.allProductsInCart.filter({ hasText: productName });

    const quantity = `${await product.locator("div.cart_quantity").textContent()}`;

    return quantity !== "" ? +quantity : 0;
  }

  @Given("I am on the cart page")
  async userIsOnCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*cart.html$/);
  }

  @Then("price of the {string} in cart must match {string}")
  async productPriceInCartBadgeMustMatch(productName: string, productPrice: string): Promise<void> {
    const product: Locator = this.allProductsInCart.filter({ hasText: productName });

    const price = `${await product.locator("div.inventory_item_price").textContent()}`;
    expect(price).toEqual(productPrice);
  }

  @Then("quantity of the {string} in cart must match {int}")
  async productQuantityInCartBadgeMustMatch(productName: string, productQuantity: number): Promise<void> {
    expect(await this.getProductQuantity(productName)).toEqual(productQuantity);
  }

  @Then("I remove {string} from the cart")
  async userRemovesProductFromCart(productName: string): Promise<void> {
    const product: Locator = this.allProductsInCart.filter({ hasText: productName });

    const removeButton = product.locator("button");
    await removeButton.click();
  }

  @When("I click on the `Continue Shopping` button")
  async userClicksContinueShopping(): Promise<void> {
    await this.doContinueShopping();
  }

  @When("I click on the `Checkout` button")
  async userClicksCheckoutButton(): Promise<void> {
    await this.doCheckout();
  }

  @When("I should be on Your Information page")
  async userShouldBeOnYourInfoPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
  }
}
