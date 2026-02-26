import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly relatedProductsSection: Locator;
  readonly relatedProductItems: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productCategory: Locator;
  readonly fallbackMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.relatedProductsSection = page.locator('[data-testid="related-products"], .related-products, #related-products').first();
    this.relatedProductItems = this.relatedProductsSection.locator('.item, [data-testid="product-item"], .product-card');
    this.productTitle = page.locator('h1, [data-testid="product-title"]').first();
    this.productPrice = page.locator('[data-testid="price"], .price, .x-price-primary').first();
    this.productCategory = page.locator('[data-testid="category"], .breadcrumb, nav[aria-label="breadcrumb"]').first();
    this.fallbackMessage = this.relatedProductsSection.locator('.fallback, [data-testid="fallback-message"]');
  }

  async navigateToProduct(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async getMainProductPrice(): Promise<number> {
    const priceText = await this.productPrice.textContent();
    return this.extractPrice(priceText || '');
  }

  async getMainProductCategory(): Promise<string> {
    return (await this.productCategory.textContent())?.trim() || '';
  }

  async getRelatedProductsCount(): Promise<number> {
    await this.relatedProductsSection.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    return await this.relatedProductItems.count();
  }

  async getRelatedProductPrice(index: number): Promise<number> {
    const priceElement = this.relatedProductItems.nth(index).locator('.price, [data-testid="price"]').first();
    const priceText = await priceElement.textContent();
    return this.extractPrice(priceText || '');
  }

  async getRelatedProductCategory(index: number): Promise<string> {
    const categoryElement = this.relatedProductItems.nth(index).locator('.category, [data-testid="category"]').first();
    return (await categoryElement.textContent())?.trim() || '';
  }

  async clickRelatedProduct(index: number): Promise<void> {
    await this.relatedProductItems.nth(index).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isRelatedProductsSectionVisible(): Promise<boolean> {
    return await this.relatedProductsSection.isVisible().catch(() => false);
  }

  async isFallbackMessageVisible(): Promise<boolean> {
    return await this.fallbackMessage.isVisible().catch(() => false);
  }

  private extractPrice(priceText: string): number {
    const cleanPrice = priceText.replace(/[^0-9.,]/g, '').replace(',', '');
    return parseFloat(cleanPrice) || 0;
  }

  isPriceInRange(mainPrice: number, relatedPrice: number, tolerance: number = 0.2): boolean {
    const lowerBound = mainPrice * (1 - tolerance);
    const upperBound = mainPrice * (1 + tolerance);
    return relatedPrice >= lowerBound && relatedPrice <= upperBound;
  }
}
