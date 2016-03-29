describe('angular-egg', function () {

    'use strict';

    var suite = this,
        keyCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    function triggerKeyCode(keyCode) {
        var event = document.createEvent('Event');
        event.which = keyCode;
        event.initEvent('keyup');
        document.dispatchEvent(event);
    }

    beforeEach(module('ngEgg'));

    beforeEach(inject(function ($injector) {
        suite.compile = $injector.get('$compile');
        suite.scope = $injector.get('$rootScope').$new();
        suite.document = $injector.get('$document');
        suite.scope.vm = {};
    }));

    describe('with default keycode', function () {

        beforeEach(function () {
            suite.scope.vm.eggActivated = false;
            suite.element = suite.compile(angular.element('<section data-ng-egg data-ng-model="vm.eggActivated" data-ng-class="{ \'hidden\': vm.eggActivated }">'))(suite.scope);
            suite.scope.$digest();
        });

        it('should activate the Easter Egg upon correct default key sequence', function () {

            angular.forEach(keyCode, function (key) {
                triggerKeyCode(key);
            });

            suite.scope.$digest();
            expect(suite.scope.vm.eggActivated).toBeTrue();
            expect(suite.element.hasClass('hidden')).toBeTrue();
        });

        it('should NOT activate the Easter Egg upon incorrect key sequence', function () {

            angular.forEach(keyCode, function (key) {
                triggerKeyCode(key);
                triggerKeyCode(20);
            });

            suite.scope.$digest();
            expect(suite.scope.vm.eggActivated).toBeFalse();
            expect(suite.element.hasClass('hidden')).toBeFalse();
        });

    });

    describe('with custom keycode', function () {

        beforeEach(function () {
            suite.scope.vm.eggActivated = false;
            suite.element = suite.compile(angular.element('<section data-ng-egg data-ng-model="vm.eggActivated" data-keycode="up,down,up,down" data-ng-class="{ \'hidden\': vm.eggActivated }">'))(suite.scope);
            suite.scope.$digest();
        });

        it('should use the specified custom key sequence', function () {

            var customKeyCode = [38, 40, 38, 40];

            angular.forEach(customKeyCode, function (key) {
                triggerKeyCode(key);
            });

            suite.scope.$digest();
            expect(suite.scope.vm.eggActivated).toBeTrue();
            expect(suite.element.hasClass('hidden')).toBeTrue();
        });

    });

});