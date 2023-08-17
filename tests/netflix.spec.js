const { test, expect } = require("@playwright/test");

// run tests in headful mode so you can see the browser
test.use({ headless: false, slowMo: 1000 });

test("my first test", async ({ page }) => {
  // go to Netflix.com
  await page.goto("https://www.netflix.com");
  // assert page title appears
  // await expect(page.locator('[data-uia="hero-title"]')).toHaveText(
  await expect(page.locator('h1')).toHaveText(
    "Unlimited movies, TV shows, and more"
  );
});

// ADD YOUR TESTS HERE!
// 1. Click on Sign In button
test('sign in', async({ page }) => {
  await page.goto('https://www.netflix.com');
  await page.locator('a[role="button"]:has-text("Sign In")').click();
  await expect(page).toHaveURL('https://www.netflix.com/login');
});

// 2. Fill in credentials and find Sign In button
test('enter credentials', async({ page }) => {
  await page.goto('https://www.netflix.com/login');
  await page.fill("#id_userLoginId", "testemail@gmail.com");
  await page.fill("#id_password", "testpassword");
  await page.waitForSelector('button:has-text("Sign In")');
  await expect(page.locator('button:has-text("Sign In")')).toBeVisible();
  await expect(page.locator('button:has-text("Sign In")')).toHaveCount(1);
});

// 3. Click on Sign In button using wrong password and double check error message
test('invalid email/password combination', async({ page }) => {
  await page.goto('https://www.netflix.com/login');
  await page.fill("#id_userLoginId", "testemail@gmail.com");
  await page.fill("#id_password", "testpassword");
  await page.locator('button:has-text("Sign In")').click();
  await expect(page.locator('text=Incorrect password. Please try again or you can reset your password.')).toBeVisible();
  await expect(page.locator('text=Incorrect password. Please try again or you can reset your password.')).toHaveCount(1);
});

// 4. Click on Sign In button using email not in database and double check error message
test('sign in using email not associated with an account', async({ page }) => {
  await page.goto('https://www.netflix.com/login');
  await page.fill("#id_userLoginId", "374hjfaswqf2fl4ajsd@gmail.com");
  await page.fill("#id_password", "testpassword");
  await page.locator('button:has-text("Sign In")').click();
  await expect(page.locator("text=Sorry, we can't find an account with this email address. Please try again or cre")).toBeVisible();
  await expect(page.locator("text=Sorry, we can't find an account with this email address. Please try again or cre")).toHaveCount(1);
});



// Signing in using incorrect password as one test spec:
// test('sign in with invalid password', async({ page }) => {
//   await page.goto('https://www.netflix.com');
//   await page.locator('a[role="button"]:has-text("Sign In")').click();
//   await page.fill("#id_userLoginId", "testemail@gmail.com");
//   await page.fill("#id_password", "testpassword");  
//   await page.locator('button:has-text("Sign In")').click();
//   await expect(page.locator('text=Incorrect password. Please try again or you can reset your password.')).toBeVisible();
//   await expect(page.locator('text=Incorrect password. Please try again or you can reset your password.')).toHaveCount(1);
// })

// Signing in using an email not associated with an account as one test spec:
// test('sign in with invalid password', async({ page }) => {
//   await page.goto('https://www.netflix.com');
//   await page.locator('a[role="button"]:has-text("Sign In")').click();
//   await page.fill("#id_userLoginId", "374hjfaswqf2fl4ajsd@gmail.com");
//   await page.fill("#id_password", "testpassword");  
//   await page.locator('button:has-text("Sign In")').click();
//   await expect(page.locator("text=Sorry, we can't find an account with this email address. Please try again or cre")).toBeVisible();
//   await expect(page.locator("text=Sorry, we can't find an account with this email address. Please try again or cre")).toHaveCount(1);
// })



// can add a test.beforeAll() hook and/maybe a test.afterAll() hook