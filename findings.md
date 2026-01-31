# Findings - Selenium Java to Playwright (JS/TS) Converter

## Research & Discoveries
- Project Goal: Convert Selenium Java (TestNG) to Playwright JS/TS.
- Methodology: B.L.A.S.T. Protocol with A.N.T. 3-layer architecture.
- Source: Web UI Input.
- Target: Local directory + UI Display.

## Constraints
- Must be deterministic and self-healing.
- Must not guess at business logic.
- Must "Convert Everything" - implying full support for Selenium commands and TestNG annotations.

## Resources to Explore
- [Playwright Migration Guide](https://playwright.dev/docs/intro)
- TestNG vs Playwright Test hooks.

## API Mapping Table (Selenium Java -> Playwright JS/TS)

| Selenium (Java) | Playwright (TS) | Notes |
| :--- | :--- | :--- |
| `driver.get(url)` | `await page.goto(url)` | Async |
| `findElement(By.id("..."))` | `page.locator("#...")` | Locator based |
| `findElement(By.cssSelector("..."))` | `page.locator("...")` | |
| `findElement(By.xpath("..."))` | `page.locator("xpath=...")` | |
| `element.click()` | `await element.click()` | |
| `element.sendKeys("...")` | `await element.fill("...")` | |
| `driver.getTitle()` | `await page.title()` | |
| `Assert.assertEquals(a, b)` | `expect(a).toBe(b)` | |
| `@Test` | `test('name', async ({ page }) => { ... })` | |
| `@BeforeMethod` | `test.beforeEach(async ({ page }) => { ... })` | |
| `@AfterMethod` | `test.afterEach(async ({ page }) => { ... })` | |
| `WebDriverWait` | `page.waitForSelector` / Auto-wait | Playwright auto-waits |

## Framework Mapping
- **TestNG Classes** -> Playwright `.spec.ts` files.
- **TestNG Annotations** -> Playwright Test hooks.
- **Page Object Model** -> Playwright Page Objects (Class based).
