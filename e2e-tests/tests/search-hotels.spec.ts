import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("Should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("where are you going?").fill("test city");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Hotels found in test city")).toBeVisible();
  await expect(page.getByText("Test Hotel UPDATED")).toBeVisible();
});

test("sould show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("where are you going?").fill("test city");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByText("Test Hotel UPDATED").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});
