export const headerSelectors = {
    headerContainer: '[class~="page__header"]',
    jetbrainsLogo: '[data-test="site-logo"]',
    productTitle: '[data-test="menu-second-title-box"]',
    productTitleTag: '[id="js-menu-second-desktop"] [data-test="tag"]',
    
    mainMenu: {
        container: '[data-test="main-menu"]',
        item: '[data-test="main-menu-item"]',
        ai: '[data-test="main-menu-item"][data-test-marker="AI"]',
        devTools: '[data-test="main-menu-item"][data-test-marker="Developer Tools"]',
        teamTools: '[data-test="main-menu-item"][data-test-marker="Team Tools"]',
        education: '[data-test="main-menu-item"][data-test-marker="Education"]',
        solutions: '[data-test="main-menu-item"][data-test-marker="Solutions"]',
        support: '[data-test="main-menu-item"][data-test-marker="Support"]',
        store: '[data-test="main-menu-item"][data-test-marker="Store"]',
    },
};
