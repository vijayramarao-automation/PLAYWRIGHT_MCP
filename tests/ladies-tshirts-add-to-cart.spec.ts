import { test, expect } from '@playwright/test';

test('Add Women\'s Android Heart T-Shirt to cart and verify it is present', async ({ page }) => {
  await page.goto('https://shop.polymer-project.org/');

  // Navigate to Ladies T-shirts
  await page.locator('a[href="/list/ladies_tshirts"]').first().click();

  // Verify the product is listed and select it
  const productLink = page.getByRole('link', { name: /Women's Android Heart T-Shirt/i });
  await expect(productLink).toBeVisible();
  await productLink.click();

  // Add the product to the cart
  await page.getByRole('button', { name: /Add this item to cart/i }).click();

  // View cart and verify the selected item is available
  await page.locator('a#viewCartAnchor').click();
  await page.waitForURL(/\/cart/);
  await expect(page.getByRole('link', { name: /Women's Android Heart T-Shirt/i }).first()).toBeVisible();
});
