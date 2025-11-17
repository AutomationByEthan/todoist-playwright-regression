// tests/edit-task.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage, HomePage } from './pages';
import * as dotenv from 'dotenv';
dotenv.config();

const EDITED_NAME = "Edited: Lets Start Automating Today!";
const EDITED_DESC = "Edited: Lets start removing the repetitive tasks. Start devoting more time where it is needed.";

test.describe('04_Edit An Existing Task', () => {
  test('edit first task → change name, desc & priority → validate → logout', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // === Login ===
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);
    await attach(page, '01 - After Login - Home Page', testInfo);

    // === Go to Upcoming (or Today) where tasks are visible ===
    await page.getByRole('link', { name: 'Upcoming' }).click();
    await expect(page.getByRole('heading', { name: 'Upcoming' })).toBeVisible();
    await attach(page, '02 - Upcoming Page', testInfo);

    // === Edit the first task in the list ===
    const firstTask = page.locator('(//div[@class="task_list_item__content"])[1]').first();
    await expect(firstTask).toBeVisible({ timeout: 10000 });

    await firstTask.hover();
    //await firstTask.click();
    await page.locator('(//div[@class="task_list_item__content"]//following::button[@aria-label="Edit"])[1]').click();
    await page.waitForTimeout(1000);

    // === Edit fields ===
    await page.locator('div[role="textbox"][aria-label="Task name"]').fill(EDITED_NAME);
    await page.waitForTimeout(1000);
    await page.locator('div[role="textbox"][aria-label="Description"]').fill(EDITED_DESC);
    await page.waitForTimeout(1000);

    // Set Priority 1 (red)
    await page.locator('//div[@data-action-hint="task-actions-priority-picker"]').click();
    await page.waitForTimeout(1000);
    await page.locator('//li[@aria-label="Priority 1"]').click();
    await page.waitForTimeout(1000);

    await attach(page, '03 - Task Edited - Before Save', testInfo);

    // Save
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(4000);

    await attach(page, '04 - Task Saved', testInfo);

    // === Validate Name ===
    const updatedName = page.locator('(//div[contains(@class, "task_content")])[1]');
    await expect(updatedName).toHaveText(EDITED_NAME, { timeout: 8000 });
    testInfo.annotations.push({
      type: 'validation',
      description: `Task name updated → Expected: "${EDITED_NAME}" | Actual: "${await updatedName.textContent()}" → PASSED`
    });

    // === Validate Description ===
    const updatedDesc = page.locator('(//div[contains(@class, "task_description")])[1]');
    await expect(updatedDesc).toContainText(EDITED_DESC);
    testInfo.annotations.push({
      type: 'validation',
      description: `Task description updated → Contains expected text → PASSED`
    });

    // === Validate Priority 1 (red flag) ===
    const priorityFlag = page.locator('(//button[contains(@class, "priority_1") or contains(@class, "priority_p1")])[1]');
    await expect(priorityFlag).toBeVisible();
    testInfo.annotations.push({
      type: 'validation',
      description: 'Priority 1 (red flag) applied → PASSED'
    });

    // === Final Result ===
    testInfo.annotations.push({
      type: 'result',
      description: 'Script Status: PASSED – Task successfully edited and validated'
    });

    // === Logout ===
    await homePage.logout();
    await attach(page, '05 - Logged Out', testInfo);
  });
});

// Pro-level screenshot attacher
async function attach(page: any, name: string, testInfo: any) {
  const buffer = await page.screenshot({ fullPage: true });
  testInfo.attachments.push({
    name,
    contentType: 'image/jpeg',
    body: buffer,
  });
}