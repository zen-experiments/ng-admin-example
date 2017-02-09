'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('User Create page', function() {
	this.timeout(360000000);

    before(function() {
        browser.get('http://localhost:4000/#/users/create');
        browser.waitForAngular();
    });

    it('should have a title', function() {
        expect(browser.getTitle()).to.eventually.equal('Admin');
    });

    it('should have a country selection', function() {
        const country = $$('#country');
        const city = $$('#city');

        country.click();

        const firstOption = country.$$('#ui-select-choices-row-0-0');

        firstOption.click();

        city.click();

        const cityOptions = city.$$('.ui-select-choices-row');

        expect(cityOptions.count()).to.eventually.equal(2);
        expect(cityOptions.get(0).getText()).to.eventually.equal('Paris');
        expect(cityOptions.get(1).getText()).to.eventually.equal('Nancy');
    });
});
