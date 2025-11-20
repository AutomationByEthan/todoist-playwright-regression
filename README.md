# Todoist Playwright Regression Suite

Migration of a 5-year-old Katalon/Selenium suite → modern Playwright + TypeScript in **one week**.

Production-grade example of clean, maintainable, **zero-flake** automated regression testing.

[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Key Features
- 100% parallel execution with sharding
- Built-in HTML reporter with embedded screenshots & API responses
- Page Object Model + clean locators (no flaky-test-proof)
- Ordered test files → perfect report sequence
- Zero custom code in tests – pure Playwright best practices
- Runs locally or in any CI/CD (GitHub Actions ready)

## Sample Report (click to enlarge)
[![Sample Playwright Report](./report-screenshot.png)](https://html.report/todoist-example/index.html)

## Quick Local Run
```bash
git clone https://github.com/AutomationByEthan/todoist-playwright-regression.git
cd todoist-playwright-regression
npm install
npx playwright test                  # headed mode + full speed
npx playwright test --reporter=html  # generates beautiful report
npx playwright show-report           # opens report in browser
