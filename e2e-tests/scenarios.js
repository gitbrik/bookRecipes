'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /recipes when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/recipes");
  });


  describe('recipes', function() {

    beforeEach(function() {
      browser.get('index.html#!/recipes');
    });


    it('should render recipes when user navigates to /recipes', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('add', function() {

    beforeEach(function() {
      browser.get('index.html#!/add');
    });


    it('should render add when user navigates to /add', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
