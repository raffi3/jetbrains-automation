import { test } from "../../fixtures/page.fixtures";
import { allure } from "allure-playwright";
import { DataProvider } from "../../helpers/DataProvider";
import { expectedData } from "../../test-data/expected.data";
import { BaseAssertions } from "../../helpers/BaseAssertions";
import { testCombinationsBuyProduct } from "../../test-data/test-combinations/buyProductTest.combinations";

const testSuiteName = 'Plan and Subscription';
const scenarioDescription = `
    - Verify 'Buy product' page title
    - Verify the main product card components
        - Card Title, 
        - Card Description, 
        - Product price,
        - Product price title, 
        - Supercharge with sub-components (price, tool name, checkbox), 
        - Links (get quote, learn more)
    NOTE: The test uses Soft assertions
`;

/** 
 * The Test is parametrized with combinations
 * e.g. { CLion, Organization, Yearly } or {IntelliJ, Individual, Monthly}
*/
testCombinationsBuyProduct.forEach(scenario => {
    test(`Buy Page: ${scenario.productName}-${scenario.userType}-${scenario.billingCycle} the main product card components and prices verification`, 
        async ({ buyProductPage }) => {
        allure.suite(testSuiteName);
        await allure.description(scenarioDescription);        
        await buyProductPage.navigateToProduct(scenario.productName);

        await buyProductPage.assert.pageTitle();

        await buyProductPage.selectUserType(scenario.userType);
        await buyProductPage.selectBillingCycle(scenario.billingCycle, scenario.productName);

        const sku = DataProvider.buildSku(
            scenario.productName,
            scenario.userType,
            scenario.billingCycle
        );
        const productCard = buyProductPage.productCard(sku);
        const productPriceApi = await DataProvider.getProductPriceFromMockApi(scenario.productName, scenario.userType, scenario.billingCycle)

        await allure.step("Verify the main product card components & price", async () => {
            await productCard.assert.title(scenario.productName);
            await productCard.assert.description();
            // await productCard.assert.priceTitle(scenario.userType, scenario.billingCycle); // Captures issue on RustRover-Yearly plan
            await productCard.assert.getQuoteLink();

            // Assert price main (vs Source of Truth)
            const productPriceUi = await productCard.getPrimaryPrice();
            BaseAssertions.softEqual(productPriceUi, productPriceApi.value, `Product price SoT(api) vs UI (sku: ${sku})`)
        });

        await allure.step("Verify the product card with supercharge option & supercharge components", async () => {
            await productCard.selectSupercharge();
            const productCardSupercharge = buyProductPage.productCardSupercharge(sku);
            
            const superchargeToolName = expectedData.components.productCard.superchargeTool.name;
            const superchargePriceApi = await DataProvider.getProductPriceFromMockApi(superchargeToolName, scenario.userType, scenario.billingCycle);
            await productCardSupercharge.assert.superchargeComponents(superchargePriceApi.value);
            
            // Assert price supercharge incl. (vs Source of Truth)
            const productPriceWithSuperchargeUi = await productCardSupercharge.getPriceWithSupercharge();
            const combinedPrice = productPriceApi.value + superchargePriceApi.value;
            BaseAssertions.softEqual(productPriceWithSuperchargeUi, combinedPrice, `ProductPrice + SuperchargePrice = FinalPriceOnCard (sku: ${sku})`);
        });
    });
});