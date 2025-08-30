import { Page } from '@playwright/test';
import { HeaderAssertions } from './header.assertions';

/**
 * Represents the shared Header component of the application.
 * Used to define action methods and utilize the HeaderAssertions class to verify state.
 */
export class Header {
    private readonly page: Page;
    public readonly assert: HeaderAssertions;

    constructor(page: Page) {
        this.page = page;
        this.assert = new HeaderAssertions(page);
    }
}
