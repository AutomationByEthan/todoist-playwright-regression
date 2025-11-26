// tests/api-verify-first-task.spec.ts
import { test, expect } from '@playwright/test';
import 'dotenv/config';               // This single line loads your .env file automatically

test('GET /tasks → validate first task content', async ({ request }) => {
  const token = process.env.TODOIST_TOKEN;

  if (!token) {
    throw new Error(
      'TODOIST_TOKEN is missing!\n' +
      '→ Put your real token in a file called ".env" (with the dot) in the project root:\n' +
      'TODOIST_TOKEN=337cfb4ea05d71e7a144ab1969fbb984150cb346'
    );
  }

  const response = await request.get('https://api.todoist.com/rest/v2/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });

  const status = response.status();
if (status !== 200) {
  const body = await response.text();
  console.log('API returned', status, body);
}
expect(status).toBe(200);

  const tasks = await response.json();

  // Attach full response to the HTML report (no testInfo needed!)
  await test.info().attach('Full API Response', {
    body: Buffer.from(JSON.stringify(tasks, null, 2)),
    contentType: 'application/json',
  });

  if (tasks.length > 0) {
    expect(tasks[0].content).toBe('Add more _personal_ routines');
  } else {
    test.info().annotations.push({
      type: 'info',
      description: 'No tasks found — account is clean',
    });
  }
});