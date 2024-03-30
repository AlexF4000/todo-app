const webdriver = require("selenium-webdriver");
const { Builder, By } = webdriver;
require("chromedriver");

describe("Google Search", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("should search for Selenium", async () => {
    await driver.get("http://localhost:3000/");
    const titleEl = await driver.findElement(
      By.css('[data-testid="todo-title"]')
    );
    expect(await titleEl.getText()).toBe("TODO LIST");
  }, 30000);
});
