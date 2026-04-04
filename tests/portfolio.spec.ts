import { test, expect } from '@playwright/test';

test.describe('Portfolio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('renders hero section with name and title', async ({ page }) => {
    await expect(page.locator('.hero-name')).toHaveText('José Auyón');
    await expect(page.locator('.hero-label')).toContainText('Software Engineer');
  });

  test('dot navigation has 5 dots', async ({ page }) => {
    const dots = page.locator('.dot-nav .dot');
    await expect(dots).toHaveCount(5);
  });

  test('clicking dot navigates to section', async ({ page }) => {
    // Click second dot (Expertise)
    await page.locator('.dot-nav .dot').nth(1).click();
    await page.waitForTimeout(1000);

    const expertise = page.locator('#expertise');
    await expect(expertise).toBeVisible();
  });

  test('dark/light mode toggle works', async ({ page }) => {
    // Starts in dark mode
    await expect(page.locator('.main-container')).toHaveClass(/dark-mode/);

    // Click toggle
    await page.locator('.mode-toggle').click();
    await expect(page.locator('.main-container')).toHaveClass(/light-mode/);

    // Click again
    await page.locator('.mode-toggle').click();
    await expect(page.locator('.main-container')).toHaveClass(/dark-mode/);
  });

  test('expertise section shows 4 skill cards', async ({ page }) => {
    await page.locator('#expertise').scrollIntoViewIfNeeded();
    const cards = page.locator('.skill-card');
    await expect(cards).toHaveCount(4);
  });

  test('timeline section shows career entries', async ({ page }) => {
    await page.locator('#history').scrollIntoViewIfNeeded();
    const entries = page.locator('.timeline-entry');
    await expect(entries).toHaveCount(6);
  });

  test('timeline sub-projects expand on click', async ({ page }) => {
    await page.locator('#history').scrollIntoViewIfNeeded();
    const toggle = page.locator('.sub-projects-toggle').first();
    await toggle.click();
    await expect(page.locator('.sub-projects.open').first()).toBeVisible();
  });

  test('projects section shows featured project', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await expect(page.locator('.featured-project')).toBeVisible();
    await expect(page.locator('.featured-title')).toHaveText('MERN E-commerce Platform');
  });

  test('projects grid shows remaining projects', async ({ page }) => {
    await page.locator('#projects').scrollIntoViewIfNeeded();
    const cards = page.locator('.project-card');
    await expect(cards).toHaveCount(8);
  });

  test('certificates section shows credentials', async ({ page }) => {
    await page.locator('#credentials').scrollIntoViewIfNeeded();
    const certs = page.locator('.cert-card');
    await expect(certs).toHaveCount(14);
  });

  test('footer shows name and social links', async ({ page }) => {
    await page.locator('.footer').scrollIntoViewIfNeeded();
    await expect(page.locator('.footer-title')).toContainText('José Auyón');
    const socials = page.locator('.footer-socials a');
    await expect(socials).toHaveCount(3);
  });
});

test.describe('Responsive', () => {
  test('mobile viewport shows bottom dot nav', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const dotNav = page.locator('.dot-nav');
    // On mobile, dots should be at bottom (flex-direction: row)
    await expect(dotNav).toBeVisible();
  });
});
