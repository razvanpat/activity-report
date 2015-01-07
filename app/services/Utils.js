/* global module, require */

(function () {
	'use strict';

var _ = require('lodash');

module.exports = function Utils() {
	return {	
		latestEntry: function(entryA, entryB) {
			if (entryA.dateYear > entryB.dateYear) 
				return entryA;
			if (entryA.dateYear < entryB.dateYear)
				return entryB;
			if (entryA.dateMonth > entryB.dateMonth)
				return entryA;
			if (entryA.dateMonth < entryB.dateMonth)
				return entryB;
			if (entryA.dateDay > entryB.dateDay)
				return entryA;
			if (entryA.dateDay < entryB.dateDay)
				return entryB;
			return entryB;	
		},

		getActionBtnStateFor: function(collection) {
			return !_.reduce(collection, 
					function (result, item) {
						return result || item.selected;
					}, false);
		}		
	};
};
}());
