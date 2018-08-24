import Component from '@ember/component';
import { inject as service } from '@ember/service';
import $ from 'jquery';
export default Component.extend({
  ajax: service(),
  bootstrap: service(),

  init() {
    this._super(...arguments);
  }

});
