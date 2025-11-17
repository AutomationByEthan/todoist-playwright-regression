# Todoist Playwright Regression Suite

**I killed Katalon Studio in one week.**  
This is the result.

https://github.com/user-attachments/assets/8f3c5d1a-9b2d-4e1f-8c99-3e7f2a1b5d6c

### Features
- 5 end-to-end tests (GUI + REST API)
- 100% parallel execution (50+ workers) — zero flakiness
- Beautiful self-documenting HTML report with embedded screenshots & API responses
- Clean page objects, dotenv, no globals, no custom folders
- Bulletproof logout handling (animation waits + force clicks)
- Ordered test files → perfect report sequence

### Run it locally
```bash
npm install
npx playwright install
npx playwright test --headed          # watch the magic
npx playwright test --workers=50       # full parallel speed
npx playwright show-report            # see the masterpiece
