const webdriver = require("selenium-webdriver");
const { Builder, By, until } = require("selenium-webdriver");
//const { Builder, By } = webdriver;
require("chromedriver");

const INPUT_WRAPPER_LOCATOR = By.css('[data-testid="task-input"]');

describe("TO DO List", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("should load todo app", async () => {
    await driver.get("http://localhost:3000/");
    const titleEl = await driver.findElement(
      By.css('[data-testid="todo-title"]')
    );
    expect(await titleEl.getText()).toBe("TODO LIST");
  }, 30000);

  test("should add a new task via keyboard and verify its presence", async () => {
    const newTask = 'First task';

    const inputWrapper = await driver.wait(
      until.elementLocated(INPUT_WRAPPER_LOCATOR),
      10000
    );
    await driver.wait(until.elementIsVisible(inputWrapper), 10000);
    const input = await inputWrapper.findElement(By.css('input'));
    await input.sendKeys(newTask, webdriver.Key.ENTER);

    const task = await driver.findElement(
      By.css(`[data-testid="task-${newTask}"]`)
    );
    expect(await task.getText()).toContain(newTask);
  }, 30000);


  test("should add a new task via button and verify its presence", async () => {
    const newTask = 'Second task';

    const inputWrapper = await driver.wait(
      until.elementLocated(INPUT_WRAPPER_LOCATOR),
      10000
    );
    await driver.wait(until.elementIsVisible(inputWrapper), 10000);
    const input = await inputWrapper.findElement(By.css('input'));
    await input.sendKeys(newTask);

    const addTaskButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="add-test-button"]')),
      10000
    );
    await driver.wait(until.elementIsVisible(addTaskButton), 10000);
    await addTaskButton.click();

    const task = await driver.findElement(
      By.css(`[data-testid="task-${newTask}"]`)
    );
    expect(await task.getText()).toContain(newTask);
  }, 30000);
});
