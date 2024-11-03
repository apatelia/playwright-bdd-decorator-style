import { expect, Locator, Page } from "@playwright/test";
import { Fixture, Then, When } from "playwright-bdd/decorators";
import { test } from "./fixtures/page.fixtures";

export
@Fixture<typeof test>("productsPage")
class ProductsPage {
  readonly page: Page;
  readonly productHeading: Locator;
  readonly allProducts: Locator;
  readonly productSortOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productHeading = page.getByTestId("title");
    this.allProducts = page.getByTestId("inventory-item");
    this.productSortOptions = page.getByTestId("product-sort-container");
  }

  @When("I add {string} to the cart")
  async addProductToCart(productName: string): Promise<void> {
    const product: Locator = this.allProducts.filter({ hasText: productName });

    const addToCartButton = product.getByRole("button", { name: "Add to cart" });
    await addToCartButton.click();
  }

  @Then("I should be able to remove {string} from the cart, using the `Remove` button")
  async removeProductFromCart(productName: string): Promise<void> {
    const product: Locator = this.allProducts.filter({ hasText: productName });

    const removeButton = product.getByRole("button", { name: "Remove" });
    await removeButton.click();
  }

  @Then("I must be taken to Products page")
  async userIsTakenToProductsPage(): Promise<void> {
    await expect.soft(this.page).toHaveURL(/.*inventory.html/);

    await expect.soft(this.productHeading).toBeVisible();
  }
}
