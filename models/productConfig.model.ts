import { ProductName, ProductSkuCode, ProductUrlCode } from "../enums/product.enum";

interface BuyPageOptions {
    isUserSpecialCategories: boolean;
    isBillingOptionPresentedAsRadioBtn: boolean;
    isYearlyPriceGradualDiscount: boolean;
}

export interface ProductConfigItem {
    name: ProductName;
    skuCode: ProductSkuCode,
    urlCode?: ProductUrlCode,
    buyPageOptions: BuyPageOptions;
}

export type ProductConfig = ProductConfigItem[];
