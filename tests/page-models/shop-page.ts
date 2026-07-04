import { expect, Locator, Page } from '@playwright/test';

export class ShopPage {
  readonly page: Page;
  readonly ladiesTshirtsLink: Locator;
  readonly productLink: Locator;
  readonly addToCartButton: Locator;
  readonly viewCartAnchor: Locator;
  readonly cartItemLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ladiesTshirtsLink = page.locator('a[href="/list/ladies_tshirts"]').first();
    this.productLink = page.getByRole('link', { name: /Women's Android Heart T-Shirt/i });
    this.addToCartButton = page.getByRole('button', { name: /Add this item to cart/i });
    this.viewCartAnchor = page.locator('a#viewCartAnchor');
    this.cartItemLink = page.getByRole('link', { name: /Women's Android Heart T-Shirt/i }).first();
  }

  async gotoHome() {
    await this.page.goto('https://shop.polymer-project.org/');
  }

  async navigateToLadiesTshirts() {
    await this.ladiesTshirtsLink.click();
  }

  async selectWomenAndroidHeartTShirt() {
    await expect(this.productLink).toBeVisible();
    await this.productLink.click();
  }

  async addToCart() {
    await expect(this.addToCartButton).toBeVisible();
    await this.addToCartButton.click();
  }

  async viewCart() {
    await this.viewCartAnchor.click();
    await this.page.waitForURL(/\/cart/);
  }

  async verifySelectedItemInCart() {
    await expect(this.cartItemLink).toBeVisible();
  }
}
