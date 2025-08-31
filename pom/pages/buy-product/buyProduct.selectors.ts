import { cardSelectors } from "../../components/product-card/productCard.selectors";

/**
 * A centralized object to hold all CSS selectors for the Buy Page to make maintenance easier.
 *  Note: Additional HTML attr - indicators to be added for switcher options user-type (Individual/Organizations) and billing-cycle (Month/Year), 
 * to avoid both long selector and relying on element text, as well as to have localization support
*/
export const buySelectors = {
    pageTitle: 'h1',

    // User and billing cycle selectors
    measureSwitcherOption: 'span[class*="measureSwitcher"] button[data-rs-internal="switcher__option"]',
    getUserTypeSelector: (userType: string) => `//div[contains(@class,"switcher-label-section__text") and contains(text(),"${userType}")]` + buySelectors.comercialAncestor,
    getBillingCycleRadioSelector: (cycle: string) => `span:has(> input[value="${cycle.toLowerCase()}"])`,
    getBillingCycleSwitcherSelector: (cycle: string) => `//div[contains(text(), "${cycle}")]`, 
    comercialAncestor: `[not(ancestor::div[contains(@data-test, "-Non-Commercial")]) and not(ancestor::div[contains(@data-test, "LaxpYJ")])]`,
    
    // Product card selectors
    getProductCardBySku: (sku: string) => `${cardSelectors.card}:has(a[href*="/shop/buy"][href*="item=${sku}"])`,
    getProductCardSupercharge: () => `${cardSelectors.card}:has(${cardSelectors.buyBtnWithSupercharge})`,
};
