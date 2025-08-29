import { test } from "../../fixtures/page.fixtures";
import { allure } from "allure-playwright";
import { ProductName } from "../../enums/product.enum";

const testSuiteName = 'Plan and Subscription';
const scenarioDescription = `
    - Verify header components of 'Buy product' page
        - JB Logo 
        - Product title
        - Menu & menu items
        - Buttons (Pricing & Download)
    - TBD { Verify other components presence on the page (e.g. FAQ, Contact Us) }
    - TBD { Verify footer }
    NOTE: The test uses Soft assertions
`;

const productNames = [
    ProductName.INTELLIJ,
    ProductName.CLION,
    ProductName.RUSTROVER
];

productNames.forEach(productName => {
    test(`Buy Page: ${productName} secondary components verification`, async ({ header, buyProductPage }) => {
        allure.suite(testSuiteName);
        await allure.description(scenarioDescription);        
        await buyProductPage.navigateToProduct(productName);

        await allure.step("Verify header components", async () => {
            await header.assert.headerIsDisplayed();
            await header.assert.jetbrainsLogoIsDisplayed();
            await header.assert.productTitleText(productName);
            await header.assert.idesTagIsDisplayed();
            await header.assert.mainMenuIsDisplayed();
            await header.assert.menuItemsAreDisplayed();
            // TBD { assert 'pricing' and 'download' elements on header }
        });
        // TBD { assert other componets presence on page (e.g. FAQ, Contact Us) }
        // TBD { assert footer }
    });
});