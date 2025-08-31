import { type Page, type Locator } from '@playwright/test';
import { buySelectors } from './buyProduct.selectors';
import { BaseAssertions } from '../../../helpers/BaseAssertions';
import { allure } from 'allure-playwright';

export class BuyPageAssertions {
    private readonly page: Page;
    private readonly pageTitile: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.pageTitile = page.locator(buySelectors.pageTitle);
    }

    public async pageTitle(): Promise<void> {
        await allure.step('Assert Page Title', async () => {
            await BaseAssertions.softAssertElementToBeVisible(this.pageTitile, 'Page Title');
            
            const actualTitle = (await this.pageTitile.innerText()).toLowerCase();
            const expectedTitlePattern = new RegExp(/Subscription (Plans|Options and Pricing)/i);
            BaseAssertions.softMatch(actualTitle, expectedTitlePattern, 'Page Title');
        });
    }
}