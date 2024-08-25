import { test as base } from 'playwright-bdd';
import { LoginPage } from './LoginPage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';
import { Header } from './Header';
import { Footer } from './Footer';

type PageFixtures = {
  loginPage: LoginPage,
  productsPage: ProductsPage,
  cartPage: CartPage,
  header: Header,
  footer: Footer;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  header: async ({ page }, use) => use(new Header(page)),
  footer: async ({ page }, use) => use(new Footer(page)),
});
