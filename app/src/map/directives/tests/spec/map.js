'use strict';

describe('Directive: map/map', function () {

  // load the directive's module
  beforeEach(module('skinandInkApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<map></map>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the map/map directive');
  }));
});
