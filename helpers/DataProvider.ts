import { allure } from "allure-playwright";
import { ProductName, ProductSkuCode, ProductUrlCode } from "../enums/product.enum";
import { fetchProductPricesMock, PriceInfo } from "../test-data/mock/mock.api";
import { UserType, UserTypeCode } from "../enums/user.enum";
import { BillingCycle, BillingCycleCode } from "../enums/billing.enum";
import { ProductConfigItem } from "../models/productConfig.model";
import { productConfig } from "../configs/product.config";

export class DataProvider {
    /**
     * Finds product configuration from the config file.
     * Throws an error if the product is not found.
     * @param {ProductName} productName - JetBrains product to find.
     * @returns The relevant product object.
     */
    public static getProductConfig(productName: ProductName): ProductConfigItem {
        const productConfiguration = productConfig.find(configItem => configItem.name === productName);
        if (!productConfiguration) {
            throw new Error(`Configuration for product "${productName}" is not found.`);
        }
        return productConfiguration;
    }

    /**
     * Retrieves the URL code (used in URL of product related pages) for a given product name from the configuration.
     * @param {ProductName} productName - JetBrains product name.
     * @returns {ProductUrlCode} e.g. clion
     */
    public static getProductUrlCode(productName: ProductName): ProductUrlCode {
        const productConfig = this.getProductConfig(productName);
        if (!productConfig.urlCode)
            throw new Error(`urlCode property is not defiend for product configuration: ${productName}`);
        return productConfig.urlCode;
    }

    /**
     * Retrieves the User type sku code letter (used to form complete SKU code of a product) for a given product name.
     * @param {UserType} userType - (organziation/individual).
     * @returns {ProductSkuCode} [C - for organziation, P - for individual] 
    */
    public static getUserTypeSkuCode(userType: UserType): UserTypeCode {
        return UserTypeCode[userType.toUpperCase() as keyof typeof UserTypeCode];
    }


    /**
     * Retrieves the Biling syscle sku code letter (used to form complete SKU code of a product) for a given product name.
     * @param {BillingCycle} billingCycle - (yearly/monthly).
     * @returns {BillingCycleCode} [Y - for yearly, M - for monthly] 
    */
    public static getBillingCycleSkuCode(billingCycle: BillingCycle): BillingCycleCode {
        return BillingCycleCode[billingCycle.toUpperCase() as keyof typeof BillingCycleCode];
    }

    /**
     * Retrieves product SKU code letter (used to form complete SKU code of a product) 
     * for a given product name from the configuration.
     * @param {ProductName} productName - JetBrains product name.
     * @returns {ProductSkuCode} e.g. CL (for C-Lion)
     */
    public static getProductSkuCode(productName: ProductName): ProductSkuCode {
        const product = this.getProductConfig(productName);
        return product.skuCode;
    }

    /**
     * Retrieves product SKU code letter (used to form complete SKU code of a product) 
     * for a given product name from the configuration.
     * @param {ProductName} productName - JetBrains product name.
     * @param {UserType} userType - (organziation/individual).
     * @param {BillingCycle} billingCycle - (yearly/monthly).
     * @returns {string} SKU (e.g. C:N:RR:Y)
    */
    public static buildSku(
        productName: ProductName,
        userType: UserType,
        billingCycle: BillingCycle,
    ): string {
        const productCode = this.getProductSkuCode(productName);
        const userTypeCode = this.getUserTypeSkuCode(userType);
        const billingCycleCode = this.getBillingCycleSkuCode(billingCycle);
        console.info('SKU:', `${userTypeCode}:N:${productCode}:${billingCycleCode}`);
        return `${userTypeCode}:N:${productCode}:${billingCycleCode}`;
    }

    /**
     * Gets price (for now from MOCK api) of a product for specified user type and billing cycle e.g. rustrover-idividual-yearly
     * @param {ProductName} productName e.g. CLion
     * @param {UserType} userType e.g. Organization
     * @param {BillingCycle} billingCycle e.g. monthly
     * @returns {PriceInfo} an object representing price info e.g. { currency: 'USD', value: 169.00 }
     */
    public static async getProductPriceFromMockApi(
        productName: ProductName,
        userType: UserType,
        billingCycle: BillingCycle
    ): Promise<PriceInfo> {
        return await allure.step("Fetch API to getProductPrice based on paremeters", async () => {
            const productPricesMock = await fetchProductPricesMock(); // Mock API imitation returning product prices
            return productPricesMock[productName][userType][billingCycle].price;
        });
    }
}