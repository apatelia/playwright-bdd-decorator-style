import { test as base } from "playwright-bdd";
import { LoginPage } from "../login.page";
import { ProductsPage } from "../products.page";
import { CartPage } from "../cart.page";
import { Header } from "../fragments/header.fragment";
import { Footer } from "../fragments/footer.fragment";

interface PageObjects {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  header: Header;
  footer: Footer;
}

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  header: async ({ page }, use) => use(new Header(page)),
  footer: async ({ page }, use) => use(new Footer(page)),
});
