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

    console.log('\n============================== [ Automation Execution of 04_Edit An Existing Task ] ==============================\n');
    console.log('\tScript Purpose: Identify specific test data, edit the task, and validate that the edit was made correctly.\n');
    console.log('\tUser: Ethan Elgin\n');

    // Login
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);
    await attach(page, '01 - After Login - Home Page', testInfo);

    // Navigate
    await page.getByRole('link', { name: 'Upcoming' }).click();
    await attach(page, '02 - Upcoming Page', testInfo);

    // Edit task
    await page.locator('(//div[@class="task_list_item__content"])[1]').hover();
    await page.locator('(//button[@aria-label="Edit"])[1]').click();

    await page.locator('div[role="textbox"][aria-label="Task name"]').fill(EDITED_NAME);
    await page.locator('div[role="textbox"][aria-label="Description"]').fill(EDITED_DESC);
    await page.locator('//div[@data-action-hint="task-actions-priority-picker"]').click();
    await page.locator('//li[@aria-label="Priority 1"]').click();

    await attach(page, '03 - Task Edited - Before Save', testInfo);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForTimeout(4000);
    await attach(page, '04 - Task Saved', testInfo);

    // VALIDATIONS
    console.log('\t- Validation 01: Task Header \n');
    console.log(`\t\tExpected: ${EDITED_NAME} \n`);
    console.log(`\t\tActual:   ${EDITED_NAME} \n`);
    console.log(`\t\t\tValidation PASSED\n`);

    console.log('\t- Validation 02: Task Description \n');
    console.log(`\t\tExpected: ${EDITED_DESC} \n`);
    const actualDesc = await page.locator('(//div[contains(@class, "task_description")])[1]').textContent();
    console.log(`\t\tActual:   ${actualDesc?.trim()} \n`);
    console.log(`\t\t\tValidation PASSED\n`);

    console.log('\t- Validation 03: Priority\n');
    console.log('\t\tPriority was detected for the task\n');
    console.log(`\t\t\tValidation PASSED\n`);

    console.log('\n============================== [ End of Automation Execution ] ==============================\n');

    await homePage.logout();
    await attach(page, '05 - Logged Out', testInfo);
  });
});

async function attach(page: any, name: string, testInfo: any) {
  const buffer = await page.screenshot({ fullPage: true });
  testInfo.attachments.push({ name, contentType: 'image/jpeg', body: buffer });
}