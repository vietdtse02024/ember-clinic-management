import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  init() {
    this._super(...arguments);
    $("#tab-product").addClass('active');
  },
  actions:{

  }
});
