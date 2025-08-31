import { allure } from "allure-playwright";

export class DataConverter {
    public static removeCurrencySymbol(priceText: string): number {
        allure.logStep('DataConverter: remove currency symbol from price text.');
        return parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
    }
}