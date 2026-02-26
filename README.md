# Playwright Automation Framework - Related Products Testing

## 📋 Project Overview

This is a professional test automation framework built with **Playwright** and **TypeScript** to validate the "Related Products" functionality on e-commerce product detail pages. The framework follows industry best practices including Page Object Model (POM), data-driven testing, and comprehensive reporting.

**Target Application:** E-commerce product pages (e.g., eBay wallet products)  
**Framework:** Playwright + TypeScript  
**Design Pattern:** Page Object Model (POM)

---

## 🎯 Business Rules Covered

| Rule | Description | Status |
|------|-------------|--------|
| **Rule 1** | Related products must belong to the same category as the main product | Implemented |
| **Rule 2** | Related products must fall within ±20% of the main product price | Implemented |
| **Rule 3** | Maximum of 6 related products should be displayed | Implemented |
| **Rule 4** | If fewer than 6 products exist, display only available ones | Implemented |
| **Rule 5** | If API fails, display a graceful fallback message | Implemented |
| **Rule 6** | Clicking a related product should navigate to that product page | Implemented |

---

## 🏗️ Framework Architecture

```
  Test Layer      ->  Page Object Layer   ->   Data Layer 
```

**Key Design Principles:**
- **Separation of Concerns:** Test logic, page interactions, and test data are completely separated
- **Reusability:** Page objects can be reused across multiple test suites
- **Maintainability:** Changes to UI require updates only in page objects
- **Scalability:** Easy to add new test cases and page objects

---

## 📁 Folder Structure

```
Automation/
│
├── pages/                          # Page Object Models
│   └── ProductPage.ts              # Product page interactions & locators
│
├── tests/                          # Test specifications
│   └── relatedProducts.spec.ts     # Related products test suite
│
├── test-data/                      # Test data files
│   └── relatedProductsData.json    # Parameterized test data
│
├── utils/                          # Utility functions (future use)
│
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

**Generated Folders (after test execution):**
- `playwright-report/` - HTML test reports
- `test-results/` - Screenshots, videos, traces

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** v16 or higher
- **npm** or **yarn**

### Installation Steps

1. **Clone/Download the project**
   ```bash
   cd Automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Verify installation**
   ```bash
   npx playwright --version
   ```

---

## ▶️ How to Run Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test relatedProducts.spec.ts
```

### Run with UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Run Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Run with Debug Mode
```bash
npx playwright test --debug
```

---

## 📊 Reporting Details

### HTML Report
After test execution, view the HTML report:
```bash
npx playwright show-report
```

**Report includes:**
- Test execution summary
- Pass/Fail status for each test
- Screenshots on failure
- Video recordings on failure
- Execution time and retry information

### JSON Report
Located at: `test-results/results.json`  
Useful for CI/CD integration and custom reporting.

### Artifacts on Failure
- **Screenshots:** Captured automatically on test failure
- **Videos:** Recorded for failed tests
- **Traces:** Available on first retry for debugging

---

## ⚙️ Environment Configuration

### Base URL Configuration

**Option 1: Environment Variable**
```bash
# Windows
set BASE_URL=https://www.ebay.com
npx playwright test

# Linux/Mac
export BASE_URL=https://www.ebay.com
npx playwright test
```

**Option 2: Update playwright.config.ts**
```typescript
use: {
  baseURL: 'https://your-site.com',
  // ...
}
```

### Test Data Configuration

Edit `test-data/relatedProductsData.json`:
```json
{
  "products": [
    {
      "name": "Product Name",
      "url": "/itm/product-url",
      "maxRelatedProducts": 6,
      "priceTolerancePercentage": 0.2,
      "testFallback": false
    }
  ]
}
```

**Parameters:**
- `maxRelatedProducts`: Maximum expected products (default: 6)
- `priceTolerancePercentage`: Price range tolerance (0.2 = ±20%)
- `testFallback`: Enable/disable API failure testing

---

## 🔄 CI/CD Integration

Framework is CI-ready with:
- Retry logic (2 retries in CI environment)
- Parallel execution disabled in CI for stability
- JSON report generation for pipeline integration
- Environment-based configuration

**Example GitHub Actions:**
```yaml
- name: Run Playwright Tests
  run: npx playwright test
  env:
    BASE_URL: ${{ secrets.BASE_URL }}
```

---

## 🔮 Future Improvements

- [ ] Add API testing layer for related products endpoint
- [ ] Implement custom utility functions in `/utils`
- [ ] Add visual regression testing
- [ ] Integrate with test management tools (TestRail, Xray)
- [ ] Add performance testing for page load times
- [ ] Implement parallel execution optimization
- [ ] Add accessibility testing (axe-core integration)
- [ ] Create reusable component library for common UI elements

---

## 📝 Notes & Assumptions

### Assumptions
1. Related products section uses standard HTML structure with identifiable selectors
2. Price format is consistent across products (currency symbols handled)
3. Category information is available in breadcrumb or product metadata
4. API endpoint for related products follows pattern: `**/api/related-products*`

### Known Limitations
1. Locators may need adjustment based on actual application structure
2. Price extraction assumes standard numeric formats
3. Category validation requires accessible category metadata

### Test Data
- Test data uses eBay-style product URLs as examples
- URLs are relative paths that combine with `baseURL`
- Replace with actual product URLs for real testing

---

## 👤 Author

**QA Assessment Project**  
Akitha Randira

---

## 📄 License

This project is created for assessment purposes.
