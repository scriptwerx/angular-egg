# AngularJS - Angular Egg (ngEgg)

[![Build Status][image-1]][1]

Angular Egg by [Scriptwerx][2] is an AngularJS Directive implementation of [egg.js][3] by Mike Flynn.

## Description

Provides a simple directive which allows you to easily add web easter eggs by watching the user's key strokes.

## Dependencies

Angular Egg depends on *angular.js*, and is tested on version 1.3.14.

## Installation

Angular Egg is packaged as a bower component; to install use:

	bower install angular-egg

You can of course; download the directive from the [git repository][4].

## Usage

Simply add the Angular Egg asset to your project and include it in your HTML or as part of your build process.

	<script type="text/javascript" src="angular-egg.min.js"></script>

*angular-egg.js* should appear after *angular.js* is included. Prefer minified assets (.min) for production.

	angular
	    .module('myApp', ['ngEgg']);

Now that *ngEgg* is available within your application; you can make use of it within your DOM as follows:

	<!-- EASTER EGG -->
	<section data-ng-egg data-ng-model="vm.eggActivated">
	    YOU FOUND THE EGG!
	</section>
	
	<!-- ACTUAL CONTENT (hidden when egg is activated) -->
	<section data-ng-if="!vm.eggActivated">
	    WELCOME TO MY APP
	</section>

You can change the custom keystrokes required to activate the Easter Egg by including the *keycode* attribute within your DOM element:

	<!-- EASTER EGG -->
	<section data-ng-egg data-keycode="up,up,down,down" data-ng-model="vm.eggActivated">
	    YOU FOUND THE EGG!
	</section>

You need to pass the character sequence as a comma-delimited String.

We’re making use of *ngModel* in our directive to include a simple *true/false* switch that can be useful within your app to determine when/if the egg is activated.

**N.B. Angular Egg will automatically hide itself and set the value switch via *ngModel* to false.**

## Controller as

As our code is designed with using the "controller as" way of writing AngularJS apps - *vm* is referring to our controller.

Todd Motto did a great writeup on the “controller as” syntax:
[http://toddmotto.com/digging-into-angulars-controller-as-syntax/][5]

As a basic example:

	<section data-ng-controller="MyController as vm">
	    <!-- EASTER EGG -->
	    <section data-ng-egg data-ng-model="vm.eggActivated">
	        YOU FOUND THE EGG!
	    </section>
	
	    <!-- ACTUAL CONTENT (hidden when egg is activated) -->
	    <section data-ng-if="!vm.eggActivated">
	        WELCOME TO MY APP
	    </section>
	</section>

We'll create a fully working demo as soon as possible and update the build.

[1]:	https://travis-ci.org/scriptwerx/angular-egg
[2]:	http://www.scriptwerx.io
[3]:	https://github.com/mikeflynn/egg.js
[4]:	https://github.com/scriptwerx/angular-egg
[5]:	http://toddmotto.com/digging-into-angulars-controller-as-syntax/

[image-1]:	https://travis-ci.org/scriptwerx/angular-egg.svg