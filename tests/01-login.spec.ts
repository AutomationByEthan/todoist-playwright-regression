// tests/login.spec.ts
import { test, expect, Page } from '@playwright/test';
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

test.describe('01_Login and Out', () => {
  test('login → invalid → valid → logout', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    // === 1) Login Page ===
    await loginPage.goto();
    await attachScreenshot(page, '01 - Login Page', testInfo);

    // Invalid Login
    await loginPage.login('wrong@gmail.com', 'wrongEmailTest');
    await loginPage.expectError();
    await page.waitForTimeout(1000);
    await attachScreenshot(page, '02 - Invalid Login Error Message', testInfo);

    // Valid Login
    await loginPage.login(process.env.ADMIN_USER!, process.env.ADMIN_PASS!);
    await attachScreenshot(page, '03 - Home Page', testInfo);

    // === 2) Home Page ===
    await homePage.waitForLoad();
    console.log(`User Successfully Logged Into the Application`);
    await homePage.openAccountMenu();
    await attachScreenshot(page, '04 - Account Dropdown', testInfo);

    const userName = await homePage.getUserName();
    console.log(`Logged in as: ${userName}`);

    // Logout
    await loginPage.logout();

    await attachScreenshot(page, '05 - Logout Screen', testInfo);

    console.log('Successfully logged out');
  });
});