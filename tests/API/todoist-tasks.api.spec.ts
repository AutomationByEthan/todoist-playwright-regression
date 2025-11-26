// tests/API/todoist-tasks.api.spec.ts
import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

// Correct path for your folder structure
const taskSchema = require('../../schemas/todoist-task.schema.json');

// Clean AJV – no warnings, no duplicate keywords
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
});

// These lines silence the harmless "unknown format" warnings
ajv.addFormat('date-time', true);
ajv.addFormat('uri', true);

const validateTask = ajv.compile(taskSchema);

// Load .env automatically
require('dotenv').config();

const TOKEN = process.env.TODOIST_TOKEN;

test.describe('Todoist API - GET /tasks', () => {
  test.beforeAll(() => {
    if (!TOKEN) {
      throw new Error(`
        Missing TODOIST_TOKEN!
        Create a file named ".env" in project root with:
        TODOIST_TOKEN=your_real_token_here
        → Get it from: https://todoist.com/app/settings/integrations
      `);
    }
  });

  test('returns 200 + all tasks match schema + first task content is correct', async ({ request }) => {
    const start = Date.now();

    const response = await request.get('https://api.todoist.com/rest/v2/tasks', {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    expect(response.status()).toBe(200);
    expect(Date.now() - start).toBeLessThan(3000);

    const tasks = await response.json();

    // Attach full payload to HTML report
    await test.info().attach('Full API Response', {
      body: Buffer.from(JSON.stringify(tasks, null, 2)),
      contentType: 'application/json',
    });

    // SCHEMA VALIDATION (real contract testing)
    for (let i = 0; i < tasks.length; i++) {
      const valid = validateTask(tasks[i]);
      if (!valid) {
        console.error(`Task ${i} failed schema validation:`, validateTask.errors);
        // Use expect().toBe(true) trick instead of expect.fail()
        expect(valid, `Task ${i} does NOT match Todoist schema`).toBe(true);
      }
    }

    // Your original business assertion
    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks[0].content).toBe('Add more _personal_ routines');
  });

  test('rejects requests without token', async ({ request }) => {
    const response = await request.get('https://api.todoist.com/rest/v2/tasks');
    expect(response.status()).toBe(401);
  });
});