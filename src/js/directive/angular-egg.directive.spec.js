describe('angular-egg', function() {

  'use strict';

  var suite = this,
    keyCode = [38,38,40,40,37,39,37,39,66,65];

  function triggerKeyCode(keyCode) {

    e = $.Event('keydown');
    e.which = keyCode;
    suite.document.trigger(e);

    var e = $.Event('keyup');
    e.which = keyCode;
    suite.document.trigger(e);
  }

  beforeEach(module('ngEgg'));

  beforeEach(inject(function($injector) {
    suite.compile = $injector.get('$compile');
    suite.scope = $injector.get('$rootScope').$new();
    suite.document = $injector.get('$document');
  }));

  describe('with default keycode', function() {

    beforeEach(function() {
      suite.scope.eggActivated = false;
      suite.element = suite.compile(angular.element('<section data-ng-egg data-ng-model="eggActivated">'))(suite.scope);
      suite.scope.$digest();
    });

    it('should activate the Easter Egg upon correct default key sequence', function() {

      expect(suite.element.css('display')).toBe('none');

      angular.forEach(keyCode, function(key) {
        triggerKeyCode(key);
      });

      suite.scope.$digest();
      expect(suite.element.css('display')).toBe('block');
    });

    it('should NOT activate the Easter Egg upon incorrect key sequence', function() {

      expect(suite.element.css('display')).toBe('none');

      angular.forEach(keyCode, function(key) {
        triggerKeyCode(key);
        triggerKeyCode(20);
      });

      suite.scope.$digest();
      expect(suite.element.css('display')).toBe('none');
    });

  });

  describe('with custom keycode', function() {

    beforeEach(function() {
      suite.scope.eggActivated = false;
      suite.element = suite.compile(angular.element('<section data-ng-egg data-ng-model="eggActivated" data-keycode="up,down,up,down">'))(suite.scope);
      suite.scope.$digest();
    });

    it('should use the specified custom key sequence', function() {

      var customKeyCode = [38,40,38,40];

      expect(suite.element.css('display')).toBe('none');

      angular.forEach(customKeyCode, function(key) {
        triggerKeyCode(key);
      });

      suite.scope.$digest();
      expect(suite.element.css('display')).toBe('block');
    });

  });

});