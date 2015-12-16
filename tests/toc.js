'use strict';

/* global require, document, describe, before, beforeEach, after, afterEach, it */

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var $ = require('jquery');

var TOC = require('../js/toc').TOC;

describe('table of contents', function() {
  before(function() {
    this.$fixture = $('<div id="fixtures"></div>');
    $('body').append(this.$fixture);
    sinon.spy(TOC.prototype, 'scrollTo');
  });

  beforeEach(function() {
    this.$fixture.empty().append(
      '<nav class="js-toc">' +
        '<ul>' +
          '<li><a href="#section-1">Candidates and candidate committees</a></li>' +
          '<li><a href="#section-2">Corporations and labor organizations</a></li>' +
        '</ul>' +
      '</nav>' +
      '<div id="section-1"></div>' +
      '<div id="section-2"></div>'
    );
    this.toc = new TOC('.js-toc');
  });

  it('gets the sections', function() {
    expect(this.toc.sections.length).to.equal(2);
  });

  it('turns the sections into elementWatchers', function() {
    var watcher = this.toc.watchers[0];
    var menuItem = $('a[href="#section-1"]');
    expect(this.toc.watchers.length).to.equal(2);
    expect(watcher.$menuItem.attr('href')).to.equal(menuItem.attr('href'));
  });

  it('highlights the active menu item', function() {
    // var watcher = this.toc.watchers[0];
    // var top = $(watcher.watchItem).offset().top;
    // this.toc.highlightActiveItem(watcher);
    // $(document.body).scrollTop(top);

  });

  it('calls scrollTo when clicked', function() {
    var section = '#section-1';
    $('a[href=' + section +']').click();
    expect(this.toc.scrollTo).to.have.been.called;
  });

  it('updates the watchers on window resize', function() {

  });
});
