# Todoist Playwright Regression Suite

Migration of a 5-year-old Katalon/Selenium suite → modern Playwright + TypeScript in **one week**.

Production-grade example of clean, maintainable, **zero-flake** automated regression testing for enterprise workflows.

[![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests](https://github.com/AutomationByEthan/todoist-playwright-regression/actions/workflows/ci.yml/badge.svg)](https://github.com/AutomationByEthan/todoist-playwright-regression/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Key Features
- **100% Parallel Execution**: With sharding for fast runs in CI/CD.
- **Built-in HTML Reporter**: Embeds screenshots, videos, traces, and API responses for full auditability.
- **Page Object Model**: Clean locators ensure zero flakiness—ideal for regulated environments.
- **Ordered Tests**: Guarantees logical report sequence.
- **Pure Playwright Best Practices**: No custom hacks; runs locally or in GitHub Actions/Jenkins.
- **Compliance-Ready**: Designed for reproducible testing in federal/health IT contexts (e.g., PHI-safe workflows).

## Sample Report
Click to view a full example:  
[![Sample Playwright Report](./report-screenshot.png)](./playwright-report/index.html)  
*(Generated from real runs—includes embedded evidence for defect tracking.)*

## Quick Start
```bash
git clone https://github.com/AutomationByEthan/todoist-playwright-regression.git
cd todoist-playwright-regression
npm install
npx playwright test                  # Run in headed mode
npx playwright test --reporter=html  # Generate HTML report
npx playwright show-report           # View report locally
