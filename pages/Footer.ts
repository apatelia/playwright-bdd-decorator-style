import { expect, Locator, Page } from '@playwright/test';
import { Fixture, Then, When } from 'playwright-bdd/decorators';
import { test } from './PageFixtures';

export @Fixture<typeof test>(`footer`) class Footer {
  readonly page: Page;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedInLink: Locator;
  readonly copyrightText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.twitterLink = page.getByRole('link', { name: 'Twitter' });
    this.facebookLink = page.getByRole('link', { name: 'Facebook' });
    this.linkedInLink = page.getByRole('link', { name: 'LinkedIn' });
    this.copyrightText = page.locator('div.footer_copy');
  }

  async clickTwitterLink (): Promise<void> {
    await this.twitterLink.click();
  }

  async clickFacebookLink (): Promise<void> {
    await this.facebookLink.click();
  }

  async clickLinkedInLink (): Promise<void> {
    await this.linkedInLink.click();
  }

  async getCopyrightTextContent (): Promise<string> {
    return `${await this.copyrightText.textContent()}`;

  }

  @Then('{string} link in footer should be visible')
  async socialMediaLinkShouldBeVisible (link: string) {
    switch (link) {
      case 'Twitter/X':
        await expect(this.twitterLink).toBeEnabled();
        break;
      case 'Facebook':
        await expect(this.facebookLink).toBeEnabled();
        break;
      case 'LinkedIn':
        await expect(this.linkedInLink).toBeEnabled();
        break;
      default:
        break;
    }
  };

  @When('the user clicks {string} link from footer, it should open correct {string} in a new tab')
  async clickOnSocialMediaLink (socialMedia: string, url: string) {
    const newPagePromise = this.page.context().waitForEvent('page');

    switch (socialMedia) {
      case 'Twitter/X':
        await this.clickTwitterLink();
        break;
      case 'Facebook':
        await this.clickFacebookLink();
        break;
      case 'LinkedIn':
        await this.clickLinkedInLink();
        break;
      default:
        break;
    }

    const newPage = await newPagePromise;
    await newPage.waitForLoadState();

    const regexPattern = `.*${url}.*`;
    const regex = new RegExp(regexPattern);
    await expect(newPage).toHaveURL(regex);
  };

  @Then('copyright text in footer should be visible')
  async copyrightTextShouldBeVisible () {
    await expect(this.copyrightText).toBeVisible();
  };

  @Then('the copyright text contents should be correct')
  async copyrightTextShouldBeCorrect () {
    const textContent = await this.getCopyrightTextContent();
    expect(textContent).toEqual('© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
  };
}
