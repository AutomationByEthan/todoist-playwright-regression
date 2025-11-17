// tests/pages/LoginPage.ts
import { BasePage } from './BasePage';
import { Page, expect } from '@playwright/test';

export class LoginPage extends BasePage {
  // === LOCATORS (Private — only this page uses them) ===
  private email = 'xpath=//input[@type="email"]';
  private password = 'xpath=//input[@type="password"]';
  private loginBtn = 'button[type="submit"]';
  private errorMsg = 'text=Wrong email or password.';

  constructor(page: Page) {
    super(page);
  }

  // === ACTIONS (Public — tests use these) ===
  async goto() {
    await super.goto('https://app.todoist.com');
  }

  async enterEmail(email: string) {
    await this.waitAndFill(this.email, email);
  }

  async enterPassword(password: string) {
    await this.waitAndFill(this.password, password);
  }

  async clickLogin() {
    await this.waitAndClick(this.loginBtn);
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
    await this.page.waitForTimeout(5000);
  }

  async expectError() {
    await this.page.locator(this.errorMsg).waitFor({ state: 'visible', timeout: 10000 });
  }

  async logout() {
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('menuitem', { name: 'Log out' }).click({ force: true });
    await expect(this.page.getByText('Welcome back!')).toBeVisible({ timeout: 15000 });
  }
}