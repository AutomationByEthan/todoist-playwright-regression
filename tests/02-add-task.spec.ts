// tests/add-task.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage, HomePage } from './pages';
import * as dotenv from 'dotenv';
dotenv.config();

// Helper to attach screenshots cleanly
const attachScreenshot = async (page: Page, name: string, testInfo: any) => {
  const buffer = await page.screenshot({ fullPage: true });
  testInfo.attachments.push({
    name,
    contentType: 'image/jpeg',
    body: buffer,
  });
};

const TASK_NAME = 'Start With the Basics';
const TASK_DESC = 'Basics are essential in the foundation of all building, especially when it comes to Automation. Let\'s start off on the right footing';

test.describe('02_Add a Task', () => {
  test('create task → validate name & description → logout', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // === Login ===
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);
    await attach(page, '01 - After Login - Home Page', testInfo);

    // === Add Task ===
    await page.locator('xpath=(//span[text()="Add task"])[1]').click();
    await page.waitForTimeout(2000);
    await page.locator('xpath=//div[@aria-label="Task name"]').fill(TASK_NAME);
    await page.locator('xpath=//div[@aria-label="Description"]').fill(TASK_DESC);

    // Click "Tomorrow" in the date picker
    await page.locator('xpath =//div[@aria-label="Set date"]').click();
    await page.locator('xpath=//button[@data-track="scheduler|date_shortcut_tomorrow"]').click();

    await attach(page, '02 - Task Filled In', testInfo);
    await page.getByRole('button', { name: 'Add task' }).click();

    // === Go to Upcoming to see tomorrow's tasks ===
    await page.getByRole('link', { name: 'Upcoming' }).click();
    await expect(page.getByRole('heading', { name: 'Upcoming' })).toBeVisible();
    await attach(page, '03 - Upcoming Page', testInfo);

    // === Validate Task Name ===
    const taskTitle = page.locator(`(//section[contains(@aria-label, "Tomorrow")]//div[text()="${TASK_NAME}"])[1]`);
    await expect(taskTitle).toBeVisible({ timeout: 10000 });
    await attach(page, '04 - Task Name Validated', testInfo);

    testInfo.annotations.push({
      type: 'validation',
      description: `Task name matches → Expected: "${TASK_NAME}" | Actual: "${await taskTitle.textContent()}" → PASSED`
    });

    // === Validate Task Description ===
    const taskDesc = page.locator(`(//section[contains(@aria-label, "Tomorrow")]//p[text()="${TASK_DESC}"])[1]`);
    await expect(taskDesc).toBeVisible({ timeout: 10000 });
    await attach(page, '05 - Task Description Validated', testInfo);

    testInfo.annotations.push({
      type: 'validation',
      description: `Task description matches → Expected & Actual match → PASSED`
    });

    // === Final Status ===
    testInfo.annotations.push({
      type: 'result',
      description: 'Script Status: PASSED (both validations succeeded)'
    });

    // Logout
    await homePage.openAccountMenu();
    await loginPage.logout();
        await attachScreenshot(page, '05 - Logout Screen', testInfo);
        console.log('Successfully logged out');
  });
});

// Helper: attach screenshot to the official Playwright report
async function attach(page: any, name: string, testInfo: any) {
  const buffer = await page.screenshot({ fullPage: true });
  testInfo.attachments.push({
    name,
    contentType: 'image/jpeg',
    body: buffer,
  });
}