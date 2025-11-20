# Todoist Playwright Regression Suite

Migration of a 5-year-old Katalon/Selenium suite → modern Playwright + TypeScript in **one week**.

Production-grade example of clean, maintainable, **zero-flake** automated regression testing for enterprise workflows.

[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Key Features
- **100% Parallel Execution** – with sharding for fast CI runs
- **Rich Built-in HTML Reporter** – screenshots, videos, trace viewer, API responses
- **Page Object Model** – clean, resilient locators = zero flakiness
- **Ordered Regression Flow** – logical sequence in reports
- **Pure Playwright Best Practices** – runs locally, GitHub Actions, Jenkins, Azure DevOps
- **Compliance-Ready** – designed for regulated environments (federal, health IT, PHI-safe)

## Interactive HTML Report (with screenshots, videos & traces)

The suite generates a full interactive Playwright dashboard on every run.

**How to view it in 10 seconds (no install needed):**

1. Click **Code** → **Download ZIP** (top-right of the repo)
2. Unzip the folder
3. Open `playwright-report/index.html` in your browser  
   → Full interactive report with timeline, traces, videos, and screenshots works instantly!

Or generate a fresh one locally:
```bash
npx playwright test --reporter=html
npx playwright show-report