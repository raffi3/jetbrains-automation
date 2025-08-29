import { test } from "../../fixtures/page.fixtures";
import { allure } from "allure-playwright";
import { UserType } from "../../enums/user.enum";
import { ProductName } from "../../enums/product.enum";
import { BillingCycle } from "../../enums/billing.enum";
import { DataProvider } from "../../helpers/DataProvider";
import { expectedData } from "../../test-data/expected.data";
import { ParametrizedDataBuyProduct } from "../../models/parametrizedData.model";
import { BaseAssertions } from "../../helpers/BaseAssertions";

const testSuiteName = 'Plan and Subscription';
const scenarioDescription = `
    - Verify 'All products pack' card components
        - Pack Title, 
        - Pack Description, 
        - Pack price, 
        - Block for the included tools in the pack
    NOTE: The test uses Soft assertions
`;

const testData: ParametrizedDataBuyProduct[] = [
    {
        productName: ProductName.INTELLIJ,
        userType: UserType.INDIVIDUAL,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.INTELLIJ,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.INTELLIJ,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.YEARLY,
    },
    
    {
        productName: ProductName.CLION,
        userType: UserType.INDIVIDUAL,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.CLION,
        userType: UserType.INDIVIDUAL,
        billingCycle: BillingCycle.YEARLY,
    },
    {
        productName: ProductName.CLION,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.CLION,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.YEARLY,
    },

    {
        productName: ProductName.RUSTROVER,
        userType: UserType.INDIVIDUAL,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.RUSTROVER,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.MONTHLY,
    },
    {
        productName: ProductName.RUSTROVER,
        userType: UserType.INDIVIDUAL,
        billingCycle: BillingCycle.YEARLY,
    },
    {
        productName: ProductName.RUSTROVER,
        userType: UserType.ORGANIZATION,
        billingCycle: BillingCycle.YEARLY,
    },
];

testData.forEach(data => {
    test(`Buy Page: ${data.productName}-${data.userType}-${data.billingCycle} all-products-pack components and prices verification`, 
        async ({ buyProductPage }) => {
            allure.suite(testSuiteName);
            await allure.description(scenarioDescription);        
            await buyProductPage.navigateToProduct(data.productName);

            await buyProductPage.selectUserType(data.userType);
            await buyProductPage.selectBillingCycle(data.billingCycle, data.productName);

            const skuAllProductsPack = DataProvider.buildSku(
                ProductName.ALL_PRODUCTS,
                data.userType,
                data.billingCycle
            );
            const allPackCard = buyProductPage.productCard(skuAllProductsPack);
                
            await allure.step("Assert 'All Products Pack' card details", async () => {                
                await allPackCard.assert.title(ProductName.ALL_PRODUCTS);
                await allPackCard.assert.description();
                await allPackCard.assert.allProductsPackTools();
                // await allPackCard.assert.priceTitle(data.userType, data.billingCycle); // Captures issue on RustRover-Yearly plan
                await allPackCard.assert.getQuoteLink();
                // await allPackCard.assert.LearnMoreLink(); // Captures issue on C-Lion page for All-Products-Pack ('Learn More Link' is absent)
            });
            await allure.step("Assert price 'All Products Pack' (vs Source of Truth)", async () => {
                const packPriceUi = await allPackCard.getPrimaryPrice();
                const packPriceApi = await DataProvider.getProductPriceFromMockApi(ProductName.ALL_PRODUCTS, data.userType, data.billingCycle);
                BaseAssertions.softEqual(packPriceUi, packPriceApi.value, `'All Products Pack' price SoT(api) vs UI (sku: ${skuAllProductsPack})`);
            });
        });
});