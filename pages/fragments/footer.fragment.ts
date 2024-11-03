import { expect, Locator, Page } from "@playwright/test";
import { Fixture, Then, When } from "playwright-bdd/decorators";
import { test } from "../fixtures/page.fixtures";

export
@Fixture<typeof test>("footer")
class Footer {
  readonly page: Page;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedInLink: Locator;
  readonly copyrightText: Locator;

  private _newTab: Page;

  constructor(page: Page) {
    this.page = page;
    this.twitterLink = page.getByRole("link", { name: "Twitter" });
    this.facebookLink = page.getByRole("link", { name: "Facebook" });
    this.linkedInLink = page.getByRole("link", { name: "LinkedIn" });
    this.copyrightText = page.getByTestId("footer-copy");
  }

  async clickTwitterLink(): Promise<void> {
    await this.twitterLink.click();
  }

  async clickFacebookLink(): Promise<void> {
    await this.facebookLink.click();
  }

  async clickLinkedInLink(): Promise<void> {
    await this.linkedInLink.click();
  }

  async getCopyrightTextContent(): Promise<string> {
    return `${await this.copyrightText.textContent()}`;
  }

  @Then("{string} link in footer should be visible")
  async socialMediaLinkShouldBeVisible(link: string): Promise<void> {
    switch (link) {
      case "Twitter/X":
        await expect.soft(this.twitterLink).toBeEnabled();
        break;
      case "Facebook":
        await expect.soft(this.facebookLink).toBeEnabled();
        break;
      case "LinkedIn":
        await expect.soft(this.linkedInLink).toBeEnabled();
        break;
      default:
        break;
    }
  }

  @When("I click {string} link from footer")
  async clickOnSocialMediaLink(socialMedia: string): Promise<void> {
    const newPagePromise = this.page.context().waitForEvent("page");

    switch (socialMedia) {
      case "Twitter/X":
        await this.clickTwitterLink();
        break;
      case "Facebook":
        await this.clickFacebookLink();
        break;
      case "LinkedIn":
        await this.clickLinkedInLink();
        break;
      default:
        break;
    }

    this._newTab = await newPagePromise;
    await this._newTab.waitForLoadState("domcontentloaded");
  }

  @Then("it should open correct {string} in a new tab")
  async verifySocialMediaPageUrl(url: string): Promise<void> {
    const regexPattern = `.*${url}.*`;
    const regex = new RegExp(regexPattern);
    await expect.soft(this._newTab).toHaveURL(regex);
  }

  @Then("copyright text in footer should be visible")
  async copyrightTextShouldBeVisible(): Promise<void> {
    await expect.soft(this.copyrightText).toBeVisible();
  }

  @Then("the copyright text contents should be correct")
  async copyrightTextShouldBeCorrect(): Promise<void> {
    const currentYear = new Date().getFullYear();
    const textContent = await this.getCopyrightTextContent();

    expect.soft(textContent).toStrictEqual(`© ${currentYear} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`);
  }
}
