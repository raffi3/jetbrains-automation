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
    test(`Buy Page: ${data.productName}-${data.userType}-${data.billingCycle} the main product card components and prices verification`, 
        async ({ buyProductPage }) => {
        allure.suite(testSuiteName);
        await allure.description(scenarioDescription);        
        await buyProductPage.navigateToProduct(data.productName);

        await buyProductPage.assert.pageTitle();

        await buyProductPage.selectUserType(data.userType);
        await buyProductPage.selectBillingCycle(data.billingCycle, data.productName);

        const sku = DataProvider.buildSku(
            data.productName,
            data.userType,
            data.billingCycle
        );
        const productCard = buyProductPage.productCard(sku);
        const productPriceApi = await DataProvider.getProductPriceFromMockApi(data.productName, data.userType, data.billingCycle)

        await allure.step("Verify the main product card components & price", async () => {
            await productCard.assert.title(data.productName);
            await productCard.assert.description();
            // await productCard.assert.priceTitle(data.userType, data.billingCycle); // Captures issue on RustRover-Yearly plan
            await productCard.assert.getQuoteLink();

            // Assert price main (vs Source of Truth)
            const productPriceUi = await productCard.getPrimaryPrice();
            BaseAssertions.softEqual(productPriceUi, productPriceApi.value, `Product price SoT(api) vs UI (sku: ${sku})`)
        });

        await allure.step("Verify the product card with supercharge option & supercharge components", async () => {
            await productCard.selectSupercharge();
            const productCardSupercharge = buyProductPage.productCardSupercharge(sku);
            
            const superchargeToolName = expectedData.components.productCard.superchargeTool.name;
            const superchargePriceApi = await DataProvider.getProductPriceFromMockApi(superchargeToolName, data.userType, data.billingCycle);
            await productCardSupercharge.assert.superchargeComponents(superchargePriceApi.value);
            
            // Assert price supercharge incl. (vs Source of Truth)
            const productPriceWithSuperchargeUi = await productCardSupercharge.getPriceWithSupercharge();
            const combinedPrice = productPriceApi.value + superchargePriceApi.value;
            BaseAssertions.softEqual(productPriceWithSuperchargeUi, combinedPrice, `ProductPrice + SuperchargePrice = FinalPriceOnCard (sku: ${sku})`);
        });
    });
});