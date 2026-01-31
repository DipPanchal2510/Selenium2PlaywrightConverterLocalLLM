# SOP: Selenium Java to Playwright TS Conversion

## Input
- Selenium Java Code (TestNG based)

## Output
- Playwright TypeScript Code

## Mapping Rules (Standard)
1. **Annotations:**
   - `@Test` -> `test('name', async ({ page }) => { ... })`
   - `@BeforeMethod` -> `test.beforeEach(...)`
   - `@AfterMethod` -> `test.afterEach(...)`
   - `@BeforeClass` -> `test.beforeAll(...)`
   - `@AfterClass` -> `test.afterAll(...)`

2. **Selectors:**
   - `By.id("foo")` -> `#foo`
   - `By.className("bar")` -> `.bar`
   - `By.xpath("//div")` -> `xpath=//div`

3. **Actions:**
   - `driver.get(url)` -> `await page.goto(url)`
   - `element.click()` -> `await page.locator(selector).click()`
   - `element.sendKeys(text)` -> `await page.locator(selector).fill(text)`

4. **Assertions:**
   - `Assert.assertEquals(a, b)` -> `expect(a).toBe(b)`
   - `Assert.assertTrue(x)` -> `expect(x).toBeTruthy()`

## LLM Instructions (Qwen2.5-Coder)
- Extract the test logic and structure.
- Generate valid Playwright TypeScript code.
- Ensure all browser actions are `await`ed.
- Wrap tests in `test.describe` if a class is present.
- Use `page` fixture for browser interactions.
