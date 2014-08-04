'use strict';

describe('Directive: gallerypopup/gallerypopup', function () {

  // load the directive's module
  beforeEach(module('skinandInkApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gallerypopup></gallerypopup>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gallerypopup/gallerypopup directive');
  }));
});
