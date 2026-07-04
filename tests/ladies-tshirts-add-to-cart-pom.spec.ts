import { test } from '@playwright/test';
import { ShopPage } from './page-models/shop-page';

test('Add Women\'s Android Heart T-Shirt to cart using POM and verify it is present', async ({ page }) => {
  const shopPage = new ShopPage(page);

  await shopPage.gotoHome();
  await shopPage.navigateToLadiesTshirts();
  await shopPage.selectWomenAndroidHeartTShirt();
  await shopPage.addToCart();
  await shopPage.viewCart();
  await shopPage.verifySelectedItemInCart();
});
