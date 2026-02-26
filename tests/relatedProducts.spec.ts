import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import testData from '../test-data/relatedProductsData.json';

test.describe('Related Products Validation', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
  });

  testData.products.forEach((product) => {
    test(`Verify related products for ${product.name}`, async () => {
      await productPage.navigateToProduct(product.url);

      const relatedProductsCount = await productPage.getRelatedProductsCount();
      
      // Rule 3 & 4: Maximum 6 products, or fewer if available
      expect(relatedProductsCount).toBeLessThanOrEqual(product.maxRelatedProducts);
      expect(relatedProductsCount).toBeGreaterThanOrEqual(0);

      if (relatedProductsCount > 0) {
        const mainPrice = await productPage.getMainProductPrice();

        // Validate each related product
        for (let i = 0; i < relatedProductsCount; i++) {
          const relatedPrice = await productPage.getRelatedProductPrice(i);
          
          // Rule 2: Price range validation (±20%)
          const isInRange = productPage.isPriceInRange(mainPrice, relatedPrice, product.priceTolerancePercentage);
          expect(isInRange).toBeTruthy();
        }
      }
    });
  });

  test('Verify related products section visibility', async () => {
    const product = testData.products[0];
    await productPage.navigateToProduct(product.url);
    
    const isSectionVisible = await productPage.isRelatedProductsSectionVisible();
    expect(isSectionVisible).toBeTruthy();
  });

  test('Verify clicking related product navigates correctly', async () => {
    const product = testData.products[0];
    await productPage.navigateToProduct(product.url);
    
    const relatedProductsCount = await productPage.getRelatedProductsCount();
    
    if (relatedProductsCount > 0) {
      const initialUrl = productPage.page.url();
      await productPage.clickRelatedProduct(0);
      
      // Rule 6: Navigation validation
      const newUrl = productPage.page.url();
      expect(newUrl).not.toBe(initialUrl);
    }
  });

  test('Verify fallback message on API failure', async () => {
    const product = testData.products.find(p => p.testFallback);
    
    if (product) {
      // Simulate API failure
      await productPage.page.route('**/api/related-products*', route => route.abort());
      await productPage.navigateToProduct(product.url);
      
      // Rule 5: Graceful fallback
      const isFallbackVisible = await productPage.isFallbackMessageVisible();
      expect(isFallbackVisible).toBeTruthy();
    }
  });
});
