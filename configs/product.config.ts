import { ProductName, ProductSkuCode, ProductUrlCode } from "../enums/product.enum";
import { ProductConfig } from "../models/productConfig.model";

export const productConfig: ProductConfig = [
    {
        name: ProductName.INTELLIJ,
        skuCode: ProductSkuCode.INTELLIJ,
        urlCode: ProductUrlCode.INTELLIJ,
        buyPageOptions: {
            isUserSpecialCategories: true,
            isBillingOptionPresentedAsRadioBtn: false,
            isYearlyPriceGradualDiscount: true,
        },
    },
    {
        name: ProductName.CLION,
        skuCode: ProductSkuCode.CLION,
        urlCode: ProductUrlCode.CLION,
        buyPageOptions: {
            isUserSpecialCategories: false,
            isBillingOptionPresentedAsRadioBtn: false,
            isYearlyPriceGradualDiscount: true,
        },
    },
    {
        name: ProductName.RUSTROVER,
        skuCode: ProductSkuCode.RUSTROVER,
        urlCode: ProductUrlCode.RUSTROVER,
        buyPageOptions: {
            isUserSpecialCategories: false,
            isBillingOptionPresentedAsRadioBtn: true,
            isYearlyPriceGradualDiscount: false,
        },
    },
    {
        name: ProductName.ALL_PRODUCTS,
        skuCode: ProductSkuCode.ALL_PRODUCTS,
        buyPageOptions: {
            isUserSpecialCategories: true,
            isBillingOptionPresentedAsRadioBtn: false,
            isYearlyPriceGradualDiscount: true,
        },
    },
];
