import { browser, by, element, By } from 'protractor';

export class AppPage {

  navigateTo() {
    browser.waitForAngularEnabled(true);
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  clickOnCustomerSelectorDropDown() {
    return element(By.tagName('mat-select')).click();
  }

  selectOption(optionIndex: number) {
    return browser.actions().mouseMove(element(By.id('mat-select-' + optionIndex)).element(By.tagName('span'))).click().perform();
  }

  selectDateRange() {
    return element(By.id('daterange')).sendKeys('10/8/2019 - 10/17/2019');
  }

  clickOnSubmit() {
    return element(By.id('submitButton')).click();
  }

  isTableRendered() {
    return element(By.tagName('table')).isPresent();
  }
}
