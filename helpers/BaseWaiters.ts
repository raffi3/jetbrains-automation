import { Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export class BaseWaiters {
    public static async softWaitElementToBeVisible(
        locator: Locator, 
        elementName: string, 
        timeout: number = 2000
    ): Promise<boolean> {
        return await allure.step(
            'BaseWaiters: Soft wait element to be visible (without throwing exception)', 
            async() => {
                try {
                    await locator.waitFor({timeout: timeout});
                    return true;
                } catch (error) {
                    const errorMsg = `softWaitElementToBeVisible '${elementName}'. 
                    Element is not visible after ${timeout}ms:\n${error}`;
                    allure.logStep(errorMsg);
                    console.info(errorMsg);
                    return false;
                }
            });
    }
}
