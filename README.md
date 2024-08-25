## About

This repository contains a BDD test framework example using [Playwright](https://playwright.dev), [playwright-bdd](https://github.com/vitalets/playwright-bdd) and Page Object Model pattern with Playwright Fixtures.

BDD/test steps are implemented using typescript decorator style supported by playwright-bdd.

## Usage

1. Download the zip file or clone this repository.
2. Change the directory to `playwright-with-bdd`.

   ```sh
   cd playwright-bdd-decorator-style
   ```
3. Install dependencies.

   ```sh
   npm install
   ```
4. Install browsers.

   ```sh
   npx playwright install
   ```
5. Run tests.

   ```sh
   # Run all the tests/scenarios.
   npm run test

   # Run specific test(s)/scenario(s) using specific tag(s).
   # You can use Feature file level,
   # or test scenario level tags to fine control the execution.

   # Run all tests with @login tag.
   npm run tagged-test "login"

   # Run all tests NOT having @cart tag.
   npm run not-tagged-test "cart"
   ```
6. View nice HTML reports.

   ```sh
   # This command will show the HTML report generated by
   # Cucumber 'html' reporter.
   npm run report

   # To view the HTML report generated by Playwright's default "html" reporter
   # use below command
   npm run report:debug
   ```