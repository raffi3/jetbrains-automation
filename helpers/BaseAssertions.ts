import { Locator, expect } from "@playwright/test";
import { allure } from "allure-playwright";

export class BaseAssertions {
    // Data Assertions
    public static softEqual(actual: unknown, expected: unknown, contextMsg: string) {
        allure.logStep(`BaseAssertions: softEqual(expected: ${expected} to be equal to: ${actual}).`);
        expect.soft(actual, contextMsg).toEqual(expected); 
    }

    public static softAssertToContain(actual: string|number|Array<string|number>, subString: string|number, contextMsg: string) {
        allure.logStep(`BaseAssertions: softAssertToContain(expected: ${subString}, actual: ${actual}).`);
        expect.soft(actual, `${contextMsg}: "${subString}" to be part of "${actual}".`).toContain(subString);
    }

    public static softMatch(value: string|number, regex: RegExp, contextMsg: string) {
        if (typeof value === 'number') value = value.toString();
        allure.logStep(`BaseAssertions: softMatch(expected: ${value} to match regex: ${regex}).`);
        expect.soft(value, contextMsg).toMatch(regex);
    }

    public static softAssertToBeGreaterThan(actual: number, expected: number, contextMsg: string) {
        allure.logStep(`BaseAssertions: softAssertToBeGreaterThan(expected: ${expect}, actual: ${actual})`);
        expect.soft(actual, contextMsg).toBeGreaterThan(expected);
    }

    public static assertValueIsNumeric(value: unknown, contextMsg: string) {
        allure.logStep(`BaseAssertions: assertValueIsNumeric()`);
        expect(value, contextMsg).toEqual(expect.any(Number));
    }
    
    // Element Assertions
    public static async softAssertElementToBeVisible(locator: Locator, elementDescr: string) {
        allure.logStep(`BaseAssertions: softAssertElementToBeVisible()`);
        await expect.soft(locator, `${elementDescr} to be visible on page.`).toBeVisible();
    }

    public static async softAssertElementAttributeToContain(element: Locator, attribute: string, expectedText: string|number, elementName: string) {
        allure.logStep(`BaseAssertions: softAssertElementAttributeToContain()`);
        const elementAttribute =  await element.getAttribute(attribute)
        if (elementAttribute) {
            this.softAssertToContain(elementAttribute, expectedText, elementName);
        } else {
            const error = new Error(`Given attibute "${attribute}" does not exit on element "${elementName}".`);
            console.warn(error.message);
        }
    }
}