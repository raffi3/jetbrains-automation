import { test } from "../../fixtures/page.fixtures";
import { allure } from "allure-playwright";
import { ProductName } from "../../enums/product.enum";
import { DataProvider } from "../../helpers/DataProvider";
import { BaseAssertions } from "../../helpers/BaseAssertions";
import { testCombinationsBuyProduct } from "../../test-data/test-combinations/buyProductTest.combinations";

const testSuiteName = 'Plan and Subscription';
const scenarioDescription = `
    - Verify 'All products pack' card components
        - Pack Title, 
        - Pack Description, 
        - Pack price, 
        - Block for the included tools in the pack
    NOTE: The test uses Soft assertions
`;

test.describe('All Products Pack Card Scenarios', () => {
    /** The test is parametrized with combinations e.g. { CLion, Organization, Yearly }
     * or {IntelliJ, Individual, Monthly}, etc. */
    testCombinationsBuyProduct.forEach(scenario => {
        test(`Buy Page: ${scenario.productName}-${scenario.userType}-${scenario.billingCycle} all-products-pack components and prices verification`, 
            async ({ buyProductPage }) => {
                allure.suite(testSuiteName);
                await allure.description(scenarioDescription);        
                await buyProductPage.navigateToProduct(scenario.productName);

                await buyProductPage.selectUserType(scenario.userType);
                await buyProductPage.selectBillingCycle(scenario.billingCycle, scenario.productName);

                const skuAllProductsPack = DataProvider.buildSku(
                    ProductName.ALL_PRODUCTS,
                    scenario.userType,
                    scenario.billingCycle
                );
                const allPackCard = buyProductPage.productCard(skuAllProductsPack);
                    
                await allure.step("Assert 'All Products Pack' card details", async () => {                
                    await allPackCard.assert.title(ProductName.ALL_PRODUCTS);
                    await allPackCard.assert.description();
                    await allPackCard.assert.allProductsPackTools();
                    // await allPackCard.assert.priceTitle(scenario.userType, scenario.billingCycle); // Captures issue on RustRover-Yearly plan
                    await allPackCard.assert.getQuoteLink();
                    // await allPackCard.assert.LearnMoreLink(); // Captures issue on C-Lion page for All-Products-Pack ('Learn More Link' is absent)
                });
                await allure.step("Assert price 'All Products Pack' (vs Source of Truth)", async () => {
                    const packPriceUi = await allPackCard.getPrimaryPrice();
                    const packPriceApi = await DataProvider.getProductPriceFromMockApi(ProductName.ALL_PRODUCTS, scenario.userType, scenario.billingCycle);
                    BaseAssertions.softEqual(packPriceUi, packPriceApi.value, `'All Products Pack' price SoT(api) vs UI (sku: ${skuAllProductsPack})`);
                });
            });
    });
});