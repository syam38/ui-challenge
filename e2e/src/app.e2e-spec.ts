import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display table on submitting the form', async () => {
    await page.navigateTo();
    await page.clickOnCustomerSelectorDropDown();
    await page.selectOption(0);
    await page.selectDateRange();
    await page.clickOnSubmit();
    const isTableRendered = await page.isTableRendered();
    expect(isTableRendered).toBeTruthy();
  });

});
