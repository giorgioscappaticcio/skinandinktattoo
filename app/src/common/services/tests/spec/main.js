'use strict';

describe('Service: CommonMain', function () {

  // load the service's module
  beforeEach(module('skinandInkApp'));

  // instantiate service
  var CommonMain;
  beforeEach(inject(function (_CommonMain_) {
    CommonMain = _CommonMain_;
  }));

  it('should do something', function () {
    expect(!!CommonMain).toBe(true);
  });

});
