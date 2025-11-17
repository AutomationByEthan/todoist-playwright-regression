// tests/pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // === Reusable Methods (Your Toolbox) ===

  /** Go to any URL with wait */
  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /** Wait for element + click */
  async waitAndClick(locator: Locator | string) {
    const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await loc.waitFor({ state: 'visible', timeout: 10000 });
    await loc.click();
  }

  /** Wait for element + fill text */
  async waitAndFill(locator: Locator | string, text: string) {
    const loc = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await loc.waitFor({ state: 'visible', timeout: 10000 });
    await loc.fill(text);
  }

  /** Take screenshot (optional helper) */
  async screenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.jpg` });
  }

  async clickWithJS(selector: string) {
  await this.page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
  await this.page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) (el as HTMLElement).click();
  }, selector);
}

async clickByCoordinates(selector: string) {
  const element = await this.page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
  const box = await element.boundingBox();
  if (box) {
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  }
}
}