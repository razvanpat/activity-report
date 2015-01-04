/* global require */

(function () {
	'use strict';
}());

var app = require('angular').module('ActivityReport');

app.controller('HomeCtrl', require('./components/home/HomeCtrl'));
app.controller('CreateReportCtrl', require('./components/create_report/CreateReportCtrl'));
app.controller('ReportCtrl', require('./components/report/ReportCtrl'));
app.controller('ReportListCtrl', require('./components/report_list/ReportListCtrl'));
