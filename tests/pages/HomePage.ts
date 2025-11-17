// tests/pages/HomePage.ts
import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';

export class HomePage extends BasePage {
  // === LOCATORS (Private — only this page uses them) ===
  private accountMenu = 'xpath=//button[@aria-label="Settings"]';
  private logoutBtn = 'xpath=//span[text()="Log out"]';
  private userName = 'xpath=(//div[@role="menuitem"]/span/span)[1]';

  constructor(page: Page) {
    super(page);
  }

  // === ACTIONS (Public — tests use these) ===
  async waitForLoad() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.locator('h1').filter({ hasText: 'Today' })).toBeVisible({ timeout: 15000 });
  }
  
  async openAccountMenu() {
    await this.waitAndClick(this.accountMenu);
  }

  async clickLogout() {
    await this.clickByCoordinates(this.logoutBtn);
  }

  async logout() {
      await this.openAccountMenu();
      const logoutButton = this.page.getByRole('menuitem', { name: 'Log out' });
      await logoutButton.waitFor({ state: 'visible', timeout: 10000 });
      await logoutButton.click({ force: true });
    }

  async logoutAndVerify() {
    // Step 1: Open the menu safely (no force!)
    await this.page.getByRole('button', { name: /account|avatar/i }).click();
    await this.page.getByRole('menuitem', { name: 'Log out' }).click();

    // Step 2: Wait for the storm to pass
    await this.page.waitForLoadState('networkidle');

    // Step 3: Accept ANY proof we're logged out
    const loggedOut = this.page.getByText('Welcome back!')
      .or(this.page.getByText('Log in to Todoist'))
      .or(this.page.getByRole('heading', { name: /log in|welcome back/i }))
      .or(this.page.getByLabel('Email'));

    await expect(loggedOut.first()).toBeVisible({ timeout: 20000 });
}


  async getUserName(): Promise<string> {
    await this.page.locator(this.userName).waitFor({ state: 'visible' });
    const text = await this.page.textContent(this.userName);
    return text?.trim() || 'Unknown';
  }

  async expectLoggedOut() {
    await this.page.waitForSelector('h1:has-text("Welcome back!")', { timeout: 10000 });
  }
}