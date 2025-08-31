/* Mock API simulating fetch product pricing data.*/
import { ProductName } from "../../enums/product.enum";

export interface PriceInfo {
    currency: string;
    value: number;
}

interface BillingCyclePrices {
    Yearly: { price: PriceInfo };
    Monthly: { price: PriceInfo };
}

interface LicensePrices {
    Organization: BillingCyclePrices;
    Individual: BillingCyclePrices;
}

type ProductData = {
    [key in ProductName]: LicensePrices;
};

const productPriceDataMock: ProductData = {
    [ProductName.INTELLIJ]: {
        Organization: {
            Yearly: { price: { currency: 'USD', value: 599.00 } },
            Monthly: { price: { currency: 'USD', value: 59.90 } },
        },
        Individual: {
            Yearly: { price: { currency: 'USD', value: 169.00 } },
            Monthly: { price: { currency: 'USD', value: 16.90 } },
        },
    },
    [ProductName.CLION]: {
        Organization: {
            Yearly: { price: { currency: 'USD', value: 229.00 } },
            Monthly: { price: { currency: 'USD', value: 22.90 } },
        },
        Individual: {
            Yearly: { price: { currency: 'USD', value: 99.00 } },
            Monthly: { price: { currency: 'USD', value: 9.90 } },
        },
    },
    [ProductName.RUSTROVER]: {
        Organization: {
            Yearly: { price: { currency: 'USD', value: 229.00 } },
            Monthly: { price: { currency: 'USD', value: 22.90 } },
        },
        Individual: {
            Yearly: { price: { currency: 'USD', value: 69.00 } },
            Monthly: { price: { currency: 'USD', value: 6.90 } },
        },
    },
    [ProductName.ALL_PRODUCTS]: {
        Organization: {
            Yearly: { price: { currency: 'USD', value:  779.00 } },
            Monthly: { price: { currency: 'USD', value: 77.90 } },
        },
        Individual: {
            Yearly: { price: { currency: 'USD', value: 289.00 } },
            Monthly: { price: { currency: 'USD', value: 28.90 } },
        },
    },
    [ProductName.AI_PRO]: {
        Organization: {
            Yearly: { price: { currency: 'USD', value: 200.00 } },
            Monthly: { price: { currency: 'USD', value: 20.00 } },
        },
        Individual: {
            Yearly: { price: { currency: 'USD', value: 100.00 } },
            Monthly: { price: { currency: 'USD', value: 10.00 } },
        },
    },
};

/**
 * Fetches product price MOCK data.
 * @returns promise that resolves with the productPriceDataMock object.
 */
export const fetchProductPricesMock = (): Promise<ProductData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(productPriceDataMock);
        }, 100);
    });
};
