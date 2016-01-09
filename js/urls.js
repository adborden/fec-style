'use strict';

var URI = require('urijs');
var _ = require('underscore');

var analytics = require('./analytics');

function updateQuery(params, fields) {
  var queryString = nextUrl(params, fields);
  if (queryString !== null) {
    window.history.replaceState(params, queryString, queryString || window.location.pathname);
  }
}

function pushQuery(params, fields) {
  var queryString = nextUrl(params, fields);
  if (queryString !== null) {
    window.history.pushState(params, queryString, queryString || window.location.pathname);
    analytics.pageView();
  }
}

function nextUrl(params, fields) {
  var query = URI.parseQuery(window.location.search);
  if (!compareQuery(query, params, fields)) {
    // Clear and update filter fields
    _.each(fields, function(field) {
      delete query[field];
    });
    params = _.extend(query, params);
    return URI('').query(params).toString();
  } else {
    return null;
  }
}

function compareQuery(first, second, keys) {
  keys = keys || _.union(_.keys(first), _.keys(second));
  var different = _.find(keys, function(key) {
    return !_.isEqual(
      ensureArray(first[key]).sort(),
      ensureArray(second[key]).sort()
    );
  });
  return !different;
}

function ensureArray(value) {
  return _.isArray(value) ? value : [value];
}

module.exports = {
  updateQuery: updateQuery,
  pushQuery: pushQuery
};