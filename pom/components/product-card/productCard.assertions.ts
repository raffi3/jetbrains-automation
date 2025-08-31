import { type Locator } from '@playwright/test';
import { cardSelectors } from './productCard.selectors';
import { BaseAssertions } from '../../../helpers/BaseAssertions';
import { DataConverter } from '../../../helpers/DataConverter';
import { UserType } from '../../../enums/user.enum';
import { BillingCycle } from '../../../enums/billing.enum';
import { ProductName } from '../../../enums/product.enum';
import { expectedData } from '../../../test-data/expected.data';
import { allure } from 'allure-playwright';

export class ProductCardAssertions {
    private readonly cardLocator: Locator;
    private readonly sku: string;

    constructor(cardLocator: Locator, sku: string) {
        this.cardLocator = cardLocator;
        this.sku = sku;
    }

    private async softAssertCardComponentIsVisible(locator: Locator, componentName: string): Promise<void> {
        await allure.step(`Assert Card - ${componentName} is visible`, async () => {
            const reportDescription = `Card '${componentName}' for product sku: "${this.sku}"`;
            await BaseAssertions.softAssertElementToBeVisible(locator, reportDescription);
        });
    }

    public async title(productName: ProductName): Promise<this> {
        await allure.step(`Assert Card Title`, async () => {
            const titleLocator = this.cardLocator.locator(cardSelectors.title);
            await this.softAssertCardComponentIsVisible(titleLocator, 'Title');
            
            const actualTitle = (await titleLocator.innerText()).toLowerCase();
            const expectedTitle = productName.toLowerCase();
            BaseAssertions.softAssertToContain(actualTitle, expectedTitle, `Card Title for product sku: "${this.sku}"`);
        });
        return this; // Return this for chaining assertions
    }

    public async description(): Promise<this> {
        await allure.step(`Assert Card Description`, async () => {
            const descriptionLocator = this.cardLocator.locator(cardSelectors.description);
            await this.softAssertCardComponentIsVisible(descriptionLocator, 'Description');
            
            const textLength = (await descriptionLocator.innerText()).trim().length;
            BaseAssertions.softAssertToBeGreaterThan(textLength, 0, `Card Description for product sku: "${this.sku}" should not be empty`);
        });
        return this;
    }

    private async superchargeComponentsVisibility(components: { [key: string]: Locator }): Promise<void> {
        await allure.step('Assert Card Supercharge components are visible', async () => {
            for (const [componentName, componentLocator] of Object.entries(components)) {
                await this.softAssertCardComponentIsVisible(componentLocator, componentName);
            }
        });
    }
    
    private async superchargeToolName(toolNameLocator: Locator): Promise<void> {
        await allure.step('Assert Card Supercharge Tool name to be correct', async () => {
            const actualToolName = await toolNameLocator.innerText();
            const expectedToolName = expectedData.components.productCard.superchargeTool.nameUiDisplay;
            BaseAssertions.softAssertToContain(actualToolName, expectedToolName, `Supercharge tool name on product card with sku: "${this.sku}"`);
        });
    }
    
    private async superchargePrice(priceLocator: Locator, expectedPrice: number): Promise<void> {
        await allure.step('Assert Card Supercharge price', async () => {
            const priceText = await priceLocator.innerText();
            const priceValue = DataConverter.removeCurrencySymbol(priceText);
            BaseAssertions.softEqual(priceValue, expectedPrice, `Supercharge price on product card with sku: "${this.sku}"`);
        });
    }
    
    public async superchargeComponents(superchargeExpectedPrice: number): Promise<this> {
        const components = {
            "supercharge_checkbox": this.cardLocator.locator(cardSelectors.supercharge.checkbox),
            "supercharge_tool_name": this.cardLocator.locator(cardSelectors.supercharge.toolName),
            "supercharge_price": this.cardLocator.locator(cardSelectors.supercharge.price),
        };
        await this.superchargeComponentsVisibility(components);
        await this.superchargeToolName(components.supercharge_tool_name);
        await this.superchargePrice(components.supercharge_price, superchargeExpectedPrice);
        
        return this;
    }

    public async priceTitle(userType: UserType, billingCycle: BillingCycle): Promise<this> {
        await allure.step('Assert Card Price Title (label) is correct and visible', async () => {
            const priceTitleLocator = this.cardLocator.locator(`${cardSelectors.price.block} ${cardSelectors.price.priceTitle}`);
            await this.softAssertCardComponentIsVisible(priceTitleLocator, 'Price Title');
            
            const prefix = userType === UserType.ORGANIZATION ? 'per user, ' : '';
            const cycleText = billingCycle === BillingCycle.MONTHLY ? 'per month' : 'per year';
            const expectedTitle = prefix + cycleText;

            const actualTitle = (await priceTitleLocator.innerText()).trim().toLowerCase();
            BaseAssertions.softAssertToContain(actualTitle, expectedTitle, `Card Price Title for product sku: "${this.sku}"`);
        });
        return this;
    }

    public async allProductsPackTools(): Promise<this> {
        await allure.step('Assert "All Products Pack" card element displaying tools is visible', async () => {
            const collapseLocator = this.cardLocator.locator(cardSelectors.allToolsCollapse);
            await BaseAssertions.softAssertElementToBeVisible(collapseLocator, 'All tools description element on "All products pack" card');
        });
        return this;
    }

    public async getQuoteLink(): Promise<this> {
        await allure.step('Assert Card Get Quote link is visible', async () => {
            const getQuoteLocator = this.cardLocator.locator(cardSelectors.links.getQuote);
            await this.softAssertCardComponentIsVisible(getQuoteLocator, 'Get Quote Link');
        });
        return this;
    }

    public async LearnMoreLink(): Promise<this> {
        await allure.step('Assert Card Get Quote link is visible', async () => {
            const selector = `${cardSelectors.price.block} ${cardSelectors.links.learnMore}`;
            const learnMoreLocator = this.cardLocator.locator(selector);
            await this.softAssertCardComponentIsVisible(learnMoreLocator, 'Learn More Link');
        });
        return this;
    }
}