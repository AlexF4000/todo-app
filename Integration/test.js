const webdriver = require("selenium-webdriver");
const { Builder, By, until } = require("selenium-webdriver");
//const { Builder, By } = webdriver;
require("chromedriver");

const INPUT_WRAPPER_LOCATOR = By.css('[data-testid="task-input"]');
const newTask = "First task";
const secondTask = "Second task";

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
    const inputWrapper = await driver.wait(
      until.elementLocated(INPUT_WRAPPER_LOCATOR),
      10000
    );
    await driver.wait(until.elementIsVisible(inputWrapper), 10000);
    const input = await inputWrapper.findElement(By.css("input"));
    await input.sendKeys(newTask, webdriver.Key.ENTER);

    const task = await driver.findElement(
      By.css(`[data-testid="task-${newTask}"]`)
    );
    expect(await task.getText()).toContain(newTask);
  }, 30000);

  test("should add a new task via button and verify its presence", async () => {
    const inputWrapper = await driver.wait(
      until.elementLocated(INPUT_WRAPPER_LOCATOR),
      10000
    );
    await driver.wait(until.elementIsVisible(inputWrapper), 10000);
    const input = await inputWrapper.findElement(By.css("input"));
    await input.sendKeys(secondTask);

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

  test("should toggle the task via checkbox and verify its presence", async () => {
    const taskItem = await driver.findElement(
      By.css(`[data-testid="task-${newTask}"]`)
    );
    const taskCheckbox = await taskItem.findElement(
      By.css("input[type='checkbox']")
    );
    await taskCheckbox.click();
  }, 30000);

  test("should delete the task via button and verify its absence", async () => {
    const taskItem = await driver.findElement(
      By.css(`[data-testid="task-${secondTask}"]`)
    );

    const deleteButton = await taskItem.findElement(
      By.css(`[data-testid="delete-test-button"]`)
    );
    await deleteButton.click();

    await driver.sleep(1000);

    const tasks = await driver.findElements(
      By.css(`[data-testid="task-${secondTask}"]`)
    );

    const taskPresent = tasks.length > 0;
    expect(taskPresent).toBe(false);
  }, 30000);
});
