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
    this.productHeading = page.getByText("Products");
    this.allProducts = page.locator("div.inventory_item");
    this.productSortOptions = page.locator("select.product_sort_container");
  }

  @When("I add {string} to the cart")
  async addProductToCart(productName: string): Promise<void> {
    const product: Locator = this.allProducts.filter({ hasText: productName });

    const addToCartButton = product.locator("button");
    await addToCartButton.click();
  }

  @Then("I should be able to remove {string} from the cart, using the `Remove` button")
  async removeProductFromCart(productName: string): Promise<void> {
    const product: Locator = this.allProducts.filter({ hasText: productName });

    const removeButton = product.locator("button");
    await removeButton.click();
  }

  @Then("I must be taken to Products page")
  async userIsTakenToProductsPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory.html/);

    await expect(this.productHeading).toBeVisible();
  }
}
