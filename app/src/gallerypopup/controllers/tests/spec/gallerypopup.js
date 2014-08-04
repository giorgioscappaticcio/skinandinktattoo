'use strict';

describe('Controller: GallerypopupGallerypopupCtrl', function () {

  // load the controller's module
  beforeEach(module('skinandInkApp'));

  var GallerypopupGallerypopupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GallerypopupGallerypopupCtrl = $controller('GallerypopupGallerypopupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
