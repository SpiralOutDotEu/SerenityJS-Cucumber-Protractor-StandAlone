import {browser, by, protractor} from 'protractor';
const chai = require('chai');
chai.use(require('chai-as-promised'));

const expect = chai.expect;

module.exports = function myStepDefinitions () {
    this.setDefaultTimeout(60 * 1000);

    this.Given(/^that I have gone to the Google page$/, function (callback) {
        browser.waitForAngularEnabled(false);
        browser.driver.get('http://google.com');
        browser.driver.controlFlow().execute(callback);
    });

    this.When(/^I search for "([^"]*)"$/, function (item, callback) {
        const el = browser.driver.findElement(by.id('lst-ib'));
        el.clear();
        el.sendKeys(item + protractor.Key.ENTER).then(function () {
            callback();
        }).catch(function (err) {
            callback(err);
        });
    });

    this.Then(/^"([^"]*)" should be mentioned in the results$/, function (item, callback) {
        const el = browser.driver.findElement(by.css('h3')).getText();
        expect(el).to.eventually.match(new RegExp(item,'i' )).then(function () {
            callback();
        }).catch(function (err) {
            callback(err);
        });
    });
};
