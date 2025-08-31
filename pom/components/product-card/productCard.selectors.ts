const _superchargeLabel = 'label[data-test="menu-item"]';

export const cardSelectors = {
    card: 'div[class*="_modeClassic_"]',
    title: 'h3',
    description: ':is([data-test="product-description"], [class*="description"])',
    allToolsCollapse: '[data-test="collapse-trigger"]',
    buyButton: 'a[type="button"][href*="/shop/buy"]',
    buyBtnWithSupercharge: '[data-test="buy-page-buy-action-button"]',

    price: {
        block: ':is([class*="card-price"], [data-test="product-price-block"])',
        productPrice: '[data-test="product-price"]',
        priceTitle: ':is([data-test="product-price-title"], [data-test="product-price"] + div)',
    },
    
    supercharge: {
        checkbox: `${_superchargeLabel} [data-test="checkbox"]`,
        price: `${_superchargeLabel} p`,
        toolName: `${_superchargeLabel} a`,
    },

    links: {
        getQuote: 'a[href*="/shop/quote"]',
        learnMore: 'a[href^="/all"]',
    }
};

