import { test as base, expect } from '@playwright/test';
import { BuyProductPage } from '../pom/pages/buy-product/buyProduct.page';
import { CheckoutPage } from '../pom/CheckoutPage';
import { EStoreIdentificationPage } from '../pom/eStoreIdentificationPage';
import { SignInPupUp } from '../pom/pop-ups/SignInPupUp';
import { JETBRAINS_CONSENT_COOKIE } from '../configs/cookie.config';
import { Adyen } from '../pom/components/Adyen';
import { Header } from '../pom/components/header/header.page';

type PomFixtures = {
  header: Header;
  buyProductPage: BuyProductPage; 
  eStoreIdentificationPage: EStoreIdentificationPage;
  checkoutPage: CheckoutPage;
  signInPupUp: SignInPupUp;
  adyen: Adyen;
};

/** Extends the base 'test' with custom fixtures */ 
export const test = base.extend<PomFixtures>({

  page: async ({ browser }, use) => {
    // Create new browser context for each test for isolation
    const context = await browser.newContext();
    await context.addCookies([JETBRAINS_CONSENT_COOKIE]);
    
    // Create a new page within the configured context
    const page = await context.newPage();
    await use(page); // Pass extended instance to test
    await context.close();
  },

  // executes when test asks for 'header'.
  header: async ({ page }, use) => {
    const header = new Header(page);
    await use(header); // Pass the instance to test
  },

  buyProductPage: async ({ page }, use) => {
    const buyProductPage = new BuyProductPage(page);
    await use(buyProductPage);
  },

  eStoreIdentificationPage: async ({ page }, use) => {
    const eStoreIdentificationPage = new EStoreIdentificationPage(page);
    await use(eStoreIdentificationPage); 
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  signInPupUp: async ({ page }, use) => {
    const signInPupUp = new SignInPupUp(page);
    await use(signInPupUp);
  },

  adyen: async ({ page }, use) => {
    const adyen = new Adyen(page);
    await use(adyen);
  },
});

// Re-export 'expect'
export { expect };