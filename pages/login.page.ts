import { Locator, Page, expect } from "@playwright/test";
import { test } from "./fixtures/page.fixtures";
import { Fixture, Given, When, Then } from "playwright-bdd/decorators";

export
@Fixture<typeof test>("loginPage")
class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByTestId("username");
    this.password = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.errorMessage = page.getByTestId("error");
  }

  @Given("I am on login page")
  async goto(): Promise<void> {
    await this.page.goto("https://www.saucedemo.com");
  }

  @When("I try to login with {string} as username and {string} as password")
  async doLogin(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  @Then("I should see a locked out error message")
  async userShouldSeeLockedOutMessage(): Promise<void> {
    await expect.soft(this.errorMessage).toBeVisible();

    await expect.soft(this.errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");
  }

  @Then("I should see invalid credentials error message")
  async userShouldSeeInvalidCredentialsError(): Promise<void> {
    await expect.soft(this.errorMessage).toBeVisible();

    await expect.soft(this.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
  }

  @Then("I must be logged out")
  async shouldBeLoggedOut(): Promise<void> {
    await expect.soft(this.loginButton).toBeVisible();
  }
}
