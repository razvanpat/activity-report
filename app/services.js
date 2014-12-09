var app = require('angular').module('ActivityReport');

app.factory('ReportsService', require('./services/ReportsService'));
app.factory('SettingsService', require('./services/SettingsService'));