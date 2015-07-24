/**
 * angular-egg - An AngularJS Directive implementation of egg.js by Mike Flynn
 * @author Paul Massey, paul.massey@scriptwerx.io
 * @version v0.0.4
 * @build 20 - Fri Jul 24 2015 10:09:15 GMT+0100 (BST)
 * @link http://www.scriptwerx.io
 * @license https://github.com/scriptwerx/ngEgg/blob/master/LICENSE
 */
/*
 ngEgg - Copyright (c)  2015 Scriptwerx

 An AngularJS Directive implementation of egg.js by Mike Flynn
 https://github.com/mikeflynn/egg.js/blob/master/egg.js

 Copyright (c) 2015 Mike Flynn

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
(function(angular) {

  'use strict';

  // Default (Konami) keycode
  var defaultEgg = '38,up,40,down,left,right,left,right,b,a',
    ignoredKeys = [16];

  /**
   * @private
   * @ngdoc method
   * @methodOf ngEgg
   * @name __toCharCodes
   * @description
   * Converts literal character values to keyCodes
   *
   * @param {String} keys keycode String
   * @returns {String} Reformatted keycode String
   */
  function __toCharCodes(keys) {
    var special = {
        'up': 38, 'down': 40, 'left': 37, 'right': 39, 'enter': 13, 'space': 32, 'ctrl': 7, 'alt': 8, 'tab': 9
      },
      specialKeys = Object.keys(special);

    keys = keys.split(',').map(function(key) {
      return key.trim();
    });

    var characterKeyCodes = keys.map(function(key) {

      if (!isNaN(parseInt(key, 10))) {
        return key;
      }

      if (specialKeys.indexOf(key) > -1) {
        return special[key];
      }

      return (key).charCodeAt(0);
    });

    return characterKeyCodes.join(',');
  }

  /**
   * @ngdoc directive
   * @name ngEgg
   * @description
   *
   * @requires $document
   *
   * @param {Object} $document $document
   * @returns {Object} Directive Object
   */
  function ngEgg($document) {

    var kps = [],
      activeEgg;

    /**
    * @private
    * @ngdoc method
    * @methodOf ngEgg
    * @name link
    * @description
    * 
    * @param {Object} scope $scope
    * @param {Object} elem DOM Element
    * @param {Object} attrs Attributes
    * @param {Object} ngModelCtrl ngModelController
    */
    function link(scope, elem, attrs, ngModelCtrl) {

      ngModelCtrl.$setViewValue(false);
      elem.css('display', 'none');

      /**
       * @private
       * @ngdoc method
       * @methodOf ngEgg
       * @name handleEvent
       * @description
       * 
       * @param {Object} e Event Object
       */
      function handleEvent(e) {

        var keyCode  = e.which,
          isLetter = keyCode >= 65 && keyCode <= 90,
          foundEgg;

        if (e.type === 'keydown' && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
          var tag = e.target.tagName;

          if ((tag === 'HTML' || tag === 'BODY') && isLetter) {
            e.preventDefault();
            return;
          }
        }

        if (e.type === 'keyup') {
          if (isLetter && !e.shiftKey) {
            keyCode = keyCode + 32;
          }

          if (ignoredKeys.indexOf(keyCode) === -1) {
            kps.push(keyCode);
          }

          foundEgg = kps.toString().indexOf(activeEgg) >= 0;

          if (foundEgg) {
            kps = [];
            elem.css('display', 'block');
            scope.$apply(function() {
              ngModelCtrl.$setViewValue(true);
            });
          }
          else if (kps.length > 10) {

            var currentKeys = kps.toString(),
              firstEggKey = activeEgg.split(',')[0];

            if (!firstEggKey || currentKeys.indexOf(firstEggKey) === -1) {
              kps = [];
            }
            else {
              currentKeys = currentKeys.substr(currentKeys.indexOf(firstEggKey));
              if (currentKeys.length > activeEgg.length) {
                kps = [];
              }
            }
          }
        }
      }

      if (attrs.keycode) {
        activeEgg = __toCharCodes(attrs.keycode);
      }
      else {
        activeEgg = __toCharCodes(defaultEgg);
      }

      $document.on('keydown', handleEvent);
      $document.on('keyup', handleEvent);
    }

    return {
      restrict: 'EA',
      require: '^ngModel',
      scope: true,
      link: link
    };
  }
  ngEgg.$inject = ['$document'];

  angular
    .module('ngEgg', [])
    .directive('ngEgg', ngEgg);

})(window.angular);