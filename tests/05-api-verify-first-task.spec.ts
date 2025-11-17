// tests/api-verify-first-task.spec.ts
import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('05_API - Verify First Task via REST', () => {
  test('GET /tasks → validate first task content', async ({ request }, testInfo) => {
    const token = process.env.TODOIST_TOKEN;

    if (!token) {
      throw new Error('Add your real Todoist API token to .env as TODOIST_TOKEN=your_token_here');
    }

    const response = await request.get('https://api.todoist.com/rest/v2/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(200);
    const tasks = await response.json();

    testInfo.attachments.push({
      name: 'Full API Response',
      contentType: 'application/json',
      body: Buffer.from(JSON.stringify(tasks, null, 2)),
    });

    if (tasks.length > 0) {
      expect(tasks[0].content).toBe('Add more _personal_ routines');
      testInfo.annotations.push({ type: 'success', description: 'First task content matches!' });
    } else {
      testInfo.annotations.push({ type: 'info', description: 'No tasks found — account is clean' });
    }
  });
});