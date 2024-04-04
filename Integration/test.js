const webdriver = require("selenium-webdriver");
const { Builder, By, until } = require("selenium-webdriver");
//const { Builder, By } = webdriver;
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

  test("should add a new task and verify its presence", async () => {
    const taskInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="task-input"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(taskInput), 10000);
    //await taskInput.sendKeys(newTask);

    //const newTask = "Finish selenium integration test";
    //await taskInput.sendKeys(newTask);
    //await addTaskButton.click();

    const addTaskButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="add-test-button"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(addTaskButton), 10000);
    await addTaskButton.click();

    //const task = await driver.findElement(
    //   By.css(`[data-testid="task-${newTask}"]`)
    // );

    //const { Builder, By, until } = require("selenium-webdriver");

    // expect(await task.getText()).toContain(newTask);
  }, 30000);
});
