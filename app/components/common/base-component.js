import Component from '@ember/component';
import { inject as service } from '@ember/service';
import pagedArray from 'ember-cli-pagination/computed/paged-array';
import { computed } from '@ember/object'
import $ from 'jquery';
import numeral from 'numeral';

export default Component.extend({
  ajax: service(),
  bootstrap: service(),

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 100,

  // can be called anything, I've called it pagedContent
  // remember to iterate over pagedContent in your template
  pagedContent: pagedArray('resultSearch', {
    page: computed.alias("parent.page"),
    perPage: computed.alias("parent.perPage")
  }),

  // binding the property on the paged array
  // to a property on the controller
  totalPages: computed.oneWay("pagedContent.totalPages"),

  init() {
    this._super(...arguments);
  },
  actions : {
    formatMoney : function(e) {
      e.value = numeral(e.value).format('#,#');
    },
    formatRate : function(e) {
      e.value = numeral(e.value).format('#,#.0');
    },
  },
  convertStringToNumber : function(s){
    return Number(s.replace(/[^\d.]/g, ''))
  }

});
