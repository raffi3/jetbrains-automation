## Setup
### Clone repository
`git clone git@github.com:raffi3/jetbrains-automation.git`

### Install dependencies
`npm install`

### Install Playwright
`npx playwright install --with-deps`

## Add .env
`cp .env.example .env`

## Execute tests (command line)
#### Execute all tests
`npx playwright test`
#### Execute a single test
`npx playwright test <test spec name | relative path>`

_Example: `npx playwright test theMainProductCard.spec.ts --headed`_
#### Execute a tests in headed mode
`npx playwright test theMainProductCard --headed`

### Advanced execution options
#### Run a set of test files
`npx playwright test tests/PlanAndSubscription/ tests/Checkout/`

#### Execute tests containing a title
`npx playwright test -g "buy"`

#### Execute tests on a specific project/browser (project should be present in playwright.config.ts)
`npx playwright test theMainProductCard --project=chromium`

## Test Report Generation
#### Generate Allure report locally
npx allure generate allure-results --clean -o allure-report && npx allure open allure-report

NOTE: In Jenkins/another CI tool allure plugin or specific configuration will enable allure report generation into the build.