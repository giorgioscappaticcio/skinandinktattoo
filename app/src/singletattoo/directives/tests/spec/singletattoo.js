'use strict';

describe('Directive: singletattoo/singletattoo', function () {

  // load the directive's module
  beforeEach(module('skinandInkApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<singletattoo></singletattoo>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the singletattoo/singletattoo directive');
  }));
});
