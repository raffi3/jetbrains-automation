import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';
import { ProductCard } from '../../components/product-card/productCard.page';
import { buySelectors } from './buyProduct.selectors';
import { ProductName } from '../../../enums/product.enum';
import { UserType } from '../../../enums/user.enum';
import { DataProvider } from '../../../helpers/DataProvider';
import { BillingCycle } from '../../../enums/billing.enum';
import { BuyPageAssertions } from './buyProduct.assertions';

export class BuyProductPage {
    protected readonly page: Page;
    public readonly assert: BuyPageAssertions;

    // Locators
    private readonly measureSwitcherOption: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.assert = new BuyPageAssertions(page);
        this.measureSwitcherOption = page.locator(buySelectors.measureSwitcherOption);
    }

    private getProductCardLocator(sku: string): Locator {
        return this.page.locator(buySelectors.getProductCardBySku(sku));
    }

    private getProductCardSuperchargeLocator(): Locator {
        return this.page.locator(buySelectors.getProductCardSupercharge());
    }

    /**
     * Returns a ProductCard component object to interact with a specific card.
     * @param sku The SKU of the product card.
     * @returns A new ProductCard instance.
     */
    public productCard(sku: string): ProductCard {
        return new ProductCard(this.getProductCardLocator(sku), sku);
    }
    
    /**
     * Returns a ProductCard with Supercharge enabled (Card locator is different this time as HTML changes, app treats this as a different card).
     * @param sku The SKU of the product card.
     * @returns A new ProductCard instance.
     */
    public productCardSupercharge(sku: string): ProductCard {
        return new ProductCard(this.getProductCardSuperchargeLocator(), sku);
    }

    private getBillingCycleLocator(billingCycle: BillingCycle, productName: ProductName): Locator {
        const productConfig = DataProvider.getProductConfig(productName);
        const isPresentedAsRadioBtn = productConfig.buyPageOptions.isBillingOptionPresentedAsRadioBtn;
        
        return isPresentedAsRadioBtn
                ? this.page.locator(buySelectors.getBillingCycleRadioSelector(billingCycle))
                : this.measureSwitcherOption.locator(buySelectors.getBillingCycleSwitcherSelector(billingCycle));
    }

    public async navigateToProduct(productName: ProductName): Promise<void> {
        await allure.step(`Navigate to the Buy page of ${productName}`, async () => {
            const productUrlCode = DataProvider.getProductUrlCode(productName);
            await this.page.goto(`/${productUrlCode}/buy/`);
        });
    }

    public async selectUserType(userType: UserType): Promise<void> {
        await allure.step(`Select user type: ${userType}`, async () => {
            const userTypeSelector = buySelectors.getUserTypeSelector(userType);
            await this.measureSwitcherOption.locator(userTypeSelector).click({ force: true });
        });
    }

    public async selectBillingCycle(billingCycle: BillingCycle, productName: ProductName): Promise<void> {
        await allure.step(`Select billing cycle: ${billingCycle}`, async () => {
            await this.getBillingCycleLocator(billingCycle, productName).first().click({ force: true });
        });
    }
}