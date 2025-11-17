// tests/delete-overdue-tasks.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage, HomePage } from './pages';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('03_Delete All Overdue Tasks', () => {
  test('delete all overdue tasks → validate none remain → logout', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    let deletedCount = 0;

    // === Login ===
    await loginPage.goto();
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);
    await attach(page, '01 - After Login - Home Page', testInfo);

    // === Go to Upcoming ===
    await page.getByRole('link', { name: 'Upcoming' }).click();
    await expect(page.getByRole('heading', { name: 'Upcoming' })).toBeVisible();
    await attach(page, '02 - Upcoming Page', testInfo);

    // === Delete All Overdue Tasks ===
    while (await page.locator('//section[contains(@aria-label, "Overdue")]//div[contains(@class, "task_list_item__content")]').first().isVisible({ timeout: 5000 })) {
      deletedCount++;

      // Hover over first overdue task
      await page.locator('//section[contains(@aria-label, "Overdue")]//div[contains(@class, "task_list_item__content")]').first().hover();

      // Click "More actions" (three dots)
      await page.locator('(//section[contains(@aria-label, "Overdue")]//button[@aria-label="More actions"])[1]').click();

      // Click "Delete task"
      await page.locator('//div[@data-action-hint="task-overflow-menu-delete"]').click();

      // Confirm deletion
      await page.getByRole('button', { name: 'Delete' }).click();

      // Small wait for deletion animation
      await page.waitForTimeout(800);
    }

    // === Final State ===
    const noOverdueTasks = await page.locator('//section[contains(@aria-label, "Overdue")]//div[contains(@class, "task_list_item__content")]').count();
    await attach(page, `03 - Final State - ${deletedCount} Overdue Task${deletedCount === 1 ? '' : 's'} Deleted`, testInfo);

    // === Report Result ===
    if (deletedCount === 0) {
      testInfo.annotations.push({
        type: 'result',
        description: 'No overdue tasks found. Nothing to delete.'
      });
    } else {
      testInfo.annotations.push({
        type: 'result',
        description: `Successfully deleted ${deletedCount} overdue task${deletedCount === 1 ? '' : 's'}.`
      });
    }

    testInfo.annotations.push({
      type: 'validation',
      description: `Final check: ${noOverdueTasks === 0 ? 'PASSED' : 'FAILED'} - No overdue tasks remain.`
    });

    // === Logout ===
    await homePage.openAccountMenu();
    await loginPage.logout();
    await attach(page, '04 - Logged Out', testInfo);
  });
});

// Reusable screenshot attacher
async function attach(page: any, name: string, testInfo: any) {
  const buffer = await page.screenshot({ fullPage: true });
  testInfo.attachments.push({
    name,
    contentType: 'image/jpeg',
    body: buffer,
  });
}
