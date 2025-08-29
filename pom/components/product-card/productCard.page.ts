import { Locator } from '@playwright/test';
import { allure } from 'allure-playwright';
import { cardSelectors } from './productCard.selectors';
import { DataConverter } from '../../../helpers/DataConverter';
import { ProductCardAssertions } from './ProductCard.assertions';

export class ProductCard {
    private readonly cardLocator: Locator;
    public readonly assert: ProductCardAssertions;
    private readonly sku: string;

    constructor(cardLocator: Locator, sku: string) {
        this.cardLocator = cardLocator;
        this.sku = sku;
        this.assert = new ProductCardAssertions(this.cardLocator, this.sku);
    }

    public async getPrimaryPrice(): Promise<number> {
        return await allure.step(`Get the primary price from product card`, async () => {
            const priceLocator = this.cardLocator.locator(`${cardSelectors.price.block} ${cardSelectors.price.productPrice}`);
            const priceText = await priceLocator.innerText();
            return DataConverter.removeCurrencySymbol(priceText);
        });
    }

    public async getPriceWithSupercharge(): Promise<number> {
        return await allure.step(`Get price from product card when Supercharge is enabled`, async () => {
            const priceLocator = this.cardLocator.locator(`${cardSelectors.price.block} ${cardSelectors.price.productPrice}`); 
            const priceText = await priceLocator.innerText();
            return DataConverter.removeCurrencySymbol(priceText);
        });
    }
    
    public async selectSupercharge(): Promise<void> {
        await allure.step(`Select Supercharge Checkbox`, async () => {
            await this.cardLocator.locator(cardSelectors.supercharge.checkbox).check();
        });
    }

    public async clickBuyButton(): Promise<void> {
        await allure.step(`Click Buy button on product card`, async () => {
            await this.cardLocator.locator(cardSelectors.buyButton).click();
        });
    }
}