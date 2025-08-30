import { Page, Locator } from '@playwright/test';
import { allure } from 'allure-playwright';
import { headerSelectors } from './header.selectors';
import { BaseAssertions } from '../../../helpers/BaseAssertions';
import { ProductName } from '../../../enums/product.enum';
import { DataProvider } from '../../../helpers/DataProvider';

export class HeaderAssertions {
    private readonly page: Page;

    // Locators declaration
    private readonly headerContainer: Locator;
    private readonly jetbrainsLogo: Locator;
    private readonly productTitle: Locator;
    private readonly productTitleTag: Locator;
    private readonly mainMenu: Locator;
    private readonly menuItems: { [key: string]: Locator };

    constructor(page: Page) {
        this.page = page;

        // Locators init
        this.headerContainer = page.locator(headerSelectors.headerContainer);
        this.jetbrainsLogo = page.locator(headerSelectors.jetbrainsLogo);
        this.productTitle = page.locator(headerSelectors.productTitle);
        this.productTitleTag = page.locator(headerSelectors.productTitleTag);
        this.mainMenu = page.locator(headerSelectors.mainMenu.container);
        
        this.menuItems = {
            ai: page.locator(headerSelectors.mainMenu.ai),
            devTools: page.locator(headerSelectors.mainMenu.devTools),
            teamTools: page.locator(headerSelectors.mainMenu.teamTools),
            education: page.locator(headerSelectors.mainMenu.education),
            solutions: page.locator(headerSelectors.mainMenu.solutions),
            support: page.locator(headerSelectors.mainMenu.support),
            store: page.locator(headerSelectors.mainMenu.store),
        };
    }

    public async headerIsDisplayed(): Promise<void> {
        await allure.step('Assert: Header is displayed', async() => {
            await BaseAssertions.softAssertElementToBeVisible(this.headerContainer, 'Header container');
        });
    }

    public async jetbrainsLogoIsDisplayed(): Promise<void> {
        await allure.step('Assert: JetBrains logo is displayed', async() => {
            await BaseAssertions.softAssertElementToBeVisible(this.jetbrainsLogo, 'Jetbrains logo');
        });
    }

    public async productTitleText(productName: ProductName): Promise<void> {
        await allure.step(`Assert: Product title is correct for "${productName}"`, async() => {
            await BaseAssertions.softAssertElementToBeVisible(this.productTitle, 'Product title');
            
            const actualTitle = (await this.productTitle.innerText()).toLowerCase();
            const expectedTitle = productName.toLowerCase();
            BaseAssertions.softAssertToContain(actualTitle, expectedTitle, 'Product title text');
            
            const productUrlCode = DataProvider.getProductUrlCode(productName);
            BaseAssertions.softAssertElementAttributeToContain(this.productTitle, 'href', productUrlCode, 'Product title link');
        });
    }

    public async idesTagIsDisplayed(): Promise<void> {
        await allure.step('Assert: "JetBrains IDEs" tag is displayed', async() => {
            await BaseAssertions.softAssertElementToBeVisible(this.productTitleTag, 'Product title tag');
            const tagText = (await this.productTitleTag.innerText()).trim();
            BaseAssertions.softEqual(tagText, 'JetBrains IDEs', 'Product title tag text');
        });
    }

    public async mainMenuIsDisplayed(): Promise<void> {
        await allure.step('Assert: Main menu is displayed', async() => {
            await BaseAssertions.softAssertElementToBeVisible(this.mainMenu, 'Main menu container');
        });
    }

    public async menuItemsAreDisplayed(): Promise<void> {
        await allure.step('Assert: All main menu items are displayed', async() => {
            for (const [name, locator] of Object.entries(this.menuItems)) {
                await BaseAssertions.softAssertElementToBeVisible(locator, `Main menu item: "${name}"`);
            }
        });
    }
}